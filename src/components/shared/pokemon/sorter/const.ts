import {PokemonSortType} from '@/components/shared/pokemon/sorter/type';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


export const sortTypeToI18nId: {
  [sortType in PokemonSortType]: I18nMessageKeysOfNamespace<'UI.InPage.Pokedex'>
} = {
  id: 'Sort.Id',
  level: 'Info.PokemonLevel',
  dateAdded: 'Sort.DateRegistered',
  berryEnergy: 'Sort.BerryEnergy',
  berryCount: 'Sort.BerryCount',
  ingredientEnergy: 'Sort.IngredientEnergy',
  ingredientCount: 'Sort.IngredientCount',
  ingredientRate: 'Sort.IngredientRate',
  totalEnergy: 'Sort.TotalEnergy',
  friendshipPoint: 'Sort.FriendshipPoint',
  transferReward: 'Stats.TransferReward',
  frequencyBase: 'Stats.FrequencyBase',
  frequency: 'Stats.FrequencyEquivalent',
  frequencyOfBerry: 'Sort.FrequencyOfBerry',
  frequencyOfIngredient: 'Sort.FrequencyOfIngredient',
  timeToFullPackPrimary: 'Stats.TimeToFullPack.Primary',
  timeToFullPackSecondary: 'Stats.TimeToFullPack.Secondary',
  mainSkillLevel: 'Sort.MainSkillLevel',
  mainSkillTriggerRate: 'Stats.MainSkillTriggerRate',
  mainSkillDailyCount: 'Sort.SkillCount',
  mainSkillDailyStrength: 'Sort.SkillStrength',
  mealCoverage: 'Sort.MealCoverage',
};
