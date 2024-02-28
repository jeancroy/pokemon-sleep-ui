import {PokemonIndirectSkillEffects} from '@/types/game/producing/rate/skill';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData} from '@/types/game/team/member';
import {TeamMemberProduction} from '@/types/game/team/production';
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
  recovery: StaminaSkillTriggerData[],
  indirectSkills: PokemonIndirectSkillEffects,
};

export type ProductionComparisonTeamStacks = {
  helpingBonus: number,
};

export type ProductionComparisonPreset = TeamData<ProductionComparisonTargetUuid, ProductionComparisonTarget> & {
  pinnedStats: TeamMemberStatsType[],
  cookingTarget: CookingTarget,
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
