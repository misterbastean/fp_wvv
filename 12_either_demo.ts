// https://www.youtube.com/watch?v=5ZSC_yf5v3Q
export {};
function divideTwoIfEven(num: number): number {
  if (num === 0) {
    throw "Cannot divide by zero.";
  } else if (num % 2 !== 0) {
    throw "Num is not even";
  } else {
    return 2 / num;
  }
}

console.log(divideTwoIfEven(8));
// console.log(divideTwoIfEven(3));

type Either<E, A> = Left<E> | Right<A>;
interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}
interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: "Left",
  left: e,
});

const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: "Right",
  right: a,
});

function divideTwoIfEven2(num: number): Either<string, number> {
  if (num === 0) {
    return left("Cannot divide by zero");
  } else if (num % 2 !== 0) {
    return left("Input is not even.");
  } else {
    return right(2 / num);
  }
}

console.log(divideTwoIfEven2(8));
console.log(divideTwoIfEven2(0));
console.log(divideTwoIfEven2(3));

// Helper function to distinguish between left and right
const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left";

// Composing this with another function
type Increment = (x: number) => number;
const increment: Increment = (x) => x + 1;
const compose: Compose = (f, g) => (x) => g(f(x));

const composed = compose(divideTwoIfEven2, (x) =>
  isLeft(x) ? x : right(increment(x.right))
);

console.log(composed(8));
console.log(composed(4));
console.log(composed(0));
console.log(composed(3));
