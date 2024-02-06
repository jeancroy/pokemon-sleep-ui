import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {UserStrengthMultiplierApplyBehavior} from '@/types/userData/settings/multiplier';


export const strengthMultiplierTypeI18nId: {
  [type in StrengthMultiplierType]: I18nMessageKeysOfNamespace<'UI.UserSettings.Multiplier'>
} = {
  berry: 'Strength.Type.Berry',
  cooking: 'Strength.Type.Cooking',
  skill: 'Strength.Type.Skill',
};

export const strengthMultiplierBehaviorI18nId: {
  [type in UserStrengthMultiplierApplyBehavior]: I18nMessageKeysOfNamespace<'UI.UserSettings.Multiplier'>
} = {
  default: 'Strength.Behavior.Default',
  custom: 'Strength.Behavior.Custom',
};
