import {PokedexMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokeInBox} from '@/types/userData/pokebox';


export type ToTeamAnalysisCompFromPokeboxCommonOpts = {
  members: PokeInBox[],
  snorlaxFavorite: SnorlaxFavorite,
  name: string,
};

export type ToTeamAnalysisMemberNullableData = {
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
};
