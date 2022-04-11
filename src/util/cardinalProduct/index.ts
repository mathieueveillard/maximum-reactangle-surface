import { Tuple } from "../tuple";

const computeCardinalProduct = <T>({ xs, ys }: { xs: Tuple<T>[]; ys: Tuple<T>[] }): [Tuple<T>, Tuple<T>][] => {
  return xs.map<[Tuple<T>, Tuple<T>][]>((xTuple) => ys.map((yTuple) => [xTuple, yTuple])).flat(1);
};

export default computeCardinalProduct;
