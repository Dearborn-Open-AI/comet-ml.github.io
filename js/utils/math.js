function add(a, b) {
  return a + b;
}

function sum(array) {
  return array.reduce(add);
}

function pearsonCorrelation(a1, a2) {
  let n = a1.length;
  let [sum1, sum2] = [a1, a2].map(sum);
  let [pow1, pow2] = [a1, a2].map(l =>
    l.reduce((a, b) => a + Math.pow(b, 2), 0)
  );
  let mulSum = a1.map((n, i) => n * a2[i]).reduce(add);
  let dense = Math.sqrt(
    (pow1 - Math.pow(sum1, 2) / n) * (pow2 - Math.pow(sum2, 2) / n)
  );
  if (dense === 0) {
    return 0;
  }
  return (mulSum - (sum1 * sum2) / n) / dense;
}
