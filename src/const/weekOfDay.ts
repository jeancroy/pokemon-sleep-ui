import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const daysInWeek = 7;

export const weekOfDayI18nId: {
  [day in number]: I18nMessageKeysOfNamespace<'UI.WeekOfDay'>
} = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday',
};
