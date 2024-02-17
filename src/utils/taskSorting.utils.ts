// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSortOption = (sortOption: any) => {
  const [sort, order] = sortOption.split("-");
  return { sort, order };
};
