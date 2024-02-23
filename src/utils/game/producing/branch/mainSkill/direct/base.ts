import {MainSkillEffect} from '@/types/game/pokemon/mainSkill';
import {ProductionOfDrop} from '@/types/game/producing/rate/base';
import {getMainSkillStrengthEffect} from '@/utils/game/mainSkill/bySkill/strength';
import {GetMainSkillProductionBaseCommonOpts} from '@/utils/game/producing/branch/mainSkill/direct/type';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProductionBase} from '@/utils/game/producing/toBase/main';


type GetMainSkillProductionBaseOpts = GetMainSkillProductionBaseCommonOpts & {
  skillRatePercent: number,
  activeSkillEffect: MainSkillEffect | null,
};

export const getMainSkillProduction = ({
  pokemon,
  baseFrequency,
  calculatedUserConfig,
  skillRatePercent,
  activeSkillEffect,
}: GetMainSkillProductionBaseOpts): ProductionOfDrop => {
  const {bonus} = calculatedUserConfig;
  const {mapMultiplier} = bonus;

  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'skill',
  });

  return getProductionBase({
    id: pokemon.skill,
    baseFrequency,
    triggerRate: skillRatePercent / 100,
    qtyPerHelp: 1,
    strengthPerQtyPerHelp: Math.ceil(
      getMainSkillStrengthEffect({activeSkillEffect}) * mapMultiplier * strengthMultiplier,
    ),
  });
};