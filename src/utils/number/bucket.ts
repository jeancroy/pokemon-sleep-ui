type ToBucketedOpts<TData> = {
  data: TData[],
  getBasis: (data: TData) => number,
  count: number,
  order: 'asc' | 'desc'
};

export const toBucketed = <TData>({
  data,
  getBasis,
  count,
  order,
}: ToBucketedOpts<TData>): TData[][] => {
  const basisValueList = data.map(getBasis);
  const basisList = basisValueList
    .sort((a, b) => {
      if (order === 'asc') {
        return a - b;
      }

      if (order === 'desc') {
        return b - a;
      }

      throw new Error(`Unhandled data order [${order satisfies never}] during data bucketing`);
    })
    .map((basis, dataIdx) => ({basis, dataIdx}));

  const basisMax = Math.max(...basisValueList);
  const basisMin = Math.min(...basisValueList);

  const divisor = Math.abs(basisMax - basisMin) / count;

  const ret: TData[][] = [...new Array(count)].map(() => []);
  for (const {basis, dataIdx} of basisList) {
    const bucketIdx = Math.max(
      Math.min(
        Math.ceil(Math.abs(basis - (order === 'asc' ? basisMin : basisMax)) / divisor),
        count,
      ) - 1,
      0,
    );
    ret[bucketIdx].push(data[dataIdx]);
  }

  return ret;
};
