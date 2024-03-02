import {PokemonInfo, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';


export type PokemonProducingStatsCommonProps = {
  pokemonIngredientProduction: PokemonIngredientProduction[],
  calculatedConfigBundle: CalculatedConfigBundle,
};

export type PokemonIngredientStatsCommonProps = PokemonProducingStatsCommonProps;

export type PokemonBerryStatsCommonProps = PokemonProducingStatsCommonProps & {
  pokemonOfBerry: PokemonInfo[],
};

export type PokemonItemStatsCalcResult = {
  pokemon: PokemonInfo,
  pokemonRate: PokemonProduction,
  uniqueKey: string,
  ingredients: IngredientProduction[],
  dailyTotalEnergy: number,
};

export type PokemonItemStatsCalcResultToDisplay<TResult extends PokemonItemStatsCalcResult> = TResult & {
  itemRate: ProductionByCalculatedStates,
};
