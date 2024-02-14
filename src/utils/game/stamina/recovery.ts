import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {StaminaRecoveryRateConfig} from '@/types/game/stamina/recovery';
import {toSum} from '@/utils/array';
import {getNatureMultiplier} from '@/utils/game/nature';
import {getSubSkillBonusValue} from '@/utils/game/subSkill/effect';
import {Nullable} from '@/utils/type';


type ToRecoveryRateOpts = {
  natureId: NatureId | null,
  subSkillBonuses: Nullable<GroupedSubSkillBonus>[],
};

export const toRecoveryRate = ({
  natureId,
  subSkillBonuses,
}: ToRecoveryRateOpts): StaminaRecoveryRateConfig => {
  const subSkillStaminaEffectValues = toSum(
    subSkillBonuses
      .flatMap((bonus) => getSubSkillBonusValue(bonus, 'stamina'))
      // Subskill bonus value is 1-base, for example, 1.14
      .map((bonus) => bonus - 1),
  );

  return {
    general: getNatureMultiplier({id: natureId, effect: 'energy'}),
    sleep: 1 + subSkillStaminaEffectValues,
  };
};
