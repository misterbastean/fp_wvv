// https://www.youtube.com/watch?v=ZXbXTMLr9QU
export {};

// Import all the types we need from previous videos
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
const isNone = <A>(x: Option<A>): x is None => x._tag === "None";

// The purpose of this is to allow us to create composite types (e.g. type C = A | B)
// and also allow us to extract values from these composite types.

// Option
type Match = <A, B>(
  onNone: () => B,
  onSome: (a: A) => B
) => (x: Option<A>) => B;

// This function takes 2 callbacks, then calls the correct one depending on the path
// For the onSome, it first unwraps the value, then passes it to the callback.
// Notice that the function it returns needs to be curried
const match: Match = (onNone, onSome) => (x) =>
  isNone(x) ? onNone() : onSome(x.value);

// So let's try it out
const maybeNum: Option<number> = some(12);

const result = match(
  () => `num does not exist`,
  (a: number) => `num is ${a}`
)(maybeNum);
// Remember, the first callback is for None, the second is for Some
// So in this case, since the value exists, the second option is called

const notNum: Option<number> = none;
const result2 = match(
  () => `num does not exist`,
  (a: number) => `num is ${a}`
)(notNum);
// In this case, since the value doesn't exist, the first option is called.

console.log(result);
console.log(result2);

// This works great as long as we return the same type from our result function (string in this case)
// But if we want to be able to return different types, we need to make some updates.
type Match2 = <A, B, C>(
  onNone: () => B,
  onSome: (a: A) => C
) => (x: Option<A>) => B | C;
const match2: Match2 = (onNone, onSome) => (x) =>
  isNone(x) ? onNone() : onSome(x.value);

const result3 = match2(
  () => -1,
  (a: number) => `num is ${a}`
)(maybeNum);

const result4 = match2(
  () => -1,
  (a: number) => `num is ${a}`
)(notNum);

console.log(result3);
console.log(result4);
// this type of matching in fp-ts is called MatchW

// Either
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

type MatchEither = <E, A, B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => (x: Either<E, A>) => B;

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === "Left";

const matchEither: MatchEither = (onLeft, onRight) => (x) =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right);

const errorOrNum: Either<string, number> = right(12);
const resultEither1 = matchEither(
  (e: string) => `Error happened: ${e}`,
  (a: number) => `num is ${a}`
)(errorOrNum);
console.log(resultEither1);

const errorOrNum2: Either<string, number> = left("Well, crap, it broke.");

const resultEither2 = matchEither(
  (e: string) => `Error happened: ${e}`,
  (a: number) => `num is ${a}`
)(errorOrNum2);
console.log(resultEither2);
