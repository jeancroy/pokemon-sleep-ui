import {PokemonProducingRate} from '@/types/game/producing/rate/main';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


export const getRateOfPokemon = ({
  pokeInBox,
  berryDataMap,
  mainSkillMap,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps): PokemonProducingRate => {
  const {
    pokemon,
    pokemonProducingParamsMap,
    mealMap,
    cookingRecoveryData,
    eventStrengthMultiplierData,
    bundle,
    snorlaxFavorite,
  } = props;
  const {level, ingredients} = pokeInBox;
  const {id, berry, skill} = pokemon;

  const singleParams = getProducingRateSingleParams({
    subSkillMap,
    ...pokeInBox,
  });
  const {natureId, subSkillBonus} = singleParams;

  return getPokemonProducingRateSingle({
    ...props,
    ...singleParams,
    ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
    ...toCalculatedConfigBundle({
      ...bundle,
      mealMap,
      recoveryRate: toRecoveryRate({
        natureId,
        subSkillBonuses: [subSkillBonus],
      }),
      cookingRecoveryData,
      eventStrengthMultiplierData,
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
