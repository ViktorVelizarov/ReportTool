import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const JS = fileURLToPath(new URL('../js', import.meta.url));

// The other tests load only the modules that run without a browser; this one reads all of them.
test('every module of the page is valid JavaScript', () => {
  const files = readdirSync(JS, { recursive: true }).filter(file => file.endsWith('.js'));
  assert.ok(files.length > 50, `${files.length} modules`);
  for (const file of files) {
    const check = spawnSync(process.execPath, ['--check', file], { cwd: JS, encoding: 'utf8' });
    assert.equal(check.status, 0, `${file}\n${check.stderr}`);
  }
});
