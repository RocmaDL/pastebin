const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PASTES_DIR = './pastes';

fs.mkdir(PASTES_DIR, { recursive: true });

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


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sur port ${PORT}
