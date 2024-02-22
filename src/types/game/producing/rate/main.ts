import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {FullPackStats} from '@/types/game/producing/inventory';
import {ProducingRate, ProducingRateByCalculatedStates, ProducingRateOfDrop} from '@/types/game/producing/rate/base';
import {PokemonProducingRateIntermediateParams} from '@/types/game/producing/rate/params';
import {PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';
import {PokemonProducingRateStage} from '@/types/game/producing/rate/stage';
import {ProducingStateSplit} from '@/types/game/producing/split';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {Indexable} from '@/utils/type';


export type PokemonProducingBaseRates = {
  berry: ProducingRateOfDrop,
  ingredient: ProducingRateOfDrop[],
  skill: ProducingRateOfDrop,
};

export type PokemonProducingRateFirstPass = {
  params: PokemonProducingRateIntermediateParams,
  fullPackStats: FullPackStats,
  producingStateSplit: ProducingStateSplit,
  baseRates: PokemonProducingBaseRates,
  berry: ProducingRateByCalculatedStates,
  ingredient: {[ingredientId in IngredientId]: ProducingRateByCalculatedStates},
  skill: ProducingRateByCalculatedStates,
};

export type PokemonProducingRate = PokemonProducingRateFirstPass & {
  skillIndirect: PokemonIndirectSkillProduction,
};

export type PokemonProducingRateAtStage<TProduction extends PokemonProducingRateFirstPass> = {
  [stage in PokemonProducingRateStage]: TProduction
};

export type PokemonProducingRateWithPayload<
  TPayload,
  TProduction extends PokemonProducingRateFirstPass = PokemonProducingRate
> = {
  payload: TPayload,
  calculatedUserConfig: CalculatedUserConfig,
  atStage: PokemonProducingRateAtStage<TProduction>,
};

export type GroupedProducingRate<TId extends Indexable> = {[id in TId]?: ProducingRate};

export type GroupedProducingRateByType = {
  berry: GroupedProducingRate<BerryId>,
  ingredient: GroupedProducingRate<IngredientId>,
  skill: GroupedProducingRate<MainSkillId>,
};

export type PokemonProducingRateFinal<TPayload> = {
  rates: PokemonProducingRateWithPayload<TPayload>[],
  grouped: GroupedProducingRateByType,
};
