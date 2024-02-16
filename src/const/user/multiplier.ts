import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {UserStrengthMultiplierApplyBehavior} from '@/types/userData/settings/multiplier';


export const strengthMultiplierBehaviorI18nId: {
  [type in UserStrengthMultiplierApplyBehavior]: I18nMessageKeysOfNamespace<'UI.UserSettings.Multiplier'>
} = {
  default: 'Strength.Behavior.Default',
  custom: 'Strength.Behavior.Custom',
};
