export function partition<A, B>(
  xs: (A | B)[],
  isA: (x: any) => x is A
): [A[], B[]] {
  const as: A[] = [];
  const bs: B[] = [];
  for (const x of xs) {
    if (isA(x)) {
      as.push(x);
    } else {
      bs.push(x); // x's type narrowed to B
    }
  }
  return [as, bs];
}
