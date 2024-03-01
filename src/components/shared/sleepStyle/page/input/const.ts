import {MapUnlockTableDisplayType} from '@/components/shared/sleepStyle/page/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const displayTypeToI18nId: {
  [displayType in MapUnlockTableDisplayType]: I18nMessageKeysOfNamespace<'UI.Pokemon.Info'>
} = {
  sleepStyle: 'SleepStyle',
  specialty: 'Specialty',
  sleepType: 'SleepType',
};
