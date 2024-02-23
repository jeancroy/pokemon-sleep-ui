import {getEvolutionCountFromPokemonInfo} from '@/utils/game/pokemon/evolution/count';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getRatingBasisValue} from '@/utils/game/rating/basis';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';
import {getRatingProductionCalcBehavior} from '@/utils/game/rating/utils';
import {getRatingValueCommon} from '@/utils/game/rating/value/common';


export const getRatingValueOfBase = (opts: GetRatingValueOfSimulationOpts) => {
  const {
    level,
    basis,
    pokemon,
  } = opts;

  const {
    singleParams,
    calculatedCookingConfig,
    targetMeals,
  } = getRatingValueCommon({
    baseOpts: opts,
    level,
    subSkill: {},
    nature: null,
  });

  return getRatingBasisValue({
    ...opts,
    rate: getPokemonProductionSingle({
      ...opts,
      ...singleParams,
      // Override `evolutionCount` in `opts` to apply default evolution count of the Pokémon
      evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
      calculatedCookingConfig,
      calcBehavior: getRatingProductionCalcBehavior(basis),
    }).atStage.final,
    targetMeals,
  });
};
