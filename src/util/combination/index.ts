export type Combinations<T> = [T, T][];

const generateAllCombinations = <T>(values: T[]): Combinations<T> => {
  return values.reduce((acc, cur, index) => {
    const additionalTuples = values.slice(index).map((value) => [cur, value]);
    return [...acc, ...additionalTuples];
  }, []);
};

export default generateAllCombinations;
