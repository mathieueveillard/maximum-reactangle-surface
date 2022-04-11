// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";
expect.extend(matchers);
import {
  Obstacle,
  Map,
  Rectangle,
  generateRectangles,
  mergeRectanglesVertically,
  mergeRectanglesHorizontally,
  mergeRectangles,
  findMaximumSurfaceRectangle,
} from ".";

describe("Generate all rectangles", function () {
  test("2 obstacles", function () {
    /*
     *   * * * * * * *
     *   * A         *
     *   *           *
     *   *           *
     *   *         B *
     *   * * * * * * *
     */
    // GIVEN
    const A: Obstacle = { x: 0, y: 1 };
    const B: Obstacle = { x: 1, y: 0 };
    const map: Map = [A, B];

    // WHEN
    const actual = generateRectangles(map);

    // THEN
    const expected: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
    ];
    expect(actual).toEqual(expected);
  });

  test("3 obstacles", function () {
    /*
     *   * * * * * * *
     *   * A         *
     *   *      C    *
     *   *           *
     *   *         B *
     *   * * * * * * *
     */
    // GIVEN
    const A: Obstacle = { x: 0, y: 2 };
    const B: Obstacle = { x: 2, y: 0 };
    const C: Obstacle = { x: 1, y: 1 };
    const map: Map = [A, B, C];

    // WHEN
    const actual = generateRectangles(map);

    // THEN
    const expected: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 1, y: 1 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of mergeRectanglesVertically()", function () {
  test("", function () {
    /*
     *   * * * * * * *
     *   * A         *
     *   *      C    *
     *   *           *
     *   *         B *
     *   * * * * * * *
     */

    // GIVEN
    const rectangles: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 1, y: 1 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
    ];

    // WHEN
    const actual = mergeRectanglesVertically(rectangles);

    // THEN
    const expected: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 1, y: 1 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
    ];
    expect(actual).toEqual(expected);
  });

  test("Exclude non-adjacent rectangles", function () {
    // GIVEN
    const rectangles: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 1, y: 2 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
    ];

    // WHEN
    const actual = mergeRectanglesVertically(rectangles);

    // THEN
    const expected: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 1, y: 2 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of mergeRectanglesHorizontally()", function () {
  test("", function () {
    /*
     *   * * * * * * *
     *   * A         *
     *   *      C    *
     *   *           *
     *   *         B *
     *   * * * * * * *
     */

    // GIVEN
    const rectangles: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 1, y: 1 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
    ];

    // WHEN
    const actual = mergeRectanglesHorizontally(rectangles);

    // THEN
    const expected: Rectangle[] = [
      { topLeft: { x: 0, y: 1 }, bottomRight: { x: 1, y: 0 } },
      { topLeft: { x: 0, y: 1 }, bottomRight: { x: 2, y: 0 } },
      { topLeft: { x: 0, y: 2 }, bottomRight: { x: 1, y: 1 } },
      { topLeft: { x: 0, y: 2 }, bottomRight: { x: 2, y: 1 } },
      { topLeft: { x: 1, y: 1 }, bottomRight: { x: 2, y: 0 } },
      { topLeft: { x: 1, y: 2 }, bottomRight: { x: 2, y: 1 } },
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Test of mergeRectangles()", function () {
  test("", function () {
    /*
     *   * * * * * * *
     *   * A         *
     *   *    B      *
     *   *       C   *
     *   *         D *
     *   * * * * * * *
     */

    // GIVEN
    const rectangles: Rectangle[] = [
      {
        topLeft: { x: 0, y: 1 },
        bottomRight: { x: 1, y: 0 },
      },
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 1, y: 1 },
      },
      {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 1, y: 2 },
      },
      {
        topLeft: { x: 0, y: 4 },
        bottomRight: { x: 1, y: 3 },
      },
      {
        topLeft: { x: 1, y: 1 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      },
      {
        topLeft: { x: 1, y: 3 },
        bottomRight: { x: 2, y: 2 },
      },
      {
        topLeft: { x: 1, y: 4 },
        bottomRight: { x: 2, y: 3 },
      },
      {
        topLeft: { x: 2, y: 1 },
        bottomRight: { x: 3, y: 0 },
      },
      {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      },
      {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 2 },
      },
      {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 3, y: 3 },
      },
      {
        topLeft: { x: 3, y: 1 },
        bottomRight: { x: 4, y: 0 },
      },
      {
        topLeft: { x: 3, y: 2 },
        bottomRight: { x: 4, y: 1 },
      },
      {
        topLeft: { x: 3, y: 3 },
        bottomRight: { x: 4, y: 2 },
      },
      {
        topLeft: { x: 3, y: 4 },
        bottomRight: { x: 4, y: 3 },
      },
    ];

    // WHEN
    const actual = mergeRectangles(rectangles);

    // THEN
    const expected: Rectangle[] = [
      {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 2, y: 0 },
      },
      {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 4, y: 2 },
      },
    ];
    expect(actual).toIncludeAllMembers(expected);
  });
});

describe("Test of findMaximumSurfaceRectangle()", function () {
  test("", function () {
    /*
     *   * * * * * * *
     *   * A         *
     *   *    B      *
     *   *       C   *
     *   *         D *
     *   * * * * * * *
     */

    // GIVEN
    const A: Obstacle = { x: 0, y: 3 };
    const B: Obstacle = { x: 1, y: 2 };
    const C: Obstacle = { x: 2, y: 1 };
    const D: Obstacle = { x: 3, y: 0 };
    const map: Map = [A, B, C, D];

    // WHEN
    const actual = findMaximumSurfaceRectangle(map);

    // THEN
    const expected: Rectangle = {
      topLeft: { x: 0, y: 2 },
      bottomRight: { x: 2, y: 0 },
    };
    expect(actual).toEqual(expected);
  });
});
