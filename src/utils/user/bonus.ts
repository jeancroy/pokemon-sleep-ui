import {defaultMapBonus} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {SleepSessionInfo} from '@/types/game/sleep';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export type ToEffectiveBonusOpts = {
  settings: UserSettings,
  sleepSessionInfo: SleepSessionInfo,
  skillTriggers?: StaminaSkillTriggerData[],
};

export const toEffectiveBonus = ({
  settings,
  sleepSessionInfo,
  skillTriggers,
}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina, staminaSkillTrigger} = settings;

  const staminaEfficiency = getStaminaEfficiency({
    config: stamina,
    skillTriggers: skillTriggers ?? [staminaSkillTrigger],
    sessionInfo: sleepSessionInfo,
  });

  return {
    mapMultiplier: 1 + (bonus.map[settings.currentMap] ?? defaultMapBonus) / 100,
    stamina: staminaEfficiency,
    overallMultiplier: 1 + (bonus.overall / 100),
  };
};
