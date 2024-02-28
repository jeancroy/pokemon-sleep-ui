import {ProductionSingleParams} from '@/types/game/producing/rate/params';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';


export const getSkillTriggerRateMultiplier = ({natureId, subSkillBonus}: ProductionSingleParams) => {
  const natureMultiplier = getNatureMultiplier({id: natureId, effect: 'mainSkill'});
  const subSkillRate = toSum(getSubSkillBonusValue(subSkillBonus, 'mainSkillProbability')) / 100;

  return natureMultiplier * (1 + subSkillRate);
};
