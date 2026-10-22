// Node.js のバージョン指定が、セキュリティ修正済みの LTS と Angular の対応範囲に収まっているかを確認します。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'));
const pkg = readJson('../package.json');
const angularCore = readJson('../node_modules/@angular/core/package.json');

// 2026-10-21 の Node.js security release で 24.x の修正版になったバージョンです。
const PATCHED_LTS = '24.22.1';

const parse = (version) => version.replace(/^v/, '').split('.').map(Number);

const compare = (a, b) => {
  const [x, y] = [parse(a), parse(b)];
  for (let i = 0; i < 3; i++) {
    if (x[i] !== y[i]) return x[i] - y[i];
  }
  return 0;
};

// `^24.15.0 || ^26.0.0` 形式の caret 範囲だけを扱います。
const satisfies = (version, range) =>
  range.split('||').map((r) => r.trim()).some((r) => {
    assert.match(r, /^\^\d+\.\d+\.\d+$/, `unsupported range: ${r}`);
    const min = r.slice(1);
    return parse(version)[0] === parse(min)[0] && compare(version, min) >= 0;
  });

test('volta pins the patched LTS release', () => {
  assert.equal(pkg.volta.node, PATCHED_LTS);
});

test('engines rejects Node.js versions older than the patched LTS release', () => {
  assert.ok(satisfies(PATCHED_LTS, pkg.engines.node));
  assert.ok(!satisfies('24.22.0', pkg.engines.node));
  assert.ok(!satisfies('22.23.4', pkg.engines.node));
});

test('Angular supports the pinned Node.js version', () => {
  assert.ok(satisfies(pkg.volta.node, angularCore.engines.node), angularCore.engines.node);
});

test('the running Node.js satisfies engines', () => {
  assert.ok(satisfies(process.version, pkg.engines.node), process.version);
});
