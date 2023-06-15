// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
// import path from 'node:path';
import nock from 'nock';

import loader from '../src/page-loader.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

nock('https://ru.hexlet.io')
  .get('/courses')
  .reply(200, 'Hello from nock');

test('basic test', async () => {
  const result = await loader('https://ru.hexlet.io/courses', '/home/pitmak/backend-project-4/out');
  const data = await readFile(result, 'utf-8');
  expect(result).toBe('/home/pitmak/backend-project-4/out/ru-hexlet-io-courses.html');
  expect(data).toBe('Hello from nock');
});
