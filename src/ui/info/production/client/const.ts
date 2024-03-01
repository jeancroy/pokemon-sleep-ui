import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {ProducingParamsSort} from '@/ui/info/production/client/type';


export const producingParamsSortToI18nId: {
  [sort in ProducingParamsSort]: I18nMessageKeysOfNamespace<'UI.Pokemon'>
} = {
  id: 'Individual.Id',
  ingredientRate: 'Stats.Ingredient.Rate',
  skillRate: 'Stats.MainSkill.TriggerRate',
};
