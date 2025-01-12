import {defaultMapBonus} from '@/const/user/config/user';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {StrengthMultiplier, strengthMultiplierType} from '@/types/game/bonus/strength';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {StaminaSkillTriggerOverride} from '@/types/game/stamina/skill';
import {ConfigRequiredData} from '@/types/userData/config/data';
import {UserConfig} from '@/types/userData/config/user/main';
import {
  getCurrentEventStrengthMultiplier,
  getEffectiveStrengthMultiplier,
} from '@/utils/game/event/strengthMultiplier';
import {getStaminaEfficiency} from '@/utils/game/stamina/main';
import {Nullable} from '@/utils/type';


export type ToEffectiveBonusOpts = Omit<ConfigRequiredData, 'mealMap'> & {
  userConfig: UserConfig,
  snorlaxFavorite: SnorlaxFavorite,
  skillTriggerOverride?: Nullable<StaminaSkillTriggerOverride>,
};

export const toEffectiveBonus = ({
  userConfig,
  snorlaxFavorite,
  cookingRecoveryData,
  eventStrengthMultiplierData,
  skillTriggerOverride,
}: ToEffectiveBonusOpts): EffectiveBonus => {
  const {bonus, stamina, multiplier} = userConfig;

  const staminaEfficiency = getStaminaEfficiency({
    config: stamina,
    cookingRecoveryData,
    skillTriggerOverride,
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
        config: multiplier.strength[type],
      }),
    ])) as StrengthMultiplier,
  };
};
