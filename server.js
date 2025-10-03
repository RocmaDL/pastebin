// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PASTES_DIR = './pastes';

// Créer le dossier pastes s'il n'existe pas
fs.mkdir(PASTES_DIR, { recursive: true });

// Créer un paste
app.post('/api/paste', async (req, res) => {
  const { code, content } = req.body;
  
  if (!code || !content) {
    return res.status(400).json({ error: 'Code et contenu requis' });
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(code)) {
    return res.status(400).json({ error: 'Code invalide' });
  }
  
  const filePath = path.join(PASTES_DIR, `${code}.txt`);
  
  try {
    await fs.access(filePath);
    return res.status(409).json({ error: 'Ce code existe déjà' });
  } catch {
    await fs.writeFile(filePath, content, 'utf8');
    res.json({ success: true, code });
  }
});

// Lire un paste
app.get('/api/paste/:code', async (req, res) => {
  const { code } = req.params;
  
  if (!/^[a-zA-Z0-9_-]+$/.test(code)) {
    return res.status(400).json({ error: 'Code invalide' });
  }
  
  const filePath = path.join(PASTES_DIR, `${code}.txt`);
  
  try {
    const content = await fs.readFile(filePath, 'utf8');
    res.json({ content });
  } catch {
    res.status(404).json({ error: 'Paste non trouvé' });
  }
});

app.listen(3000, () => console.log('Serveur sur port 3000'));