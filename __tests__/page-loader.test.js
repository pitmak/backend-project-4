// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { readFileSync } from 'node:fs';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import nock from 'nock';

import loader from '../src/page-loader.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const HOST = 'https://ru.hexlet.io';
const PATH = '/courses';
const STUB_TEXT = 'Hello from nock';
// const EXPECTED_FILE_NAME = 'ru-hexlet-io-courses.html';

nock(HOST)
  .persist()
  .get(PATH)
  .reply(200, STUB_TEXT);

test('test with default path', async () => {
  const result = await loader(`${HOST}${PATH}`);
  console.log('result: ', result);
  expect(result).toBeDefined();

  const data = await readFile(result, 'utf-8');
  expect(data).toBe(STUB_TEXT);
});

test('test with random path', async () => {
  const tmpDir = await mkdtemp(path.join(tmpdir(), 'page-loader-'));
  console.log('tmpDir: ', tmpDir);
  const result = await loader(`${HOST}${PATH}`, tmpDir);
  console.log('result: ', result);
  expect(result).toBeDefined();

  const data = await readFile(result, 'utf-8');
  expect(data).toBe(STUB_TEXT);
});
