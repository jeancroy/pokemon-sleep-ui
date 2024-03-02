import {Locale} from '@/types/next/locale';


export const localeName: {[locale in Locale]: string} = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  kr: '한국어',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
} as const;

export const defaultLocale: Locale = 'zh';
