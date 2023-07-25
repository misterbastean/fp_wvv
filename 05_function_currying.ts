// https://www.youtube.com/watch?v=dqA83Gb__rU
export {}; // Just to let TS know this is a module to prevent name clashes

// In FP, there is no difference between a function call and its body.
// "Functions are just aliases for their definition"
// So sum(1,3) is the exact same as 1+3.
// In imperitive programming, we thought of function calls as just that: calling the code in the function.
// But in FP, we think of functions as values; specifically the function's return value
// So sum(2,5) is not a block of code to run, it's just the number 7.

//===================
// CURRYING
//===================
// In FP, functions only receive one input. The term for this is Unary Functions.
// So what do we do if a function needs two or more inputs? We use Currying!

// Example function with 2 inputs (not FP):
const sum1 = (x: number, y: number) => x + y;
console.log(sum1(2, 3));

// We can convert this into two Uniary functions:
const sum2 = (x: number) => {
  return (y: number) => {
    return x + y;
  };
};
console.log(sum2(2)(3));

// We can simplify this into a single line:
const sum3 = (x: number) => (y: number) => x + y;
console.log(sum2(2)(3));
// This convention will come up a LOT in FP. fn = (x) => (y) => (z) => x+y+z

// One benefit of this curried approach is we can "short circuit" the chain
// and have a function that does a subsection with specific parameters.
// For example:
const increment = sum3(1);
console.log(increment(2));

const sumWithTen = sum3(10);
console.log(sumWithTen(5));

// another example:
const getFullName = (lastName: string) => (firstName: string) =>
  `${firstName} ${lastName}`;
console.log(getFullName("Bastean")("Josh"));

// And we can break that down:
const makeBastean = getFullName("Bastean");
console.log(makeBastean("Kimberly"));
console.log(makeBastean("Zoë"));
console.log(makeBastean("Jacob"));
console.log(makeBastean("Maggie"));
