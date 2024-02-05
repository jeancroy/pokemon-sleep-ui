import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProducingRate} from '@/types/game/producing/rate';
import {TranslatedUserSettings} from '@/types/userData/settings/transformed';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export type PokemonProductionCombinationRateCollectionItem = {
  key: string,
  ingredients: IngredientProduction[],
  rate: PokemonProducingRate,
};

export type PokemonProductionCombinationRateCollection = {
  [key in string]?: PokemonProductionCombinationRateCollectionItem
};

export type PokemonProductionCombinationCommonProps = PokemonDataProps & {
  input: PokemonIndividualParams,
  translatedSettings: TranslatedUserSettings,
};
