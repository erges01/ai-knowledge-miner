import fs from 'fs/promises';
import path from 'path';
import { chunkText } from './utils';
import { embedAndUpsert } from './vector';

export async function scanAndIndex(rootDir: string) {
  const files: { filePath: string; content: string }[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (['node_modules', '.git'].includes(e.name)) continue;
        await walk(p);
      } else if (e.isFile()) {
        if (/\.(js|ts|json|md|yaml|yml|txt)$/.test(e.name) || e.name === 'Dockerfile') {
          const content = await fs.readFile(p, 'utf8');
          files.push({ filePath: p, content });
        }
      }
    }
  }

  await walk(rootDir);

  for (const f of files) {
    const chunks = chunkText(f.content, 800);
    for (let i = 0; i < chunks.length; i++) {
      await embedAndUpsert({
        id: `${Buffer.from(f.filePath).toString('base64')}:${i}`,
        text: chunks[i],
        metadata: { filePath: f.filePath, chunkIndex: i }
      });
    }
  }

  return { status: 'ok', filesIndexed: files.length };
}
