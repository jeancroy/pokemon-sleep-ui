import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const sortTypeToI18nId: {
  [sortType in PokemonSortType]: I18nMessageKeysOfNamespace<'UI.Pokemon'>
} = {
  id: 'Individual.Id',
  level: 'Individual.Level',
  dateAdded: 'Individual.DateRegistered',
  berryEnergy: 'Stats.Strength.Berry',
  berryCount: 'Stats.Count.Berry',
  ingredientEnergy: 'Stats.Strength.Ingredient',
  ingredientCount: 'Stats.Count.Ingredient',
  ingredientRate: 'Stats.Ingredient.Rate',
  totalEnergy: 'Stats.Strength.Total',
  friendshipPoint: 'Info.Stats.Friendship',
  transferReward: 'Info.Stats.TransferReward',
  frequencyBase: 'Stats.Frequency.Base',
  frequency: 'Stats.Frequency.Equivalent',
  frequencyOfBerry: 'Stats.Frequency.Berry',
  frequencyOfIngredient: 'Stats.Frequency.Ingredient',
  timeToFullPackPrimary: 'Stats.TimeToFullPack.Primary',
  timeToFullPackSecondary: 'Stats.TimeToFullPack.Secondary',
  mainSkillLevel: 'Stats.MainSkill.Level',
  mainSkillTriggerRate: 'Stats.MainSkill.TriggerRate',
  mainSkillDailyCount: 'Stats.MainSkill.DailyCount',
  mainSkillDailyStrength: 'Stats.Strength.Skill',
  mealCoverage: 'Stats.Ingredient.MealCoverage',
};
