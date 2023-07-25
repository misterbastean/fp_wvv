// https://www.youtube.com/watch?v=g0dbedNM-i Y
export {};
//Sometimes we want to provide feedback on why a value doesn't exist
// Let's say we have the following function:
function divideTwoIfEvenPartial(num: number): number {
  if (num === 0) {
    throw "Cannot divide by zero";
  } else if (num % 2 !== 0) {
    throw "Num is not even";
  } else {
    return 2 / num;
  }
}

// The problem is that this is a partial function, and we don't work with those in FP
// So let's make it total by returning an Option
type Option<A> = Some<A> | None;
interface Some<A> {
  _tag: "Some";
  value: A;
}

interface None {
  _tag: "None";
}
const some = <A>(x: A): Option<A> => ({ _tag: "Some", value: x });
const none: Option<never> = { _tag: "None" };

function divideTwoIfEvenWithOption(num: number): Option<number> {
  if (num === 0) {
    return none;
  } else if (num % 2 !== 0) {
    return none;
  } else {
    return some(2 / num);
  }
}
// But what abour error messages? As it is, it just gets "none" for all invalid cases
// We can use Either, which is a type constructor that receives 2 types: Right and Left
// Right is happy path, and Left is for errors
type Either<E, A> = Left<E> | Right<A>;
interface Left<E> {
  readonly _tag: "Left";
  readonly left: E;
}
interface Right<A> {
  readonly _tag: "Right";
  readonly right: A;
}

// And we need our helper functions to implement these
const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: "Left",
  left: e,
});

const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: "Right",
  right: a,
});

// Note the "never" type declarations. We use that since those types should not receive a value,
// as they don't apply (e.g. we don't need a "left" type in our "right" helper function)

function divideTwoIfEvenEither(num: number): Either<string, number> {
  if (num === 0) {
    return left("Cannot divide by zero");
  } else if (num % 2 !== 0) {
    return left("Num is not even");
  } else {
    return right(2 / num);
  }
}

// Now we're able to have a total function that also returns error messages if there's a problem.
