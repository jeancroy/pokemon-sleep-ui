import {MainSkillEffect} from '@/types/game/pokemon/mainSkill';
import {ProducingRateOfDrop} from '@/types/game/producing/rate/base';
import {getMainSkillStrengthEffect} from '@/utils/game/mainSkill/bySkill/strength';
import {GetMainSkillProducingRateBaseCommonOpts} from '@/utils/game/producing/branch/mainSkill/direct/type';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/toBase/main';


type GetMainSkillProducingRateBaseOpts = GetMainSkillProducingRateBaseCommonOpts & {
  skillRatePercent: number,
  activeSkillEffect: MainSkillEffect | null,
};

export const getMainSkillProducingRateBase = ({
  pokemon,
  baseFrequency,
  calculatedUserConfig,
  skillRatePercent,
  activeSkillEffect,
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
      getMainSkillStrengthEffect({activeSkillEffect}) * mapMultiplier * strengthMultiplier,
    ),
  });
};
