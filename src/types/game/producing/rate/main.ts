import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {ProductionPeriod} from '@/types/game/producing/display';
import {CarryLimitInfo, FullPackStats} from '@/types/game/producing/inventory';
import {ProducingRate, ProducingRateByCalculatedStates} from '@/types/game/producing/rate/base';
import {PokemonProducingRateStage} from '@/types/game/producing/rate/stage';
import {ProduceSplit, ProducingStateSplit} from '@/types/game/producing/split';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';
import {Indexable} from '@/utils/type';


export type PokemonProducingRate = {
  period: ProductionPeriod,
  fullPackStats: FullPackStats,
  producingStateSplit: ProducingStateSplit,
  produceSplit: ProduceSplit,
  carryLimitInfo: CarryLimitInfo,
  skillRatePercent: number,
  berry: ProducingRateByCalculatedStates,
  ingredient: {[ingredientId in IngredientId]: ProducingRateByCalculatedStates},
  skill: ProducingRateByCalculatedStates,
};

export type PokemonProducingRateAtStage = {[stage in PokemonProducingRateStage]: PokemonProducingRate};

export type PokemonProducingRateWithPayload<TPayload> = {
  payload: TPayload,
  calculatedUserConfig: CalculatedUserConfig,
  atStage: PokemonProducingRateAtStage,
};

export type PokemonProducingRateByType = {
  berry: GroupedProducingRate<BerryId>,
  ingredient: GroupedProducingRate<IngredientId>,
  skill: GroupedProducingRate<MainSkillId>,
};

export type PokemonProducingRateFinal<TPayload> = {
  rates: PokemonProducingRateWithPayload<TPayload>[],
  grouped: PokemonProducingRateByType,
};

export type GroupedProducingRate<TId extends Indexable> = {[id in TId]?: ProducingRate};
