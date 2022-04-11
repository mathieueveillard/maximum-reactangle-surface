import makeTuples, { Tuple } from ".";

describe("Test of makeTuples()", function () {
  test("2 values", function () {
    // GIVEN
    const values = [0, 1];

    // WHEN
    const actual = makeTuples(values);

    // THEN
    const expected: Tuple<number>[] = [[0, 1]];
    expect(actual).toEqual(expected);
  });

  test("3 values", function () {
    // GIVEN
    const values = [0, 1, 2];

    // WHEN
    const actual = makeTuples(values);

    // THEN
    const expected: Tuple<number>[] = [
      [0, 1],
      [1, 2],
    ];
    expect(actual).toEqual(expected);
  });
});
