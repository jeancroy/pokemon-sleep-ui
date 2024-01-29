import {defaultMapBonus} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export type ToEffectiveBonusOpts = {
  settings: UserSettings,
  cookingRecoveryData: StaminaCookingRecoveryData[],
  additionalSkillTriggers?: StaminaSkillTriggerData[],
};

export const toEffectiveBonus = ({
  settings,
  cookingRecoveryData,
  additionalSkillTriggers,
}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina} = settings;

  const staminaEfficiency = getStaminaEfficiency({
    config: stamina,
    cookingRecoveryData,
    additionalSkillTriggers,
  });

  return {
    mapMultiplier: 1 + (bonus.map[settings.currentMap] ?? defaultMapBonus) / 100,
    stamina: staminaEfficiency,
    overallMultiplier: 1 + (bonus.overall / 100),
  };
};
