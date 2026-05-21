import express from 'express';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { renderComposition } from '../renderer/render.js';

export async function startStudio(port = 3030) {
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use('/public', express.static('public'));
  app.use('/examples', express.static('examples'));
  app.get('/api/templates', async (_req, res) => res.json(await readdir('examples')));
  app.get('/api/meta', async (req, res) => {
    const t = String(req.query.template || 'product-promo');
    const meta = JSON.parse(await readFile(`examples/${t}/meta.json`, 'utf-8'));
    res.json(meta);
  });
  app.post('/api/render', async (req, res) => {
    try {
      const template = req.body.template || 'product-promo';
      const out = await renderComposition(`examples/${template}`);
      res.json({ ok: true, output: out });
    } catch (e: any) {
      res.status(500).json({ ok: false, message: e.message });
    }
  });
  app.post('/api/content', async (req, res) => {
    const { template, title, subtitle, bullets, cta } = req.body;
    await writeFile(`examples/${template}/content.json`, JSON.stringify({ title, subtitle, bullets, cta }, null, 2));
    res.json({ ok: true });
  });

  app.get('/studio', (_req, res) => {
    res.sendFile(process.cwd() + '/src/server/studio.html');
  });
  app.listen(port, () => console.log(`YiFrame Studio: http://localhost:${port}/studio`));
}
