import {MealCoverageComboData, MealCoverageComboSort} from '@/components/shared/meal/coverage/combo/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const mealCoverageComboSortI18nId: {
  [sort in MealCoverageComboSort]: I18nMessageKeysOfNamespace<'UI.Component.MealCoverageCombo'>
} = {
  ingredientCoverage: 'IngredientCoverage',
  coveredStrength: 'CoveredStrength',
};

export const mealCoverageComboSortBasisGetter: {
  [sort in MealCoverageComboSort]: (data: MealCoverageComboData) => number
} = {
  ingredientCoverage: ({coverage}) => coverage.total,
  coveredStrength: ({coveredStrength}) => coveredStrength,
};
