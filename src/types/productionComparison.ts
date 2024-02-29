import {FilterInclusionMap} from '@/components/input/filter/type';
import {PokemonIndirectSkillEffects} from '@/types/game/producing/rate/skill';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamMemberProduction, TeamMemberProductionSortingBasis} from '@/types/game/team/production';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamMemberStatsType} from '@/types/game/team/statsType';
import {TeamData} from '@/types/game/team/team';
import {CookingTarget} from '@/types/userData/config/cooking/target';


export type ProductionComparisonTargetUuid = string;

export type ProductionComparisonTarget = TeamMemberData & {
  uuid: ProductionComparisonTargetUuid,
};

export type ProductionComparisonConfig = TeamSetupConfig;

export type ProductionComparisonTeamSkill = {
  indirectSkills: PokemonIndirectSkillEffects,
};

export type ProductionComparisonTeamStacks = {
  helpingBonus: number,
};

export type ProductionComparisonPreset = TeamData<ProductionComparisonTargetUuid, ProductionComparisonTarget> & {
  pinnedStats: FilterInclusionMap<TeamMemberStatsType>,
  cookingTarget: CookingTarget,
  sort: TeamMemberProductionSortingBasis | null,
  team: {
    skill: ProductionComparisonTeamSkill,
    stacks: ProductionComparisonTeamStacks,
  },
};

export type ProductionComparisonSetup = TeamSetup<
  ProductionComparisonTargetUuid,
  ProductionComparisonTarget,
  ProductionComparisonConfig,
  ProductionComparisonPreset
>;

export type ProductionComparisonPresetProduction = {
  [uuid in ProductionComparisonTargetUuid]?: TeamMemberProduction
};
