import {FilterInputControls} from '@/components/input/filter/type';
import {PokemonId, PokemonInfo} from '@/types/game/pokemon';
import {PokedexFilterCommon} from '@/ui/pokedex/common/type';


export const pokedexTierListBasis = [
  'totalEnergy',
  'ingredientEnergy',
  'mainSkillTriggerValue',
] as const;

export type PokedexTierListBasis = typeof pokedexTierListBasis[number];

export type PokedexTierListInputFilter = PokedexFilterCommon<PokedexTierListBasis, PokedexTierListBasis>;

export type PokedexTierListInput = {
  filter: PokedexTierListInputFilter,
  showDetails: boolean,
};

export type PokedexTierListInputControls = FilterInputControls<PokedexTierListInput, PokemonInfo, PokemonId>;
