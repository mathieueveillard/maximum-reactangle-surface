import generateAllCombinations, { Combinations } from ".";

describe("Test of generateAllCombinations()", function () {
  test("2 values", function () {
    // GIVEN
    const values = [0, 1];

    // WHEN
    const actual = generateAllCombinations(values);

    // THEN
    const expected: Combinations<number> = [
      [0, 0],
      [0, 1],
      [1, 1],
    ];
    expect(actual).toEqual(expected);
  });

  test("3 values", function () {
    // GIVEN
    const values = [0, 1, 2];

    // WHEN
    const actual = generateAllCombinations(values);

    // THEN
    const expected: Combinations<number> = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
      [1, 2],
      [2, 2],
    ];
    expect(actual).toEqual(expected);
  });
});
