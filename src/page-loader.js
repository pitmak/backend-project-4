import process from 'node:process';
import axios from 'axios';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';

const convertUrlToFileName = (urlSource) => {
  const url = new URL(urlSource);
  const urlString = `${url.hostname}${url.pathname}`;
  const fileName = urlString.replace(/\W/g, '-');

  return `${fileName}.html`;
};

const convertSrcToFileName = (urlSource) => {
  const url = new URL(urlSource);
  const parsed = path.parse(url.pathname);

  const urlString = `${url.hostname}${parsed.dir}-${parsed.name}`;
  const fileName = urlString.replace(/\W/g, '-');

  return `${fileName}${parsed.ext}`;
};

export default (url, outputDir = '.') => {
  // console.log('process.cwd: ', process.cwd());
  // console.log('path.resolve: ', path.resolve(outputDir));
  const outputPath = path.resolve(outputDir);
  const outputName = convertUrlToFileName(url);
  // const pathName = outputDir ?? process.cwd();
  const filePath = path.join(pathName, fileName);
  const assetsPath = filePath.replace(/\.html$/, '_files');

  return mkdir(assetsPath, { recursive: true })
    .then(() => axios.get(url))
    .then((response) => {
      const $ = cheerio.load(response.data);

      const promises = $('img').map((i, el) => {
        const imageUrl = new URL(el.attribs.src, url);
        return axios.get(imageUrl.href)
          .then((resp) => {
            const assetFileName = path.join(assetsPath, convertSrcToFileName(el));
            return writeFile(assetFileName, resp.data);
          });
      });

      $('img').attr('src', (i, val) => `${assetsPath}/${convertSrcToFileName(val)}`);

      return Promise.all([...promises, writeFile(filePath, $.html())]);
    })
    .then(() => filePath);
};
