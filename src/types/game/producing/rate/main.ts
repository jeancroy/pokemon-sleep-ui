import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {FullPackStats} from '@/types/game/producing/inventory';
import {Production, ProductionByCalculatedStates, ProductionOfDrop} from '@/types/game/producing/rate/base';
import {PokemonProductionIntermediateParams} from '@/types/game/producing/rate/params';
import {PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';
import {PokemonProductionStage} from '@/types/game/producing/rate/stage';
import {ProducingStateSplit} from '@/types/game/producing/split';
import {ProduceType} from '@/types/game/producing/type';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {Indexable} from '@/utils/type';


export type PokemonProductionTotal = {[type in ProduceType]: number};

export type PokemonProductionBase = {
  berry: ProductionOfDrop,
  ingredient: ProductionOfDrop[],
  skill: ProductionOfDrop,
};

export type PokemonProductionFirstPass = {
  params: PokemonProductionIntermediateParams,
  fullPackStats: FullPackStats,
  producingStateSplit: ProducingStateSplit,
  baseRates: PokemonProductionBase,
  berry: ProductionByCalculatedStates,
  ingredient: {[ingredientId in IngredientId]: ProductionByCalculatedStates},
  skill: ProductionByCalculatedStates,
};

export type PokemonProduction = PokemonProductionFirstPass & {
  skillIndirect: PokemonIndirectSkillProduction,
};

export type PokemonProductionAtStage<TProduction extends PokemonProductionFirstPass> = {
  [stage in PokemonProductionStage]: TProduction
};

export type PokemonProductionWithPayload<
  TPayload,
  TProduction extends PokemonProductionFirstPass = PokemonProduction
> = {
  payload: TPayload,
  calculatedUserConfig: CalculatedUserConfig,
  atStage: PokemonProductionAtStage<TProduction>,
};

export type GroupedProduction<TId extends Indexable> = {[id in TId]?: Production};

export type GroupedProductionByType = {
  berry: GroupedProduction<BerryId>,
  ingredient: GroupedProduction<IngredientId>,
  skill: GroupedProduction<MainSkillId>,
};

export type PokemonProductionFinal<TPayload> = {
  rates: PokemonProductionWithPayload<TPayload>[],
  grouped: GroupedProductionByType,
};