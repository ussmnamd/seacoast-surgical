export const getEdgePoint = (): string => {
  const edge = process.env.ApiEdgePoint || "";
  return edge;
};
