import {Production} from '@/types/game/producing/rate/base';
import {
  PokemonProduction,
  PokemonProductionMetadata,
} from '@/types/game/producing/rate/main';
import {Nullable} from '@/utils/type';


export type TeamMemberProduction = {
  level: Nullable<number>,
  total: Production,
  rate: PokemonProduction,
  metadata: PokemonProductionMetadata,
};

export const teamMemberProductionSortingBasis = [
  'totalStrength',
  'berryStrength',
  'ingredientStrength',
  'mainSkillTriggerCount',
  'mainSkillTriggerRate',
  'frequency',
  'timeToFullPackPrimary',
  'timeToFullPackSecondary',
] as const;

export type TeamMemberProductionSortingBasis = typeof teamMemberProductionSortingBasis[number];

export type TeamMemberProductionSorter = (a: TeamMemberProduction, b: TeamMemberProduction) => number;

export type TeamMemberProductionSorterGetter = (production: TeamMemberProduction) => number;
