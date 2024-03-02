import {initialRatingResultOfCategory} from '@/const/game/rating/common';
import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingCombination, RatingExtrema, RatingResultOfCategoryAtLevel} from '@/types/game/pokemon/rating/result';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {RatingWorkerDataPointCalcReturn} from '@/utils/game/rating/calc/promises/type';
import {GetRatingResultOfCategoryPromisesOpts} from '@/utils/game/rating/calc/type';
import {getRatingValueOfBase} from '@/utils/game/rating/value/base';
import {getRatingValueOfCurrent} from '@/utils/game/rating/value/current';


type CalculateRatingResultOfCategoryOpts = RatingWorkerOpts & {
  getPromises: (opts: GetRatingResultOfCategoryPromisesOpts) => RatingWorkerDataPointCalcReturn,
};

export const calculateRatingResultOfCategory = async ({
  getPromises,
  ...opts
}: CalculateRatingResultOfCategoryOpts): Promise<RatingResultOfCategoryAtLevel> => {
  const {
    level,
    pokemon,
    ingredients,
    subSkill,
    nature,
    berryDataMap,
    mainSkillMap,
  } = opts;

  const {berry, skill} = pokemon;

  const berryData = berryDataMap[berry.id];
  const skillData = mainSkillMap[skill];

  const currentProductions = getEffectiveIngredientProductions({
    level,
    ingredients,
  });
  const currentCombination: RatingCombination = {
    pokemonId: pokemon.id,
    ingredients: currentProductions,
    subSkill,
    nature,
  };

  const valueOfCurrent = getRatingValueOfCurrent({
    ...opts,
    berryData,
    ingredients: currentProductions,
    skillData,
  });

  // Rating un-calculable, likely no berry data causing NaN result
  if (isNaN(valueOfCurrent)) {
    return initialRatingResultOfCategory;
  }

  const valueOfBase = getRatingValueOfBase({
    ...opts,
    berryData,
    ingredients: currentProductions,
    skillData,
  });

  let samples = 0;
  let rank = 1;
  let min: RatingExtrema | null = null;
  let max: RatingExtrema | null = null;
  const currentExtrema: RatingExtrema = {
    value: valueOfCurrent,
    combinations: [currentCombination],
  };

  const dataPoints = (await Promise.all(getPromises({currentCombination}))).flat();

  for (const dataPoint of dataPoints) {
    const {value, combination} = dataPoint;
    samples++;

    if (value > valueOfCurrent) {
      rank++;
    }

    if (!min || value < min.value) {
      min = {value, combinations: [combination]};
    } else if (value === min.value) {
      min.combinations.push(combination);
    }

    if (!max || value > max.value) {
      max = {value, combinations: [combination]};
    } else if (value === max.value) {
      max.combinations.push(combination);
    }

    if (value === currentExtrema.value) {
      currentExtrema.combinations.push(combination);
    }
  }

  const isValid = min?.value !== max?.value && !isNaN(valueOfCurrent);

  return {
    samples,
    rank: isValid ? rank : NaN,
    percentage: isValid && min && max ? Math.abs((valueOfCurrent - min.value) / (max.value - min.value) * 100) : NaN,
    percentile: isValid ? Math.abs((samples + 1 - rank) / (samples + 1) * 100) : NaN,
    baseDiffPercent: (valueOfCurrent / valueOfBase - 1) * 100,
    extrema: min && max && {min, current: currentExtrema, max},
  };
};
