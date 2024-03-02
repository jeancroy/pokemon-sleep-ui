import {ingredientLevels, IngredientProduction} from '@/types/game/pokemon/ingredient';
import {getAnalysisStatsOfGrouped} from '@/ui/analysis/page/calc/grouped';
import {getAnalysisStatsOfSleepStyle} from '@/ui/analysis/page/calc/pokemon/sleepStyle';
import {AnalysisStats, AnalysisStatsGrouped, GetAnalysisStatsWorkerOpts} from '@/ui/analysis/page/calc/type';


export const getAnalysisStatsOfPokemon = (opts: GetAnalysisStatsWorkerOpts): AnalysisStats['pokemon'] => {
  const {
    pokemonList,
    pokemon,
    ingredientChainMap,
  } = opts;

  const currentChain = ingredientChainMap[pokemon.ingredientChain];

  return {
    type: getAnalysisStatsOfGrouped({
      samples: pokemonList,
      isMatched: ({type}) => type === pokemon.type,
      getLinkedData: ({type}) => type,
    }),
    specialty: getAnalysisStatsOfGrouped({
      samples: pokemonList,
      isMatched: ({specialty}) => specialty === pokemon.specialty,
      getLinkedData: ({specialty}) => specialty,
    }),
    sleepType: getAnalysisStatsOfGrouped({
      samples: pokemonList,
      isMatched: ({sleepType}) => sleepType === pokemon.sleepType,
      getLinkedData: ({sleepType}) => sleepType,
    }),
    ingredient: Object.fromEntries(ingredientLevels.map((ingredientLevel) => [
      ingredientLevel,
      currentChain.ingredients[ingredientLevel].map((production) => getAnalysisStatsOfGrouped({
        samples: pokemonList,
        isMatched: ({ingredientChain}) => ingredientChainMap[ingredientChain].ingredients[ingredientLevel]
          .some(({id}) => id === production.id),
        getLinkedData: () => production,
      })) satisfies AnalysisStatsGrouped<IngredientProduction>[],
    ])) as AnalysisStats['pokemon']['ingredient'],
    berry: getAnalysisStatsOfGrouped({
      samples: pokemonList,
      isMatched: ({berry}) => berry.id === pokemon.berry.id,
      getLinkedData: ({berry}) => berry.id,
    }),
    mainSkill: getAnalysisStatsOfGrouped({
      samples: pokemonList,
      isMatched: ({skill}) => skill === pokemon.skill,
      getLinkedData: ({skill}) => skill,
    }),
    sleepStyle: getAnalysisStatsOfSleepStyle(opts),
  };
};
