import {EffectiveBonus, UserBonus} from '@/types/game/bonus';
import {RecipeLevel} from '@/types/game/cooking';
import {Meal, MealMap} from '@/types/game/meal/main';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {Migratable} from '@/types/migrate';
import {UserCookingPreset} from '@/types/userData/cooking';


export type UserCalculationFullPackBehavior = 'berryOnly' | 'always' | 'disable';

export type UserCalculationBehavior = {
  alwaysFullPack: UserCalculationFullPackBehavior,
  goodCampTicket: boolean,
  includeMainSkill: boolean,
};

export type UserSettings = Migratable & {
  bonus: UserBonus,
  stamina: StaminaCalcConfig,
  behavior: UserCalculationBehavior,
  snorlaxFavorite: SnorlaxFavorite,
};

export type UserSettingsBundle = {
  settings: UserSettings,
  cooking: UserCookingPreset,
};

export type CalculatedUserSettings = Pick<UserSettings, 'behavior'> & {
  origin: UserSettings,
  bonus: EffectiveBonus,
};

export type CookingUserSettingsRequiredData = {
  mealMap: MealMap,
  cookingRecoveryData: StaminaCookingRecoveryData[],
};

export type CookingUserSettings = {
  recipeLevel: RecipeLevel,
  targetMeals: Meal[],
  overrideRecipeLevel?: number,
};

export type TranslatedUserSettings = {
  calculatedSettings: CalculatedUserSettings,
  cookingSettings: CookingUserSettings,
};
