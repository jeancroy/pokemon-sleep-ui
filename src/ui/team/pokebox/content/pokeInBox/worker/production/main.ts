import {PokemonProducingRate} from '@/types/game/producing/rate';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getEffectiveIngredientProductions} from '@/utils/game/producing/ingredient/multi';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toTranslatedSettings} from '@/utils/user/settings/translated';


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