import {EffectiveBonus, UserBonus} from '@/types/game/bonus';
import {RecipeLevel} from '@/types/game/cooking';
import {Meal, MealMap} from '@/types/game/meal/main';
import {SleepDurationInfo, SleepSessionInfo} from '@/types/game/sleep';
import {SleepMapId} from '@/types/game/sleepStyle';
import {StaminaCalcConfig} from '@/types/game/stamina/config';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
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
  staminaSkillTrigger: StaminaSkillTriggerData,
  currentMap: SleepMapId,
  behavior: UserCalculationBehavior,
};

export type UserSettingsBundle = {
  settings: UserSettings,
  cooking: UserCookingPreset,
};

export type CalculatedUserSettings = Pick<UserSettings, 'behavior'> & {
  origin: UserSettings,
  bonus: EffectiveBonus,
  sleepSessionInfo: SleepSessionInfo,
  sleepDurationInfo: SleepDurationInfo,
};

export type CookingUserSettingsRequiredData = {
  mealMap: MealMap,
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
