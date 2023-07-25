// https://www.youtube.com/watch?v=p5L5p4NMS78
export {}; // Just to let TS know this is a module to prevent name clashes

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

console.log(increment(2));

type Tostring = (x: number) => string;
const tostring: Tostring = (x) => `"${x}"`;

console.log(tostring(4));

// This composition function combines the two above into a single call.
type IncrementThenToString = (x: number) => string;
const incrementThenToString: IncrementThenToString = (x) =>
  tostring(increment(x));

console.log(incrementThenToString(6));

// The problem with this is that it's hard coded. So if we need to extend it,
// we have to create another composition function. This is not maintainable.
// Instead, we need a function that receives functions as inputs
type Compose = <A, B, C>(f: (x: A) => B, g: (x: B) => C) => (x: A) => C;

// Note the generic typing. f is called first, so its input is A, then it outputs B
// which is piped into g, so its input is B and it outputs C.
// So the function this all returns has an input of A and an output of C
export const compose: Compose = (f, g) => (x) => g(f(x));
const incrementThenToStringBetter = compose(increment, tostring);
console.log(incrementThenToStringBetter(6));

// This lets us switch out the functions if we want:
const incrementTwice = compose(increment, increment);
console.log(incrementTwice(2));

// Or even throw in completely different function(s) without changing our compose function:
type MultiplyByTwo = (x: number) => number;
const multiplyByTwo: MultiplyByTwo = (x) => x * 2;
const timesFour = compose(multiplyByTwo, multiplyByTwo);
console.log(timesFour(4));
