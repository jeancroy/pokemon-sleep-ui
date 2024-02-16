import {StrengthMultiplierType} from '@/types/game/bonus/strength';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const strengthMultiplierTypeI18nId: {
  [type in StrengthMultiplierType]: I18nMessageKeysOfNamespace<'UI.Multiplier'>
} = {
  berry: 'Strength.Type.Berry',
  cooking: 'Strength.Type.Cooking',
  skill: 'Strength.Type.Skill',
};
