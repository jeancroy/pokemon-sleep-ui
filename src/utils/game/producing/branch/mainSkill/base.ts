import {ProducingRateOfDrop} from '@/types/game/producing/rate/base';
import {getMainSkillStrengthEffect} from '@/utils/game/mainSkill/bySkill/strength';
import {GetMainSkillProducingRateBaseOpts} from '@/utils/game/producing/branch/mainSkill/type';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/toBase/main';


export const getMainSkillProducingRateBase = ({
  pokemon,
  baseFrequency,
  calculatedUserConfig,
  skillRatePercent,
  ...opts
}: GetMainSkillProducingRateBaseOpts): ProducingRateOfDrop => {
  const {bonus} = calculatedUserConfig;
  const {mapMultiplier} = bonus;

  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'skill',
  });

  return getProducingRateBase({
    id: pokemon.skill,
    baseFrequency,
    triggerRate: skillRatePercent / 100,
    qtyPerHelp: 1,
    strengthPerQtyPerHelp: Math.ceil(
      getMainSkillStrengthEffect(opts) * mapMultiplier * strengthMultiplier,
    ),
  });
};
