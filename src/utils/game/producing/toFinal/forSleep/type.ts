import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {PokemonProductionSkillTriggerParams} from '@/types/game/producing/rate/params';
import {ProduceType} from '@/types/game/producing/type';
import {Nullable} from '@/utils/type';


export type ToFinalProductionForSleepCommonOpts = {
  base: ProductionOfDrop,
  produceType: ProduceType,
  fullPackStatsOfSleep: FullPackStatsOfSleep | null,
  sleepDuration: Nullable<number>,
  skillTrigger: PokemonProductionSkillTriggerParams,
};
