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
import {
  getPokemonProductionSingle,
  GetPokemonProductionSingleOpts,
} from '@/utils/game/producing/main/entry/single';
import {GetPokemonProductionOpts} from '@/utils/game/producing/main/type';
import {
  getPokemonProducingParams,
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
    .map(({individual}) => individual.subSkillBonus)
    .filter(isNotNullish);

  const toTeamMakerPokemonLimits = ({
    pokeInBox,
    actualLevel,
    individual,
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

    const calcOpts: GetPokemonProductionOpts = {
      pokemon,
      ingredients: getEffectiveIngredientProductions(pokeInBox),
      individual,
      berryData: berryDataMap[pokemon.berry.id],
      skillData: mainSkillMap[pokemon.skill],
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: pokeInBox.pokemon,
        pokemonProducingParamsMap,
      }),
      ingredientMap,
      recipeLevelData,
    };
    const productionOpts: GetPokemonProductionSingleOpts = {
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
        pokemonRate: getPokemonProductionSingle({
          ...productionOpts,
          subSkillBonusOverride: subSkillBonuses,
        }).atStage.final,
        targetMeals,
      }),
      worst: getTeamMakerBasisValue({
        pokemonRate: getPokemonProductionSingle(productionOpts).atStage.original,
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
