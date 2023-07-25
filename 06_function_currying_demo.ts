// https://www.youtube.com/watch?v=mrskE3X0hXE
export {}; // Just to let TS know this is a module to prevent name clashes

function normal_sum(a: number, b: number) {
  return a + b;
}
console.log(normal_sum(3, 5));

type Sum = (a: number) => (b: number) => number;
const sum: Sum = (a) => (b) => a + b;
console.log(sum(2)(5));

type Increment = (x: number) => number;
const increment: Increment = sum(1);
console.log(increment(5));

type Decrement = (x: number) => number;
const decrement: Decrement = sum(-1);
console.log(decrement(5));

// This will curry 2 functions.
type Curry2 = <A, B, Z>(f: (a: A, b: B) => Z) => (a: A) => (b: B) => Z;
const curry2: Curry2 = (f) => (a) => (b) => f(a, b);

const sum2 = curry2(normal_sum);
console.log(sum2(1)(5));

// We could increase it to curry 3 functions as well
type Curry3 = <A, B, C, Z>(
  f: (a: A, b: B, c: C) => Z
) => (a: A) => (b: B) => (c: C) => Z;
const curry3: Curry3 = (f) => (a) => (b) => (c) => f(a, b, c);

const normal_sum_3 = (a: number, b: number, c: number) => a + b + c;
const sum3 = curry3(normal_sum_3);
console.log(sum3(5)(10)(1));

// Etc.
