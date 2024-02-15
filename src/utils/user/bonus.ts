import {defaultMapBonus} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {StrengthMultiplier, strengthMultiplierType} from '@/types/game/bonus/strength';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaSkillTriggerData} from '@/types/game/stamina/skill';
import {UserSettings, UserSettingsRequiredData} from '@/types/userData/settings/main';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';
import {
  getCurrentEventStrengthMultiplier,
  getEffectiveStrengthMultiplier,
} from '@/utils/user/settings/eventStrengthMultiplier';


export type ToEffectiveBonusOpts = Omit<UserSettingsRequiredData, 'mealMap'> & {
  settings: UserSettings,
  snorlaxFavorite: SnorlaxFavorite,
  additionalSkillTriggers?: StaminaSkillTriggerData[],
};

export const toEffectiveBonus = ({
  settings,
  snorlaxFavorite,
  cookingRecoveryData,
  eventStrengthMultiplierData,
  additionalSkillTriggers,
}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina, multiplier} = settings;

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
    strengthMultiplier: Object.fromEntries(strengthMultiplierType.map((type) => [
      type,
      getEffectiveStrengthMultiplier({
        current: getCurrentEventStrengthMultiplier({
          type,
          eventStrengthMultiplierData,
        }),
        settings: multiplier.strength[type],
      }),
    ])) as StrengthMultiplier,
  };
};
