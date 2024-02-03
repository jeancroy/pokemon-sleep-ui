export const locales = [
  'en',
  'zh',
  'ja',
  'kr',
  'de',
  'es',
] as const;

export type Locale = typeof locales[number];
