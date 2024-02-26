import {FilterInclusionMap} from '@/components/input/filter/type';
import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {Indexable} from '@/utils/type';


export type TeamCollapsibleIndexKey = Indexable;

export type TeamCollapsibleOfComp<TKey extends TeamCollapsibleIndexKey> = FilterInclusionMap<TKey>;

export type TeamCollapsibleOfSetup<TKey extends TeamCollapsibleIndexKey> = {
  [teamUuid in string]?: TeamCollapsibleOfComp<TKey>
};

export type TeamLayoutControlState<TKey extends TeamCollapsibleIndexKey> = {
  collapsible: TeamCollapsibleOfSetup<TKey>,
};

export type TeamLayoutControl<TKey extends TeamCollapsibleIndexKey> = {
  generateCollapsibleControl: (teamUuid: string, indexKey: TKey) => CollapsibleControl,
  setAllCollapsible: (show: boolean) => void,
};
