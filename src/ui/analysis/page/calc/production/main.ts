import {toAnalysisBerryProduction} from '@/ui/analysis/page/calc/production/berry';
import {toAnalysisIngredientProducingStats} from '@/ui/analysis/page/calc/production/ingredient';
import {toAnalysisSkillTriggerCountProducingStats} from '@/ui/analysis/page/calc/production/skill';
import {toAnalysisTotalProducingStats} from '@/ui/analysis/page/calc/production/total';
import {PokemonAnalysisRateInfo} from '@/ui/analysis/page/calc/production/type';
import {AnalysisStats, GetAnalysisStatsWorkerOpts} from '@/ui/analysis/page/calc/type';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getPokemonProducingParams, getProductionIndividualParams} from '@/utils/game/producing/params';


export const getAnalysisStatsOfProduction = (opts: GetAnalysisStatsWorkerOpts): AnalysisStats['production'] => {
  const {
    pokemonList,
    pokemon,
    pokemonProducingParamsMap,
    level,
    subSkill,
    nature,
    ingredients,
    berryDataMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    calculatedConfigBundle,
  } = opts;
  const {bundle, calculatedCookingConfig} = calculatedConfigBundle;

  const currentPokemonProducingParams = getPokemonProducingParams({
    pokemonId: pokemon.id,
    pokemonProducingParamsMap,
  });
  const currentRate = getPokemonProductionSingle({
    ...opts,
    bundle,
    calculatedCookingConfig,
    pokemonProducingParams: currentPokemonProducingParams,
    berryData: berryDataMap[pokemon.berry.id],
    skillData: mainSkillMap[pokemon.skill],
    individual: getProductionIndividualParams({
      input: {
        level,
        subSkill,
        nature,
      },
      pokemon,
      subSkillMap,
    }),
  }).atStage.final;

  const rateOfAllPokemon = pokemonList.flatMap((otherPokemon) => [...generatePossibleIngredientProductions({
    level,
    chain: ingredientChainMap[otherPokemon.ingredientChain],
  })].map((otherIngredients): PokemonAnalysisRateInfo => ({
    pokemon: otherPokemon,
    productions: otherIngredients,
    rate: getPokemonProductionSingle({
      // `opts` has to be the first because `pokemon`, `berryData`, `ingredients` have to be overridden
      ...opts,
      bundle,
      calculatedCookingConfig,
      pokemon: otherPokemon,
      pokemonProducingParams: getPokemonProducingParams({
        pokemonId: otherPokemon.id,
        pokemonProducingParamsMap,
      }),
      berryData: berryDataMap[otherPokemon.berry.id],
      skillData: mainSkillMap[otherPokemon.skill],
      ingredients: otherIngredients,
      individual: getProductionIndividualParams({
        input: {
          level,
          subSkill,
          nature,
        },
        pokemon: otherPokemon,
        subSkillMap,
      }),
    }).atStage.final,
  })));

  return {
    berry: toAnalysisBerryProduction({
      pokemon,
      currentRate: currentRate.berry,
      itemId: pokemon.berry.id,
      rateOfAllPokemon,
    }),
    ingredient: toAnalysisIngredientProducingStats({
      pokemon,
      ingredients,
      current: currentRate,
      rateOfAllPokemon,
    }),
    skillTriggerCount: toAnalysisSkillTriggerCountProducingStats({
      pokemon,
      current: currentRate,
      rateOfAllPokemon,
    }),
    total: toAnalysisTotalProducingStats({
      pokemon,
      current: currentRate,
      rateOfAllPokemon,
    }),
  };
};
