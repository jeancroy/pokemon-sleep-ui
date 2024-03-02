export const locales = [
  'en',
  'zh',
  'ja',
  'kr',
  'de',
  'es',
  'fr',
] as const;

export type Locale = typeof locales[number];
