type DivideTwo = (x: number) => number;
const divideTwo: DivideTwo = (x) => 2 / x;

// Try it with almost any number, it works fine.
console.log(divideTwo(8));

// But if you try it with 0, it doesn't work, because you can't divide by 0
console.log(divideTwo(0));

// What if we try to compose with another function?
// Copying compose function, because Quokka free doesn't support importing
type Compose = <A, B, C>(f: (x: A) => B, g: (x: B) => C) => (x: A) => C;
const compose: Compose = (f, g) => (x) => g(f(x));

type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;

const composed = compose(divideTwo, increment);
console.log(composed(8));
console.log(composed(0));

// That doesn't work, because we're still trying to divide by 0
// So we need to add Options

type Option<A> = Some<A> | None;
interface Some<A> {
  _tag: "Some";
  value: A;
}

interface None {
  _tag: "None";
}

// But we need some helper functions to actually implement the Option type
const some = <A>(x: A): Option<A> => ({ _tag: "Some", value: x });
// This is a function that gets an input of any type, and returns a wrapped version of it
const none: Option<never> = { _tag: "None" };
// We also need a function that distinguishes between Some and None
const isNone = <A>(x: Option<A>): x is None => x._tag === "None";
// Note the "x is None" - this is a type guard that tells the compiler that the Option passed will be None

// So now we give it a try:
type DivideTwo2 = (x: number) => Option<number>;
const divideTwo2: DivideTwo2 = (x) => (x === 0 ? none : some(2 / x));
// Notice that we're checking the edge case and returning our "none" custom variable if so
// If not, we're wrapping our response in "some()"

// const compose2 = compose(divideTwo2, increment)
// Compiler doens't like this, because divideTwo2 output is an Option, increment expects a number
// There is an elegant way to fix this, with functors, but we're not there yet.
// So let's just fix this for now:
const composed2 = compose(divideTwo2, (x: Option<number>) =>
  isNone(x) ? none : some(increment(x.value))
);
console.log(composed2(8));
console.log(composed2(0));

// So now we no longer have weird bugs - it works with all numbers, returning our None if 0 is used.
