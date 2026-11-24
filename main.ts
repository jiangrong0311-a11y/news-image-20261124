// Entry for the make.fun bounty "Sum up 24 November's world news in one image".
// The image is bundled in this repository as entry.png; the program copies it to
// the output directory the grader provides. Node 22, standard library only,
// no network access needed.
//
// Local test:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly instead of shipping a truncated copy: the gate reads these
// exact bytes, so the destination must match the bundled image byte for byte.
if (statSync(source).size !== statSync(target).size) {
  throw new Error(`entry.png copy mismatch: ${statSync(source).size} vs ${statSync(target).size}`);
}
