import {defaultMapBonus} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export type ToEffectiveBonusOpts = {
  settings: UserSettings,
  skillTriggers?: StaminaSkillTriggerData[],
};

export const toEffectiveBonus = ({settings, skillTriggers}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina, staminaSkillTrigger} = settings;

  const sessionInfo = getSleepSessionInfo({
    session: stamina.sleepSession,
    recoveryRate: stamina.recoveryRate,
  });
  const staminaEfficiency = getStaminaEfficiency({
    config: stamina,
    skillTriggers: skillTriggers ?? [staminaSkillTrigger],
    sessionInfo,
  });

  return {
    mapMultiplier: 1 + (bonus.map[settings.currentMap] ?? defaultMapBonus) / 100,
    stamina: staminaEfficiency,
    overallMultiplier: 1 + (bonus.overall / 100),
  };
};
