export type SleepSessions<T> = {
  primary: T,
  // Can't use `undefined` because `cloneMerge()` will not consider `null` as an actual value
  secondary: T | null,
};

export type SleepSessionTimes = {
  start: number,
  end: number,
};

export type SleepSessionRecovery = {
  recovery: {
    base: number,
    actual: number,
  },
  duration: {
    actual: number,
    effective: number,
  },
};

export type SleepSessionMeta = SleepSessionRecovery & {
  adjustedTiming: SleepSessionTimes,
};

export type SleepSessionInfo = {
  session: SleepSessions<SleepSessionMeta>,
  duration: {
    awake: number,
    asleep: number,
  },
};
