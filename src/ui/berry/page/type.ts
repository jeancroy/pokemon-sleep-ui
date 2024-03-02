import {BerryData} from '@/types/game/berry';
import {BerryFavoriteInfo} from '@/types/game/mapMeta';
import {PokemonInfo, PokemonIngredientProduction} from '@/types/game/pokemon';


export type BerryPageDataProps = {
  pokemonIngredientProduction: PokemonIngredientProduction[],
  pokemonOfBerry: PokemonInfo[],
  berryData: BerryData,
  favoriteInfo: BerryFavoriteInfo,
};
