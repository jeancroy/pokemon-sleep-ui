import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {PokemonDataCommonProps} from '@/ui/pokedex/page/type';


export type PokemonProductionCombinationRateCollectionItem = {
  key: string,
  ingredients: IngredientProduction[],
  rate: PokemonProduction,
};

export type PokemonProductionCombinationRateCollection = {
  [key in string]?: PokemonProductionCombinationRateCollectionItem
};

export type PokemonProductionCombinationCommonProps = PokemonDataCommonProps & {
  input: PokemonIndividualParams,
};
