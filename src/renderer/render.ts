import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { ensureDir } from '../utils/fs.js';
import { loadMeta } from '../composition/meta.js';

export async function renderComposition(compositionDir: string) {
  const meta = await loadMeta(compositionDir);
  const frames = meta.fps * meta.duration;
  const tempDir = await mkdtemp(join(tmpdir(), 'yiframe-frames-'));
  const outDir = 'renders';
  await ensureDir(outDir);
  const outFile = `${outDir}/${Date.now()}-${compositionDir.split('/').pop()}.mp4`;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: meta.width, height: meta.height } });
  await page.goto(`file://${process.cwd()}/${compositionDir}/index.html`);
  for (let i = 0; i < frames; i++) {
    await page.evaluate((frame) => {
      (window as any).__YIFRAME_TIME__ = frame;
      window.dispatchEvent(new CustomEvent('yiframe:frame', { detail: { frame } }));
    }, i);
    await page.screenshot({ path: `${tempDir}/frame-${String(i).padStart(6, '0')}.png` });
    if (i % Math.max(1, Math.floor(frames / 10)) === 0) console.log(`渲染进度 ${i}/${frames}`);
  }
  await browser.close();

  await new Promise<void>((resolve, reject) => {
    const ff = spawn('ffmpeg', ['-y', '-framerate', String(meta.fps), '-i', `${tempDir}/frame-%06d.png`, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', outFile], { stdio: 'inherit' });
    ff.on('exit', (code) => code === 0 ? resolve() : reject(new Error('ffmpeg 编码失败，已保留临时帧目录: ' + tempDir)));
  });

  await rm(tempDir, { recursive: true, force: true });
  return outFile;
}
