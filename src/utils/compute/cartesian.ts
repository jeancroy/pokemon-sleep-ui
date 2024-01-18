export function* cartesianIterator<T>(items: T[][]): Generator<T[]> {
  const remainder = items.length > 1 ? cartesianIterator(items.slice(1)) : [[]];

  if (!items.length) {
    return [];
  }

  for (const r of remainder) {
    for (const h of items.at(0)!) {
      yield [h, ...r];
    }
  }
}
