import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {teamMakerProductionPeriod} from '@/ui/team/maker/calc/const';
import {getTeamMakerBasisValue} from '@/ui/team/maker/calc/getBasisValue';
import {
  TeamMakerGetTeamMakerPokemonLimitsOpts,
  TeamMakerPokeInBoxDataForLimits,
} from '@/ui/team/maker/calc/getPokemonLimits/type';
import {getTeamMakerPokeInBoxDataForLimits} from '@/ui/team/maker/calc/getPokemonLimits/utils';
import {TeamMakerPokemonLimits} from '@/ui/team/maker/type/common';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProducingRateSingle, GetPokemonProducingRateSingleOpts} from '@/utils/game/producing/main/entry/single';
import {GetPokemonProducingRateOpts} from '@/utils/game/producing/main/type';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
} from '@/utils/game/producing/params';
import {isNotNullish} from '@/utils/type';


export const getTeamMakerPokemonLimits = (opts: TeamMakerGetTeamMakerPokemonLimitsOpts): TeamMakerPokemonLimits[] => {
  const {
    pokedexMap,
    pokemonProducingParamsMap,
    berryDataMap,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    recipeLevelData,
    maxRecipeLevel,
    input,
    bundle,
    calculatedCookingConfig,
  } = opts;
  const {snorlaxFavorite} = input;
  const {targetMeals} = calculatedCookingConfig;

  const pokeInBoxDataList: TeamMakerPokeInBoxDataForLimits[] = getTeamMakerPokeInBoxDataForLimits(opts);
  const subSkillBonuses = pokeInBoxDataList
    .map(({singleParams}) => singleParams.subSkillBonus)
    .filter(isNotNullish);

  const toTeamMakerPokemonLimits = ({
    pokeInBox,
    actualLevel,
    singleParams,
  }: TeamMakerPokeInBoxDataForLimits): TeamMakerPokemonLimits | null => {
    const pokemon = pokedexMap[pokeInBox.pokemon];

    if (!pokemon || !isPokemonIncludedFromFilter({
      filter: input.pokemon,
      pokemon,
      pokemonLevel: pokeInBox.level,
      ingredientMap,
      ingredientChainMap,
    })) {
      return null;
    }

    const calcOpts: GetPokemonProducingRateOpts = {
      berryData: berryDataMap[pokemon.berry.id],
      skillData: mainSkillMap[pokemon.skill],
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokeInBox.pokemon,
        pokemonProducingParamsMap,
      }),
      ingredientMap,
      recipeLevelData,
      ...pokeInBox,
      ...singleParams,
      ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
      // Override `level` in `pokeInBox` because preview level might be active
      level: actualLevel,
      // Override `pokemon` in `pokeInBox`
      pokemon,
      // Override `ingredients` in `pokeInBox`
      ingredients: getEffectiveIngredientProductions(pokeInBox),
    };
    const producingRateOpts: GetPokemonProducingRateSingleOpts = {
      ...opts,
      bundle,
      snorlaxFavorite,
      period: teamMakerProductionPeriod,
      calculatedCookingConfig: {
        ...calculatedCookingConfig,
        // Reason unknown, but recipe level impacts candidates list, therefore impacting the result.
        // Without this, the result might be incorrect. See #670.
        overrideRecipeLevel: maxRecipeLevel,
      },
      ...calcOpts,
    };

    return {
      best: getTeamMakerBasisValue({
        pokemonRate: getPokemonProducingRateSingle({
          ...producingRateOpts,
          subSkillBonusOverride: subSkillBonuses,
        }).atStage.final,
        targetMeals,
      }),
      worst: getTeamMakerBasisValue({
        pokemonRate: getPokemonProducingRateSingle(producingRateOpts).atStage.original,
        targetMeals,
      }),
      payload: {
        refData: {
          pokeInBox,
          levelUsed: actualLevel,
        },
        calcOpts,
      },
    };
  };

  return pokeInBoxDataList
    .map(toTeamMakerPokemonLimits)
    .filter(isNotNullish);
};
