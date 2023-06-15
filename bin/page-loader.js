#!/usr/bin/env node

import { Option, program } from 'commander';

import loader from '../src/page-loader.js';

program
  .name('page-loader')
  .description('Page loader utility')
  .version('1.0.0')
  .argument('<url>', 'url to download')
  .addOption(new Option('-o, --output <dir>', 'output format')
    .default('/home/user/current-dir'))
  .action((url, options) => {
    console.log(loader(url, options.output));
  });

program.parse();
