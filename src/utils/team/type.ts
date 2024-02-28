import {PokedexMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokeInBox} from '@/types/userData/pokebox';


export type ToTeamCompFromPokeboxCommonOpts = {
  members: PokeInBox[],
  snorlaxFavorite: SnorlaxFavorite,
  name: string,
};

export type ToTeamMemberNullableData = {
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
};
