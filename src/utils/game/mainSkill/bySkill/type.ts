import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {ValueWithId} from '@/types/number';


export type ProductionForMainSkillCalcUnit = {
  qtyPerHelp: number,
  strengthPerHelp: number,
};

export type ProductionForMainSkillCalc = {
  berry: ValueWithId<BerryId, ProductionForMainSkillCalcUnit>,
  ingredient: ValueWithId<IngredientId, ProductionForMainSkillCalcUnit>[],
};
