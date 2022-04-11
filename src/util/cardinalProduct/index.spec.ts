import computeCardinalProduct from ".";
import { Tuple } from "../tuple";

describe("Test of computeCardinalProduct()", function () {
  test("1 of each", function () {
    // GIVEN
    const xs: Tuple<number>[] = [[1, 2]];
    const ys: Tuple<number>[] = [[10, 20]];

    // WHEN
    const actual = computeCardinalProduct({ xs, ys });

    // THEN
    const expected: [Tuple<number>, Tuple<number>][] = [
      [
        [1, 2],
        [10, 20],
      ],
    ];
    expect(actual).toEqual(expected);
  });

  test("2 of the first", function () {
    // GIVEN
    const xs: Tuple<number>[] = [
      [1, 2],
      [3, 4],
    ];
    const ys: Tuple<number>[] = [[10, 20]];

    // WHEN
    const actual = computeCardinalProduct({ xs, ys });

    // THEN
    const expected: [Tuple<number>, Tuple<number>][] = [
      [
        [1, 2],
        [10, 20],
      ],
      [
        [3, 4],
        [10, 20],
      ],
    ];
    expect(actual).toEqual(expected);
  });

  test("2 of the second", function () {
    // GIVEN
    const xs: Tuple<number>[] = [[1, 2]];
    const ys: Tuple<number>[] = [
      [10, 20],
      [30, 40],
    ];

    // WHEN
    const actual = computeCardinalProduct({ xs, ys });

    // THEN
    const expected: [Tuple<number>, Tuple<number>][] = [
      [
        [1, 2],
        [10, 20],
      ],
      [
        [1, 2],
        [30, 40],
      ],
    ];
    expect(actual).toEqual(expected);
  });
});
