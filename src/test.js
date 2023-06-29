const readline = require('readline');
// import readline from 'readline';

async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(+answer);
    });
  });
}

async function run() {
  const n = await ask('');
  const m = await ask('');
  const s = await ask('');
  const p = await ask('');

  const totalSeconds = n * (m * 60 + s + p) - p;

  console.log(Math.trunc(totalSeconds / 60));
  console.log(totalSeconds % 60);
}

run();
