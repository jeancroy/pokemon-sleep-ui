import {FilterInclusionMap} from '@/components/input/filter/type';
import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {TeamMemberKey} from '@/types/game/team/member';


export type TeamCollapsibleOfComp<TKey extends TeamMemberKey> = FilterInclusionMap<TKey>;

export type TeamCollapsibleOfSetup<TKey extends TeamMemberKey> = {
  [teamUuid in string]?: TeamCollapsibleOfComp<TKey>
};

export type TeamLayoutControlState<TKey extends TeamMemberKey> = {
  collapsible: TeamCollapsibleOfSetup<TKey>,
};

export type TeamLayoutControl<TKey extends TeamMemberKey> = {
  generateCollapsibleControl: (teamUuid: string, indexKey: TKey) => CollapsibleControl,
  setAllCollapsible: (show: boolean) => void,
};
