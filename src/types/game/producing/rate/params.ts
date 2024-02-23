import {PokemonInfo} from '@/types/game/pokemon';
import {MainSkillEffect} from '@/types/game/pokemon/mainSkill';
import {NatureId} from '@/types/game/pokemon/nature';
import {SeedUsage} from '@/types/game/pokemon/seed';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionPeriod} from '@/types/game/producing/display';
import {CarryLimitInfo} from '@/types/game/producing/inventory';
import {ProduceSplit} from '@/types/game/producing/split';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type ProductionSingleParams = {
  subSkillBonus: GroupedSubSkillBonus | null,
  natureId: NatureId | null,
};

export type ProductionImplicitParams = {
  evolutionCount: number,
  seeds: SeedUsage,
};

export type ProductionIndividualParams = ProductionSingleParams & ProductionImplicitParams & {
  level: number,
};

export type ProductionCommonParams = {
  level: number,
  pokemon: PokemonInfo,
  baseFrequency: number,
  calculatedUserConfig: CalculatedUserConfig,
};

export type PokemonProductionIntermediateParams = {
  isFullPack: boolean,
  period: ProductionPeriod,
  frequency: number,
  carryLimitInfo: CarryLimitInfo,
  produceSplit: ProduceSplit,
  skillRatePercent: number,
  activeSkillEffect: MainSkillEffect | null,
};
