import {defaultMapBonus} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaCookingRecoveryData} from '@/types/game/stamina/recovery';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings} from '@/types/userData/settings';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';


export type ToEffectiveBonusOpts = {
  settings: UserSettings,
  snorlaxFavorite: SnorlaxFavorite,
  cookingRecoveryData: StaminaCookingRecoveryData[],
  additionalSkillTriggers?: StaminaSkillTriggerData[],
};

export const toEffectiveBonus = ({
  settings,
  snorlaxFavorite,
  cookingRecoveryData,
  additionalSkillTriggers,
}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina} = settings;

  const staminaEfficiency = getStaminaEfficiency({
    config: stamina,
    cookingRecoveryData,
    additionalSkillTriggers,
  });

  const mapBonus = snorlaxFavorite.mapId ?
    (bonus.map[snorlaxFavorite.mapId] ?? defaultMapBonus) / 100 :
    0;

  return {
    mapMultiplier: 1 + mapBonus,
    stamina: staminaEfficiency,
    overallMultiplier: 1 + (bonus.overall / 100),
  };
};
