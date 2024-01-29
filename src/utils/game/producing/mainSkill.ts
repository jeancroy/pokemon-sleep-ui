import {NatureId} from '@/types/game/pokemon/nature';
import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProducingRateCommonParams, ProducingRateOfItemOfSessions} from '@/types/game/producing/rate';
import {getMainSkillEquivalentStrengthOfSingle} from '@/utils/game/mainSkill/effect/main';
import {GetMainSkillEquivalentStrengthOpts} from '@/utils/game/mainSkill/effect/type';
import {getSkillTriggerRate} from '@/utils/game/mainSkill/utils';
import {applyBonus} from '@/utils/game/producing/apply/bonus';
import {applyBonusWithMainSkillCapping} from '@/utils/game/producing/apply/bonusWithMainSkillCap';
import {getProducingRateBase} from '@/utils/game/producing/rateBase';


export type GetMainSkillProducingRateOpts =
  Omit<ProducingRateCommonParams, 'level'> &
  GetMainSkillEquivalentStrengthOpts & {
    subSkillBonus: GroupedSubSkillBonus | null,
    skillRatePercent: number | null,
    natureId: NatureId | null,
  };

export const getMainSkillProducingRate = ({
  pokemon,
  frequency,
  calculatedSettings,
  energyMultiplier,
  subSkillBonus,
  skillRatePercent,
  natureId,
  ...opts
}: GetMainSkillProducingRateOpts): ProducingRateOfItemOfSessions => {
  const {bonus} = calculatedSettings;
  const {mapMultiplier, stamina} = bonus;
  const {primary, secondary} = stamina.sleepSessionInfo.session;

  frequency *= (1 / getSkillTriggerRate({skillRatePercent, subSkillBonus, natureId}));

  const id = pokemon.skill;

  const strengthPerSkill = Math.ceil(getMainSkillEquivalentStrengthOfSingle(opts) * mapMultiplier);

  return {
    id,
    sleep1: applyBonusWithMainSkillCapping({
      bonus,
      energyMultiplier,
      producingState: 'sleep1',
      data: {
        id,
        frequency,
        period: 'daily',
        energy: strengthPerSkill,
        quantity: 1,
      },
      // While asleep, skills can only trigger at most 1
      cappingDuration: primary.duration.actual,
      maxCount: 1,
    }),
    sleep2: applyBonusWithMainSkillCapping({
      bonus,
      energyMultiplier,
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
      cappingDuration: (secondary?.duration.actual ?? 0),
      maxCount: 1,
    }),
    awake: applyBonus({
      bonus,
      energyMultiplier,
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
