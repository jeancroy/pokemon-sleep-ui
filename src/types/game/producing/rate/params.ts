import {PokemonInfo} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {SeedUsage} from '@/types/game/pokemon/seed';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type ProducingRateSingleParams = {
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProducingRateImplicitParams = {
  evolutionCount: number,
  seeds: SeedUsage,
};

export type ProducingRateIndividualParams = ProducingRateSingleParams & ProducingRateImplicitParams & {
  level: number,
};

export type ProducingRateCommonParams = {
  level: number,
  pokemon: PokemonInfo,
  baseFrequency: number,
  calculatedUserConfig: CalculatedUserConfig,
};
