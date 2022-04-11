export type Tuple<T> = [T, T];

const makeTuples = <T>(values: T[]): Tuple<T>[] => {
  let firstValueOfTuple: T | undefined = undefined;
  return values.reduce((acc, cur) => {
    if (firstValueOfTuple === undefined) {
      firstValueOfTuple = cur;
      return acc;
    }
    const tuple = [firstValueOfTuple, cur];
    firstValueOfTuple = cur;
    return [...acc, tuple];
  }, []);
};

export default makeTuples;
