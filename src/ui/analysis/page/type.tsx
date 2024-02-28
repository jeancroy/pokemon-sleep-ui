import {PokemonInputFilterExtended, UsePokemonFilterCommonData} from '@/components/shared/pokemon/filter/type';
import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {MealMap} from '@/types/game/meal/main';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SleepStyleNormalMap} from '@/types/game/sleepStyle';
import {ConfigBundle} from '@/types/userData/config/bundle';
import {ConfigRequiredData} from '@/types/userData/config/data';


export type AnalysisComparisonFilter = PokemonInputFilterExtended & {
  ingredients: IngredientProductionAtLevels,
};

export type AnalysisPageCommonProps = UsePokemonFilterCommonData & ConfigRequiredData & {
  pokemonList: PokemonInfo[],
  pokemon: PokemonInfo,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  ingredientMap: IngredientMap,
  berryDataMap: BerryDataMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  sleepStyleMap: SleepStyleNormalMap,
  mealMap: MealMap,
  fieldMetaMap: FieldMetaMap,
  recipeLevelData: RecipeLevelData[],
  pokemonMaxLevel: number,
  preloaded: ConfigBundle,
};
