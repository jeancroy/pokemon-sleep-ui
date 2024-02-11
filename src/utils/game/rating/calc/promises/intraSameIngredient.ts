import {natureData} from '@/data/nature';
import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingDataPoint} from '@/types/game/pokemon/rating/result';
import {calculateRatingValueIntraSpeciesSegmented} from '@/utils/game/rating/calc/promises/intraSegmented';
import {RatingWorkerDataPointCalcReturn} from '@/utils/game/rating/calc/promises/type';
import {CalculateRatingDataWorkerOpts, GetRatingResultOfCategoryPromisesOpts} from '@/utils/game/rating/calc/type';
import {isNotNullish} from '@/utils/type';


type CalculateRatingResultOfIntraSpeciesSameIngredientOpts =
  RatingWorkerOpts &
  GetRatingResultOfCategoryPromisesOpts;

export const calculateRatingResultOfIntraSpeciesSameIngredient = ({
  currentCombination,
  // Intentional unused property destruction for avoiding incorrect prop usage
  ingredients: _,
  ...opts
}: CalculateRatingResultOfIntraSpeciesSameIngredientOpts): RatingWorkerDataPointCalcReturn => {
  const {ingredients} = currentCombination;
  const {
    pokemon,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
  } = opts;

  const {berry, skill} = pokemon;

  const berryData = berryDataMap[berry.id];
  const skillData = mainSkillMap[skill];

  const subSkillData = Object.values(subSkillMap).filter(isNotNullish);
  const natureIds = natureData.map(({id}) => id);

  const calcOpts: CalculateRatingDataWorkerOpts = {
    ...opts,
    berryData,
    skillData,
    ingredients,
    subSkillData,
    natureIds,
  };

  return [
    new Promise<RatingDataPoint[]>((resolve) => resolve(calculateRatingValueIntraSpeciesSegmented(calcOpts))),
  ];
};
