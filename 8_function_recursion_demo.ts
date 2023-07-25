// https://www.youtube.com/watch?v=KcccqXGuvhE
export {}; // Just to let TS know this is a module to prevent name clashes

// If we have a sum_all function that takes an array of numbers, we could handle this with a for loop
function normal_sum_all(xs: number[]): number {
  let result = 0;

  for (let i = 0; i < xs.length; i++) {
    result += xs[i];
  }
  return result;
}

console.log(normal_sum_all([1, 2, 3, 4]));

// But we don't do loops in FP, nor do we do mutations.
// So how can we do it without these tools? Recursion!

type SumAll = (xs: number[]) => number;
const sum_all: SumAll = (xs) => {
  if (xs.length === 0) {
    return 0;
  }
  const [head, ...rest] = xs; // Get the first, then put the rest in another array
  return head + sum_all(rest); // Recursion, adding head to the rest
};

console.log(sum_all([1, 2, 3, 4]));

// Which we could rewrite as:
const sum_all2: SumAll = (xs) =>
  xs.length === 0 ? 0 : xs[0] + sum_all2(xs.slice(1));

console.log(sum_all2([1, 2, 3, 4]));
// That said, this is very difficult to read, so I will be sticking with the first version
