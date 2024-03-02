import {MealCoverage} from '@/types/game/cooking/meal';
import {IngredientCounter} from '@/types/game/ingredient';
import {PokeInBox} from '@/types/userData/pokebox';
import {GetPokemonProductionOpts} from '@/utils/game/producing/main/type';


export const teamMakerMemberCount = [
  1,
  2,
  3,
  4,
  5,
] as const;

export type TeamMakerMemberCount = typeof teamMakerMemberCount[number];

export type TeamMakerBasisValue = {
  strength: number,
  mealCoverage: MealCoverage,
  ingredientProduction: IngredientCounter,
};

export type TeamMakerReferenceUnit = {
  pokeInBox: PokeInBox,
  levelUsed: number,
};

export type TeamMakerCalcPayload = {
  refData: TeamMakerReferenceUnit,
  calcOpts: GetPokemonProductionOpts,
};

export type TeamMakerPokemonLimits = {
  best: TeamMakerBasisValue,
  worst: TeamMakerBasisValue,
  payload: TeamMakerCalcPayload,
};

export type TeamMakerCandidateData = {
  payload: TeamMakerCalcPayload,
};

export type TeamMakerIngredientStats = {
  supply: IngredientCounter,
  surplus: IngredientCounter,
  shortage: IngredientCounter,
};
