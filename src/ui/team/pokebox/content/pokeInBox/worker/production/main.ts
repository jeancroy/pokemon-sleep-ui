import {PokemonProduction} from '@/types/game/producing/rate/main';
import {PokeInBoxCommonProps} from '@/ui/team/pokebox/content/type';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {
  getPokemonProducingParams, getProductionIndividualParams,
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

  const individual = getProductionIndividualParams({
    input: pokeInBox,
    pokemon,
    subSkillMap,
  });
  const {natureId, subSkillBonus} = individual;

  return getPokemonProductionSingle({
    ...props,
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
    individual,
    pokemonProducingParams: getPokemonProducingParams({
      pokemonId: id,
      pokemonProducingParamsMap,
    }),
    berryData: berryDataMap[berry.id],
    ingredients: getEffectiveIngredientProductions({level, ingredients}),
    skillData: mainSkillMap[skill],
  }).atStage.final;
};
