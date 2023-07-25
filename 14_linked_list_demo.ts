// https://www.youtube.com/watch?v=XGLGn-sf8YQ
export {};

type List<A> = Nil | Cons<A>;

interface Nil {
  readonly _tag: "Nil";
}

interface Cons<A> {
  readonly _tag: "Cons";
  head: A;
  tail: List<A>;
}

const nil: List<never> = { _tag: "Nil" };
const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: "Cons",
  head,
  tail,
});

// We need another helper function to differentiate between nil and cons
const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === "Nil";

// Defing a list of 1, 2, 3
const myList = cons(1, cons(2, cons(3, nil)));
console.log(myList);

// This format is dookie, so let's fix it:
console.log(JSON.stringify(myList, null, 2));
// Slightly better, but still pretty horrible.

// So let's create a function to return a string that's easy to read
type ShowList = <A>(xs: List<A>) => string;
const showListBetter: ShowList = (xs) =>
  isNil(xs) ? "" : `${xs.head}, ${showListBetter(xs.tail)}`;

console.log(showListBetter(myList));
// That's much better! We recursively go through each item in the list.
// but we're still seeing a comma at the end, so let's get rid of that.
const showList: ShowList = (xs) =>
  isNil(xs)
    ? ""
    : `${xs.head}` + (isNil(xs.tail) ? "" : `, ${showList(xs.tail)}`);

console.log(showList(myList));
// By looking ahead, we can determine if we should show the comma and next item or not.
