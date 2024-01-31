import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {getDefaultRatingBasis} from '@/utils/game/rating/utils';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


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
  snorlaxFavorite,
  bundle,
  ratingBasis,
}: PokeInBoxCommonProps): RatingWorkerOpts => {
  const {
    level,
    ingredients,
    subSkill,
    nature,
  } = pokeInBox;

  // Explicit to avoid passing unwanted property to worker
  return {
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
    snorlaxFavorite,
    level,
    ingredients,
    subSkill,
    nature,
    bundle,
    basis: ratingBasis ?? getDefaultRatingBasis(pokemon.specialty),
    friendshipLevel: 0,
    useNestedWorker: false,
    ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
  };
};

export const getRateOfPokemon = ({
  pokeInBox,
  berryDataMap,
  mainSkillMap,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps) => {
  const {
    pokemon,
    pokemonProducingParamsMap,
    mealMap,
    cookingRecoveryData,
    bundle,
    snorlaxFavorite,
  } = props;
  const {level, ingredients} = pokeInBox;
  const {id, berry, skill} = pokemon;

  const singleParams = getProducingRateSingleParams({
    subSkillMap,
    ...pokeInBox,
  });

  return getPokemonProducingRateSingle({
    ...props,
    ...singleParams,
    ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
    ...toTranslatedSettings({
      ...bundle,
      mealMap,
      recoveryRate: toRecoveryRate(singleParams),
      cookingRecoveryData,
      snorlaxFavorite,
    }),
    level: pokeInBox.level,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[berry.id],
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    skillData: mainSkillMap[skill],
  }).atStage.final;
};
