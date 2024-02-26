import {BerryData} from '@/types/game/berry';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';
import {RatingWorkerOpts} from '@/types/game/pokemon/rating/request';


export type GetRatingValueOfSimulationOpts = Omit<RatingWorkerOpts, 'ingredients'> & {
  berryData: BerryData,
  ingredients: IngredientProduction[],
  skillData: MainSkillData,
};
