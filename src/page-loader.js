import process from 'node:process';
import axios from 'axios';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

const convertUrlToFileName = (urlSource) => {
  const url = new URL(urlSource);
  const urlString = `${url.hostname}${url.pathname}`;
  const fileName = urlString.replace(/\W/g, '-');

  return `${fileName}.html`;
};

export default (url, outputDir) => {
  const fileName = convertUrlToFileName(url);
  const pathName = outputDir ?? process.cwd();
  const filePath = path.join(pathName, fileName);

  axios.get(url)
    .then((response) => {
      writeFile(filePath, response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  return filePath;
};
