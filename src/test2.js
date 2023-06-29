const { EOL } = require('os');

let inputData = '';

function run() {
  let [n, k, p, u] = inputData.split(EOL).map(Number);

  if (p > u) {
    [u, p] = [n - u + 1, n - p + 1];
  }

  const dist = u - p;
  const variant1 = Math.floor(dist / k) + (dist % k);
  const variant2 = Math.ceil(dist / k) + k - (dist % k);
  const variant3 = Math.ceil((n - p) / k) + n - u;

  console.log(n, k, p, u);
  console.log(variant1, variant2, variant3);
  console.log(Math.min(variant1, variant2, variant3));
}

process.stdin.on('data', (c) => { inputData += c; });
process.stdin.on('end', run);
