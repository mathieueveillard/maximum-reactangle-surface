type Predicate<T> = (t: T) => boolean;

const and =
  <T>(fns: Predicate<T>[]) =>
  (t: T): boolean =>
    fns.reduce((acc, fn) => acc && fn(t), true);

export default and;
