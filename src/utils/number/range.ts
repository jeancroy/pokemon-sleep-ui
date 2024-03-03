export type GenerateRangeOfNumberOpts = {
  // This is exclusive
  max: number,
};

export const generateRangeOfNumber = ({max}: GenerateRangeOfNumberOpts) => (
  [...new Array(max).keys()]
);
