// https://www.youtube.com/watch?v=o_h24YHRmGo&list=PLuPevXgCPUIMbCxBEnc1dNwboH6e2ImQo&index=2
export {}; // Just to let TS know this is a module to prevent name clashes

// In FP, functions are simply transformations.
// This is like pipes: they receive some input, and transform it into something else, which can then
// be sent into another pipe

// Ex. intToString maps an integer to a string
function intToString(n: number): string {
  return `${n}`;
}

// This receives an integer input, and transforms it into a string of that integer.

// Deterministic Functions
// These are functions that will always return the same output given the same input
// In FP, we should use deterministic functions whenever possible

// Total Functions
// In FP, functions are defined for all their input universe values.
// Contrast with Partial Functions, which do nto work for all their input universe values.
// The intToString function above is Total.
// Example of a Partial Function:
function divide(a: number, b: number): number {
  return a / b;
}

// This function works almost all of the time, but it doesn't handle if b is 0
console.log(divide(5, 0));

// Side Effects
// A function has a side effect if they read or write something outside of the function body such
// as reading or writing to a file or DB, accessing a browser window, sending an HTTP request, etc.
// So how are we able to create meaningful applications if we have to limit side effects in FP?
// In FP, we try to keep the body of our functions pure, and only have a thin layer outside of
// our application that has side effects.

// For example, postponing writing to a file by just creating an object that has the file's details
// and what to write, and postpone the actual writing until the execution gets to the outside layer.

// Pure Functions
// A function that has no side effects, is deterministic, and is Total

// Immutability
// Never mutate variables, only use constants
// Each transformation or function call creates a new constant

// Referential Transparency
// We can always replace a pure function with its definition.

// "All this trouble of defining and learning these terms is for our convenience in the long run."

// So we can simply
