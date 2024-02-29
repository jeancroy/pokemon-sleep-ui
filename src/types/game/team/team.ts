import {FilterInclusionMap} from '@/components/input/filter/type';
import {ProductionPeriod} from '@/types/game/producing/display';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamMemberStatsType} from '@/types/game/team/statsType';
import {Migratable} from '@/types/migrate';
import {ConfigOverride} from '@/types/userData/config/bundle';
import {Nullable} from '@/utils/type';


export type TeamMemberMap<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>
> = {[key in TKey]: TMember};

export const teamConfigSource = [
  'default',
  'override',
] as const;

export type TeamConfigSource = typeof teamConfigSource[number];

// Changing the typing of this requires migrating and any references of this type
// This includes but not limited to:
// - `TeamData`
export type TeamMetadata = {
  uuid: string,
  name: string,
  pinnedStats: FilterInclusionMap<TeamMemberStatsType>,
  analysisPeriod: ProductionPeriod,
  configOverride: ConfigOverride,
  configSource: TeamConfigSource,
};

// Changing the typing of this requires migrating and any references of this type
// This includes but not limited to:
// - `TeamAnalysisComp`
// - `ProductionComparisonPreset`
export type TeamData<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>
> = Migratable & TeamMetadata & {
  members: TeamMemberMap<TKey, TMember>,
};
