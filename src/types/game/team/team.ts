import {ProductionPeriod} from '@/types/game/producing/display';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {Migratable} from '@/types/migrate';
import {Nullable} from '@/utils/type';


export type TeamMemberMap<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>
> = {[key in TKey]: TMember};

// Changing the typing of this requires migrating and any references of this type
// This includes but not limited to:
// - `TeamData`
export type TeamMetadata = {
  uuid: string,
  name: string,
  snorlaxFavorite: SnorlaxFavorite,
  analysisPeriod: ProductionPeriod,
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
