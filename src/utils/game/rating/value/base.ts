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
    individual,
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
      individual: {
        ...individual,
        // Override `seeds` to apply no-seed usage
        seeds: {gold: 0, silver: 0},
        // Override `evolutionCount` to apply default evolution count of the Pokémon
        evolutionCount: getEvolutionCountFromPokemonInfo({pokemon}),
        // Force `mainSkillLevelOverride` to null to use the base main skill level without seeds
        mainSkillLevelOverride: undefined,
      },
      calculatedCookingConfig,
      calcBehavior: getRatingProductionCalcBehavior(basis),
    }).atStage.final,
    targetMeals,
  });
};
