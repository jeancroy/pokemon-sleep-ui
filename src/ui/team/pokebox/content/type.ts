import {BerryDataMap} from '@/types/game/berry';
import {IngredientMap} from '@/types/game/ingredient';
import {RecipeLevelData} from '@/types/game/meal/recipeLevel';
import {PokedexMap, PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap} from '@/types/game/pokemon/ingredient';
import {MainSkillMap} from '@/types/game/pokemon/mainSkill';
import {PokemonProducingParamsMap} from '@/types/game/pokemon/producing';
import {SubSkillMap} from '@/types/game/pokemon/subSkill';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {PokeInBox} from '@/types/userData/pokebox/main';
import {UserSettingsBundle, UserSettingsRequiredData} from '@/types/userData/settings/main';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeInBoxChangeableProps = {
  bundle: UserSettingsBundle,
  snorlaxFavorite: SnorlaxFavorite,
};

export type PokeInBoxCommonProps = PokeInBoxChangeableProps & UserSettingsRequiredData & {
  pokeInBox: PokeInBox,
  pokemon: PokemonInfo,
  pokemonProducingParamsMap: PokemonProducingParamsMap,
  pokedexMap: PokedexMap,
  subSkillMap: SubSkillMap,
  berryDataMap: BerryDataMap,
  ingredientMap: IngredientMap,
  ingredientChainMap: IngredientChainMap,
  mainSkillMap: MainSkillMap,
  recipeLevelData: RecipeLevelData[],
  ratingBasis: PokeboxViewerDisplay['ratingBasis'],
};
