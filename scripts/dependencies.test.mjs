// 依存関係と angular.json の設定が、セキュリティ上の前提と食い違っていないかを確認します。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const pkg = readJson('../package.json');
const lock = readJson('../package-lock.json');
const angular = readJson('../angular.json');

// braces <= 3.0.3 は GHSA-vfj7-8cjw-p6xm (high) の対象で、修正版がまだありません。
test('lockfile does not install braces', () => {
  const paths = Object.keys(lock.packages).filter((path) => path.endsWith('node_modules/braces'));
  assert.deepEqual(paths, []);
});

test('every angular.json builder comes from a declared package', () => {
  const declared = { ...pkg.dependencies, ...pkg.devDependencies };
  const targets = Object.values(angular.projects).flatMap((project) => Object.values(project.architect));
  for (const { builder } of targets) {
    const name = builder.split(':')[0];
    assert.ok(name in declared, `${builder} is not declared`);
  }
});
