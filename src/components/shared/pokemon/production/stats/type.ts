import {PokemonSpecialtyId} from '@/types/game/pokemon';
import {IngredientMultiplier} from '@/types/game/producing/multiplier';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {CalculatedUserConfig} from '@/types/userData/config/user/main';


export type PokemonDetailedProductionProps = {
  rate: PokemonProduction,
  ingredientMultiplier: IngredientMultiplier,
  calculatedUserConfig: CalculatedUserConfig,
  specialty: PokemonSpecialtyId,
};
