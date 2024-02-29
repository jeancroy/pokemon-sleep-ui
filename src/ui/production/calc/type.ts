import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap} from '@/types/game/pokemon';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {ProductionComparisonPreset} from '@/types/productionComparison';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {CalculatedCookingConfig} from '@/types/userData/config/cooking/main';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type GetProductionComparisonStatsCommonOpts = ConfigRequiredData & {
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  snorlaxFavorite: SnorlaxFavorite,
  bundle: ConfigBundle,
  calculatedCookingConfig: CalculatedCookingConfig,
  overrideLevel?: number,
};

export type GetProductionComparisonTargetStatsOpts = Omit<
  GetProductionComparisonStatsCommonOpts,
  'snorlaxFavorite'
> & {
  pokedexMap: PokedexMap,
  currentPreset: ProductionComparisonPreset,
};
