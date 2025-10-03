const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // si besoin, restreindre en prod
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

const PASTES_DIR = path.join(__dirname, 'pastes');

// Routes
app.post('/api/paste', async (req, res) => {
  const { code, content } = req.body;

  if (!code || !content) {
    return res.status(400).json({ error: 'Code et contenu requis' });
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(code)) {
    return res.status(400).json({ error: 'Code invalide' });
  }
  if (content.length > 100_000) { // limite raisonnable
    return res.status(400).json({ error: 'Contenu trop long' });
  }

  const filePath = path.join(PASTES_DIR, `${code}.txt`);

  try {
    // méthode atomique : "wx" échoue si le fichier existe déjà
    const fh = await fs.open(filePath, 'wx');
    await fh.writeFile(content, 'utf8');
    await fh.close();
    return res.json({ success: true, code });
  } catch (err) {
    if (err.code === 'EEXIST') {
      return res.status(409).json({ error: 'Ce code existe déjà' });
    }
    console.error('Erreur écriture paste:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
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
  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.status(404).json({ error: 'Paste non trouvé' });
    }
    console.error('Erreur lecture paste:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// SPA fallback (toujours après les routes API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

async function start() {
  // on s'assure que le dossier existe avant de démarrer
  await fs.mkdir(PASTES_DIR, { recursive: true });
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur sur port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Impossible de démarrer le serveur:', err);
  process.exit(1);
});
