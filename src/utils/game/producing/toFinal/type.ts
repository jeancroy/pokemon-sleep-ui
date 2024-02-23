import {FullPackStats} from '@/types/game/producing/inventory';
import {PokemonProductionSkillTriggerParams} from '@/types/game/producing/rate/params';
import {SleepSessionInfo} from '@/types/game/sleep';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type ToFinalProductionOfDropCommonOpts = {
  fullPackStats: FullPackStats,
  calculatedUserConfig: CalculatedUserConfig,
  sleepSessionInfo: SleepSessionInfo,
  skillTrigger: PokemonProductionSkillTriggerParams,
};
