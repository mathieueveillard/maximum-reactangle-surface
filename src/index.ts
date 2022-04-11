import and from "./util/and";
import get from "./util/get";
import makeTuples from "./util/tuple";
import ascending from "./util/sort/ascending";
import computeCardinalProduct from "./util/cardinalProduct";
import generateAllCombinations from "./util/combination";

export type Coordinates = Readonly<{
  x: number;
  y: number;
}>;

export type Obstacle = Coordinates;

export type Map = Obstacle[];

export type Rectangle = Readonly<{
  topLeft: Coordinates;
  bottomRight: Coordinates;
}>;

const getX = get<Obstacle, "x">("x");

const getY = get<Obstacle, "y">("y");

export const generateRectangles = (map: Map): Rectangle[] => {
  const xs = makeTuples(map.map(getX).sort(ascending));
  const ys = makeTuples(map.map(getY).sort(ascending));
  return computeCardinalProduct({ xs, ys }).map(([[x1, x2], [y1, y2]]) => ({
    topLeft: { x: x1, y: y2 },
    bottomRight: { x: x2, y: y1 },
  }));
};

const rectanglesAreVerticallyAligned = ([r1, r2]: [Rectangle, Rectangle]): boolean =>
  r1.topLeft.x === r2.topLeft.x && r1.bottomRight.x === r2.bottomRight.x;

const rectanglesAreIdenticalOrVerticallyAdjacent = ([r1, r2]: [Rectangle, Rectangle]): boolean =>
  r1 === r2 || r1.topLeft.y === r2.bottomRight.y;

const mergeVerticalNeighbours = ([r1, r2]: [Rectangle, Rectangle]): Rectangle => ({
  topLeft: { x: r1.topLeft.x, y: r2.topLeft.y },
  bottomRight: { x: r1.bottomRight.x, y: r1.bottomRight.y },
});

export const mergeRectanglesVertically = (rectangles: Rectangle[]): Rectangle[] => {
  return generateAllCombinations(rectangles)
    .filter(and([rectanglesAreVerticallyAligned, rectanglesAreIdenticalOrVerticallyAdjacent]))
    .map(mergeVerticalNeighbours);
};

const rectanglesAreIdenticalOrHorizontallyAligned = ([r1, r2]: [Rectangle, Rectangle]): boolean =>
  r1 === r2 || r1.bottomRight.x === r2.topLeft.x;

const rectanglesAreHorizontallyAdjacent = ([r1, r2]: [Rectangle, Rectangle]): boolean =>
  r1.topLeft.y === r2.topLeft.y && r1.bottomRight.y === r2.bottomRight.y;

const mergeHorizontalNeighbours = ([r1, r2]: [Rectangle, Rectangle]): Rectangle => ({
  topLeft: r1.topLeft,
  bottomRight: r2.bottomRight,
});

export const mergeRectanglesHorizontally = (rectangles: Rectangle[]): Rectangle[] => {
  return generateAllCombinations(rectangles)
    .filter(and([rectanglesAreIdenticalOrHorizontallyAligned, rectanglesAreHorizontallyAdjacent]))
    .map(mergeHorizontalNeighbours);
};

export const mergeRectangles = (rectangles: Rectangle[]): Rectangle[] => {
  const result = [...mergeRectanglesVertically(rectangles), ...mergeRectanglesHorizontally(rectangles)];
  return [...mergeRectanglesVertically(result), ...mergeRectanglesHorizontally(result)];
};

const computeSurface = ({ topLeft, bottomRight }: Rectangle): number =>
  (bottomRight.x - topLeft.x) * (topLeft.y - bottomRight.y);

const sortByDecreasingSurface = (r1: Rectangle, r2: Rectangle): number => computeSurface(r2) - computeSurface(r1);

export const findMaximumSurfaceRectangle = (map: Map): Rectangle => {
  const rectangles = generateRectangles(map);
  return mergeRectangles(rectangles).sort(sortByDecreasingSurface)[0];
};
