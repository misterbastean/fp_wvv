// https://www.youtube.com/watch?v=Kv26EC6qU18
export {}; // Just to let TS know this is a module to prevent name clashes

// In FP, we don't have null as we traditionally think of it
// Remember, there are Partial functions and Total functions
// Where Total functions map every possible input, and Partial functions do not.
// Ex of a Partial function:
const divideTwoByNumber = (x: number) => 2 / x;
// This function does not include 0, as you cannot divide by 0.

//Ex of a Total function:
const increment = (x: number) => x + 1;
// This function includes all possible numbers, as you can increment any number by 1

// So, to make divideTwoByNumber total, we could return something if the input is 0
// The first thought would be to return null. But if we return null, that means
// null is now included in the set of numbers we have to handle. So increment would
// need to handle null inputs as well. This cascades through all the functions we write.

// But to be honest, null doesn't have a problem in and of itself
// Instead, we are thinking about null incorrectly
// Remember, a type is just a set of values (e.g. number = a set of all numbers)
// So we need to exclude null by default, and include it specifically when we need to
// Ex.
type Integer = number;
type MaybeInteger = Integer | null;

// "Cardinality" of a type is the number of elements that the type has
// Notation for this is pipes around the type. Ex. Type A's cardinality is |A|
// So |MaybeInteger| = |Integer| + 1

// In FP, a type that could be null is called "Option"
type Option1<A> = A | null;
// This just means that the value could possibly be null.
const myNum: Option1<number> = 4;
const myNum2: Option1<number> = null;

// This allows us to have null values, when the "number" type does not
// const cantBeNull: number = null  // This throws a compiler error

// There are a few edge cases so we have to do a little more
type Option2<A> = Some2<A> | None;
type Some2<A> = {
  value: A;
};
const none = Symbol("None"); // Use Symbol to make it unique
type None = typeof none;

// This ensures that None will never equal anything
// because Symbol makes it unique across the whole application.

// Here's another way to implement Some and None
type Option3<A> = Some3<A> | None2;
interface Some3<A> {
  readonly _tag: "Some";
  readonly value: A;
}

interface None2 {
  readonly _tag: "None";
}

// Just using objects. And this is how fp-ts implements these types
// So we could have the following:
const some = <A>(a: A): Option3<A> => ({
  _tag: "Some",
  value: a,
});
console.log(some("foo"));

const none3: Option3<never> = {
  _tag: "None",
};
console.log(none3);

// So now that we have these new options, let's rewrite our initial function DivideTwoBy to return an Option
function divideTwoBy(x: number): Option3<number> {
  if (x === 0) return none3;
  return some(2 / x);
}

// Redeclaring our compose function
type Compose = <A, B, Z>(f: (x: A) => B, g: (x: B) => Z) => (x: A) => Z;
const compose: Compose = (f, g) => (x) => g(f(x));
const bumpChop = compose(increment, divideTwoBy);
console.log(bumpChop(1));
console.log(bumpChop(-1));
// Notice the second one increments -1 to 0, which causes divideTwoBy to return the None object
