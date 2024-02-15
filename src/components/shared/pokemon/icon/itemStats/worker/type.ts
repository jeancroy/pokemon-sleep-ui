import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonIngredientProduction} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';
import {TranslatedUserSettings} from '@/types/userData/settings/transformed';


export type PokemonItemStatsWorkerOpts = UserSettingsRequiredData & {
  input: PokemonIndividualParams,
  pokedex: PokedexMap,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokemonIngredientProduction: PokemonIngredientProduction[],
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  subSkillMap: SubSkillMap,
  recipeLevelData: RecipeLevelData[],
  bundle: UserSettingsBundle,
  translatedSettings: TranslatedUserSettings,
};
