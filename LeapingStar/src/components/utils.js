export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isLineInCircle(linePosition, circle) {
  if (
    linePosition[0][1] >= circle.position[1] &&
    linePosition[0][1] <= circle.position[1] + circle.radius &&
    linePosition[0][0] < circle.position[0] &&
    linePosition[1][0] > circle.position[0]
  ) {
    return true;
  }
  return false;
}

export function isPointInCircle(point, circle) {
  return (
    Math.sqrt(
      Math.pow(point[0] - circle.position[0], 2) +
        Math.pow(point[1] - circle.position[1], 2)
    ) < circle.r
  );
}
