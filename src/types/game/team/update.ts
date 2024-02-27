import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {Nullable} from '@/utils/type';


export type TeamSetupSetMemberOpts<TKey extends TeamMemberKey, TMember extends Nullable<TeamMemberData>> = {
  key: TKey,
  member: TMember | null,
};
