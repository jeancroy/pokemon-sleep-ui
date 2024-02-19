import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {getMainSkillEquivalentStrengthOfSingle} from '@/utils/game/mainSkill/effect/main';
import {GetMainSkillProducingRateBaseOpts} from '@/utils/game/producing/branch/mainSkill/type';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/toBase/main';


export const getMainSkillProducingRateBase = ({
  pokemon,
  baseFrequency,
  calculatedSettings,
  skillRatePercent,
  ...opts
}: GetMainSkillProducingRateBaseOpts): ProducingRateOfDrop => {
  const {bonus} = calculatedSettings;
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
      getMainSkillEquivalentStrengthOfSingle(opts) * mapMultiplier * strengthMultiplier,
    ),
  });
};
