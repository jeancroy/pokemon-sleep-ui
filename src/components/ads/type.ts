export type AdsContentProps = {
  className?: string,
  heightOverride?: string,
  hideWarningOnDetected?: boolean,
};

export type AdsUnitProps = AdsContentProps & {
  alwaysSingle?: boolean,
};

export type AdBlockState = {
  isBlocked: boolean,
};
