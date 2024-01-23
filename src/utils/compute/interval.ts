import {Interval} from '@/types/compute';


export const mergeIntervals = (intervals: Interval[]): Interval[] => {
  if (!intervals.length) {
    return [];
  }

  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const merged = [{...sorted[0]}];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const resultTail = merged.at(-1);

    if (!resultTail) {
      continue;
    }

    if (current.start <= resultTail.end) {
      merged[merged.length - 1].end = Math.max(resultTail.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
};


type GetUnblockedIntervalsBySingleOpts = {
  base: Interval[],
  singleBlocked: Interval,
};

export const getUnblockedIntervalsBySingle = ({
  base,
  singleBlocked,
}: GetUnblockedIntervalsBySingleOpts): Interval[] => {
  if (!base.length) {
    return [];
  }

  const mergedBase = mergeIntervals(base);

  const result: Interval[] = [];

  for (const singleBase of mergedBase) {
    if (singleBlocked.end < singleBase.start || singleBlocked.start >= singleBase.end) {
      result.push({...singleBase});
      continue;
    }

    if (singleBlocked.start > singleBase.start) {
      result.push({
        start: singleBase.start,
        end: singleBlocked.start,
      });
    }

    if (singleBlocked.end < singleBase.end) {
      result.push({
        start: singleBlocked.end,
        end: singleBase.end,
      });
    }
  }

  return result;
};

type GetUnblockedIntervalsOpts = {
  base: Interval[],
  blocked: Interval[],
};

export const getUnblockedIntervals = ({base, blocked}: GetUnblockedIntervalsOpts): Interval[] => {
  if (!base.length) {
    return [];
  }

  const mergedBlocked = mergeIntervals(blocked);

  let result: Interval[] = mergeIntervals(base);

  for (const singleBlocked of mergedBlocked) {
    result = getUnblockedIntervalsBySingle({
      base: result,
      singleBlocked,
    });
  }

  return result;
};
