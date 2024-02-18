import {natureData} from '@/data/nature';
import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';
import {RatingDataPoint} from '@/types/game/pokemon/rating/result';
import {isNestedWorkerSupported} from '@/utils/compatibility/nestedWorker';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {generatePossibleIngredientProductions} from '@/utils/game/producing/ingredient/chain';
import {calculateRatingValueIntraSpeciesSegmented} from '@/utils/game/rating/calc/promises/intraSegmented';
import {RatingWorkerDataPointCalcReturn} from '@/utils/game/rating/calc/promises/type';
import {CalculateRatingDataWorkerOpts} from '@/utils/game/rating/calc/type';
import {isNotNullish} from '@/utils/type';


export const calculateRatingResultOfIntraSpecies = (opts: RatingWorkerOpts): RatingWorkerDataPointCalcReturn => {
  const {
    basis,
    level,
    pokemon,
    ingredients,
    ingredientChainMap,
    berryDataMap,
    mainSkillMap,
    subSkillMap,
    useNestedWorker,
  } = opts;

  const {ingredientChain, berry, skill} = pokemon;

  const chain = ingredientChainMap[ingredientChain];
  const berryData = berryDataMap[berry.id];
  const skillData = mainSkillMap[skill];

  const subSkillData = Object.values(subSkillMap).filter(isNotNullish);
  const natureIds = natureData.map(({id}) => id);

  const ingredientProductions = basis == 'ingredientCount' ?
    [getEffectiveIngredientProductions({level, ingredients})] :
    generatePossibleIngredientProductions({level, chain});

  const promises: Promise<RatingDataPoint[]>[] = [];
  const runAsNestedWorker = useNestedWorker && level >= 50 && isNestedWorkerSupported();
  for (const ingredients of ingredientProductions) {
    const calcOpts: CalculateRatingDataWorkerOpts = {
      ...opts,
      berryData,
      skillData,
      ingredients,
      subSkillData,
      natureIds,
    };

    promises.push(new Promise<RatingDataPoint[]>((resolve) => {
      // Only use worker when the level is >= 50,
      // because the overhead of creating multiple workers is
      // greater than the time needed of doing the calculation directly in here
      if (runAsNestedWorker) {
        const worker = new Worker(new URL('intraSegmented.worker', import.meta.url));
        worker.postMessage(calcOpts satisfies CalculateRatingDataWorkerOpts);
        worker.onmessage = ({data}: MessageEvent<RatingDataPoint[]>) => {
          resolve(data);
          worker.terminate();
        };
      } else {
        resolve(calculateRatingValueIntraSpeciesSegmented(calcOpts));
      }
    }));
  }

  return promises;
};
