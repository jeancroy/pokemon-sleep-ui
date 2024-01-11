import {NatureId} from '@/types/game/pokemon/nature';
import {RatingCombination} from '@/types/game/pokemon/rating/result';
import {SubSkillData} from '@/types/game/pokemon/subSkill';
import {GetRatingValueOfSimulationOpts} from '@/utils/game/rating/type';


export type CalculateRatingDataWorkerOpts = Omit<
  GetRatingValueOfSimulationOpts,
  'subSkill' | 'nature'
> & {
  subSkillData: SubSkillData[],
  natureIds: NatureId[],
};

export type GetRatingResultOfCategoryPromisesOpts = {
  currentCombination: RatingCombination,
};
