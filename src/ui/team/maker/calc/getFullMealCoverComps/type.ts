import {IngredientCounter, IngredientId} from '@/types/game/ingredient';


export type TeamMakerFullMealCoverProductionMap<TPayload> = {
  [id in IngredientId]?: TeamMakerFullMealCoverCompMember<TPayload>[]
};

export type TeamMakerFullMealCoverCompMember<TPayload> = {
  payload: TPayload,
  ingredientProduction: IngredientCounter,
};

export type TeamMakerFullMealCoverRemainder<TPayload> = {
  data: TeamMakerFullMealCoverCompMember<TPayload>,
  totalRemaining: number,
  remainder: IngredientCounter,
};
