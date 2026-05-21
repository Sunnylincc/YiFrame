import { mkdir, access, constants, writeFile } from 'node:fs/promises';

export async function ensureDir(path: string) {
  await mkdir(path, { recursive: true });
}

export async function isWritable(path: string) {
  try {
    await access(path, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export async function touchWritable(path: string) {
  const file = `${path}/.write-test-${Date.now()}`;
  await writeFile(file, 'ok');
}
