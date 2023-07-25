// https://www.youtube.com/watch?v=chBi2SSkZ-g
export {};

// COMPOSING TYPES
// Start with the smallest composable parts (primitives) and build on them.
// Remember, types are just sets of values
// So how can we compose these sets of values?

// One way is "Product Types"
// For example, we have Integer and Bool, so we could combine these:

// 0, true
// 0, false
// 1, true
// 1, false
// etc...

// In TS, we can use object types or tuples to compose other types. For example:
type UserRecord = {
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
  };
};

type UserTuple = [string, number, [string, string]];

// Another example is Sum Type, which is a union of two+ possible types
// For example, we could have a type that's a union of Integer and Boolean
// So the type could be either an Integer or a Boolean
// The term for each possible group of values is a Variant.
// So we have Integer Variant and Boolean Variant in our exmaple.
// In TS, we model this using union types with the pipe (|) symbol
type NumOrBool = number | boolean;
const exampleNumOrBool: NumOrBool = 5;
const exampleNumOrBool2: NumOrBool = true;

type Either<E, A> = { _tag: "Left"; left: E } | { _tag: "Right"; right: A };

const exampleEither: Either<string, number> = { _tag: "Right", right: 5 };
const exampleEither2: Either<string, number> = {
  _tag: "Left",
  left: "error",
};

// "ADT" stands for Algebraic Data Type
// It's basically a composite type using operations:
//    - Product operation
//    - Sum operation
// Not to be confused with Abstract Data Types
