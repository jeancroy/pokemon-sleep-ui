import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {getMainSkillEquivalentStrengthOfSingle} from '@/utils/game/mainSkill/effect/main';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';
import {applyBonus} from '@/utils/game/producing/apply/bonus';
import {applyBonusWithCapping} from '@/utils/game/producing/apply/bonusWithCap';
import {getStrengthMultiplier} from '@/utils/game/producing/multiplier';
import {getProducingRateBase} from '@/utils/game/producing/rateBase';


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
}: GetMainSkillProducingRateOpts): ProducingRateOfItemOfSessions => {
  const {bonus} = calculatedSettings;
  const {mapMultiplier, stamina} = bonus;
  const {primary, secondary} = stamina.sleepSessionInfo.session;

  frequency *= (1 / (skillRatePercent / 100));

  const id = pokemon.skill;

  const strengthMultiplier = getStrengthMultiplier({
    bonus,
    strengthMultiplierType: 'skill',
  });
  const strengthPerSkill = Math.ceil(getMainSkillEquivalentStrengthOfSingle(opts) * mapMultiplier);

  return {
    id,
    sleep1: applyBonusWithCapping({
      bonus,
      strengthMultiplier,
      producingState: 'sleep1',
      data: {
        id,
        frequency,
        period: 'daily',
        energy: strengthPerSkill,
        quantity: 1,
      },
      // While asleep, skills can only trigger at most 1
      maxFrequency: primary.duration.actual,
    }),
    sleep2: applyBonusWithCapping({
      bonus,
      strengthMultiplier,
      producingState: 'sleep2',
      data: {
        id,
        frequency,
        period: 'daily',
        energy: strengthPerSkill,
        quantity: 1,
      },
      // While asleep, skills can only trigger at most 1
      // `0` on null because if `sleepSessionInfo.session.secondary` is `null`,
      // it means no secondary sleep session, which also means length of 0
      maxFrequency: (secondary?.duration.actual ?? 0),
    }),
    awake: applyBonus({
      bonus,
      strengthMultiplier,
      producingState: 'awake',
      data: {
        id,
        frequency,
        ...getProducingRateBase({
          frequency,
          count: 1,
          picks: 1,
          energyPerCount: strengthPerSkill,
        }),
      },
    }),
  };
};
