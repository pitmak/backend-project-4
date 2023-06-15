#!/usr/bin/env node

import { program } from 'commander';

import loader from '../src/page-loader.js';

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>', 'url to download')
  .option('-o, --output [dir]', 'output directory')
  .action((url, options) => {
    console.log(loader(url, options.output));
  });

program.parse();
