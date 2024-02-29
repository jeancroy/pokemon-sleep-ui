import {PokedexMap} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {ConfigOverride} from '@/types/userData/config/bundle';
import {PokeInBox} from '@/types/userData/pokebox';


export type ToTeamCompFromPokeboxCommonOpts = {
  name: string,
  members: PokeInBox[],
  configOverride: ConfigOverride,
};

export type ToTeamMemberNullableData = {
  pokedexMap: PokedexMap,
  ingredientChainMap: IngredientChainMap,
};
