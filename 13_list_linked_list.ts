// https://www.youtube.com/watch?v=YIgmGxdQxw8
export {};
type List<A> = Nil | Cons<A>;

// Nil is a singleton value in the whole application, indicating the end of a Linked List
interface Nil {
  readonly _tag: "Nil";
}

// Cons is a node in a list, storing value of type A. Also points to the next node.
// The term "Cons" comes from the Lisp language, meaning "Constructing Lists"
interface Cons<A> {
  readonly _tag: "Cons";
  readonly head: A;
  readonly tail: List<A>;
}

const nil: List<never> = { _tag: "Nil" };

// Function that creates a new node of type A, and includes info for the next node.
const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: "Cons",
  head,
  tail,
});
