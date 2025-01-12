import {BerryId} from '@/types/game/berry';
import {ExtraTastyInfo} from '@/types/game/cooking/extraTasty';
import {IngredientId} from '@/types/game/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {FullPackStats} from '@/types/game/producing/inventory';
import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {Production, ProductionByCalculatedStates, ProductionOfDrop} from '@/types/game/producing/rate/base';
import {PokemonProductionIntermediateParams} from '@/types/game/producing/rate/params';
import {PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';
import {PokemonProductionStage} from '@/types/game/producing/rate/stage';
import {ProducingStateSplit} from '@/types/game/producing/split';
import {ProduceType} from '@/types/game/producing/type';
import {SleepSessionData} from '@/types/game/sleep';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {Indexable} from '@/utils/type';


export type PokemonProductionTotal = {[type in ProduceType]: number};

export type PokemonProductionBase = {
  berry: ProductionOfDrop,
  ingredient: ProductionOfDrop[],
  skill: ProductionOfDrop,
};

export type PokemonProductionInitial = {
  intermediate: PokemonProductionIntermediateParams,
  noSkillTriggerPercent: SleepSessionData<number | null>,
  fullPackStats: FullPackStats,
  producingStateSplit: ProducingStateSplit,
  baseRates: PokemonProductionBase,
  berry: ProductionByCalculatedStates,
  ingredient: {[ingredientId in IngredientId]: ProductionByCalculatedStates},
  skill: ProductionByCalculatedStates,
};

export type PokemonProduction = PokemonProductionInitial & {
  skillIndirect: PokemonIndirectSkillProduction,
};

// The difference between `original` and `final` of this includes but not limited to
// - Ingredient multiplier
//    - [original] 0
//    - [final] Calculated from target meals
// - Extra Tasty
//    - [original] Default (no Extra Tasty skill)
//    - [final] Calculated from the provided rates
// > Check the implementation of `getPokemonProductionPostMultiplier()`
export type PokemonProductionAtStage<TProduction extends PokemonProductionInitial> = {
  [stage in PokemonProductionStage]: TProduction
};

export type PokemonProductionMetadata = {
  ingredientMultiplier: IngredientMultiplier,
  extraTastyInfo: ExtraTastyInfo,
  calculatedUserConfig: CalculatedUserConfig,
};

export type PokemonProductionWithPayload<
  TPayload,
  TProduction extends PokemonProductionInitial = PokemonProduction
> = {
  payload: TPayload,
  atStage: PokemonProductionAtStage<TProduction>,
  metadata: PokemonProductionMetadata,
};

export type GroupedProduction<TId extends Indexable> = {[id in TId]?: Production};

export type GroupedProductionByType = {
  berry: GroupedProduction<BerryId>,
  ingredient: GroupedProduction<IngredientId>,
  skill: GroupedProduction<MainSkillId>,
};

export type PokemonProductionFinalCollection<TPayload> = {
  rates: PokemonProductionWithPayload<TPayload>[],
  grouped: GroupedProductionByType,
};
