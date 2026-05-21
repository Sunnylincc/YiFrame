import { readFile } from 'node:fs/promises';

export interface CompositionMeta {
  title: string;
  width: number;
  height: number;
  fps: number;
  duration: number;
  language: string;
  aspectRatio: '9:16' | '16:9' | '1:1';
}

export async function loadMeta(dir: string): Promise<CompositionMeta> {
  const raw = await readFile(`${dir}/meta.json`, 'utf-8');
  return JSON.parse(raw) as CompositionMeta;
}
