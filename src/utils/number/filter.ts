export const isValueValidNumber = <TValue>(value: TValue | null | undefined): value is TValue => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value !== 'number') {
    return false;
  }

  // noinspection BadExpressionStatementJS
  value satisfies TValue;
  return !isNaN(value);
};
