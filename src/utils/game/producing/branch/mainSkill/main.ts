import {ProducingRateCommonParams, ProducingRateOfBranchByState} from '@/types/game/producing/rate';
import {getMainSkillEquivalentStrengthOfSingle} from '@/utils/game/mainSkill/effect/main';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';
import {applyBonusWithCapping} from '@/utils/game/producing/apply/bonus/bonusWithCap';
import {applyBonus} from '@/utils/game/producing/apply/bonus/bonusWithMultiplier';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateOfBranch} from '@/utils/game/producing/rateOfBranch';


export type GetMainSkillProducingRateOpts =
  Omit<ProducingRateCommonParams, 'level'> &
  GetMainSkillEquivalentStrengthOpts & {
    skillRatePercent: number,
  };

export const getMainSkillProducingRate = ({
  pokemon,
  frequency,
  calculatedSettings,
  skillRatePercent,
  ...opts
}: GetMainSkillProducingRateOpts): ProducingRateOfBranchByState => {
  const {bonus} = calculatedSettings;
  const {mapMultiplier, stamina} = bonus;
  const {primary, secondary} = stamina.sleepSessionInfo.session;

  frequency *= (1 / (skillRatePercent / 100));

  const id = pokemon.skill;

  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'skill',
  });

  const rateBase = getProducingRateOfBranch({
    id,
    frequency,
    count: 1,
    picks: 1,
    energyPerCount: Math.ceil(getMainSkillEquivalentStrengthOfSingle(opts) * mapMultiplier),
  });

  return {
    id,
    rateBase,
    sleep1: applyBonusWithCapping({
      bonus,
      strengthMultiplier,
      producingState: 'sleep1',
      rateBase,
      // While asleep, skills can only trigger at most 1
      maxFrequency: primary.duration.actual,
    }),
    sleep2: applyBonusWithCapping({
      bonus,
      strengthMultiplier,
      producingState: 'sleep2',
      rateBase,
      // While asleep, skills can only trigger at most 1
      // `0` on null because if `sleepSessionInfo.session.secondary` is `null`,
      // it means no secondary sleep session, which also means length of 0
      maxFrequency: (secondary?.duration.actual ?? 0),
    }),
    awake: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'awake',
      rateBase,
    }),
  };
};
