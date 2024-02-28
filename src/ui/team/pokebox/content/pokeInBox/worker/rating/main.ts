import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/params';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';


export const toRatingWorkerOpts = ({
  pokeInBox,
  pokemon,
  pokedexMap,
  pokemonProducingParamsMap,
  berryDataMap,
  ingredientMap,
  ingredientChainMap,
  mainSkillMap,
  subSkillMap,
  mealMap,
  cookingRecoveryData,
  recipeLevelData,
  eventStrengthMultiplierData,
  snorlaxFavorite,
  bundle,
  ratingBasis,
}: PokeInBoxCommonProps): RatingWorkerOpts => {
  const {
    level,
    ingredients,
    subSkill,
    nature,
    seeds,
    evolutionCount,
  } = pokeInBox;

  // Explicit to avoid passing unwanted property to worker
  return {
    level,
    pokemon,
    pokemonList: toPokemonList(pokedexMap),
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: pokemon.id,
      pokemonProducingParamsMap,
    }),
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    mealMap,
    cookingRecoveryData,
    recipeLevelData,
    eventStrengthMultiplierData,
    snorlaxFavorite,
    ingredients,
    subSkill,
    nature,
    seeds,
    evolutionCount,
    bundle,
    basis: ratingBasis ?? getDefaultRatingBasis(pokemon.specialty),
    friendshipLevel: 0,
    useNestedWorker: false,
  };
};
