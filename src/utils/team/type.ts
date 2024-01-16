import {PokedexMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {PokeInBox} from '@/types/userData/pokebox/main';


export type ToTeamAnalysisCompFromPokeboxCommonOpts = {
  members: PokeInBox[],
  name: string,
};

export type ToTeamAnalysisMemberNullableData = {
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
};
