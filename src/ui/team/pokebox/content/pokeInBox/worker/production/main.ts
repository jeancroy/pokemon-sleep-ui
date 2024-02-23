import {PokemonProduction} from '@/types/game/producing/rate/main';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {
  getPokemonProducingParams,
  getProductionImplicitParamsFromPokeInbox,
  getProductionSingleParams,
} from '@/utils/game/producing/params';
import {toRecoveryRate} from '@/utils/game/stamina/recovery';
import {toCalculatedConfigBundle} from '@/utils/user/config/bundle';


export const getRateOfPokemon = ({
  pokeInBox,
  berryDataMap,
  mainSkillMap,
  subSkillMap,
  ...props
}: PokeInBoxCommonProps): PokemonProduction => {
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

  const singleParams = getProductionSingleParams({
    subSkillMap,
    ...pokeInBox,
  });
  const {natureId, subSkillBonus} = singleParams;

  return getPokemonProductionSingle({
    ...props,
    ...singleParams,
    ...getProductionImplicitParamsFromPokeInbox({pokeInBox}),
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
