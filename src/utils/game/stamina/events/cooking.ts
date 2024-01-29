import {
  StaminaCookingRecoveryConfig,
  StaminaCookingRecoveryData,
  StaminaRecovery,
} from '@/types/game/stamina/recovery';
import {userCookingMeals} from '@/types/userData/cooking';
import {getLogsWithStaminaRecovery} from '@/utils/game/stamina/events/recovery';
import {GetLogsCommonOpts} from '@/utils/game/stamina/events/type';
import {rotateTime} from '@/utils/time';


type GetLogsWithCookingRecoveryCommonOpts = {
  cookingRecoveryData: StaminaCookingRecoveryData[],
};

type GetEffectiveStaminaCookingRecoveryOpts = GetLogsWithCookingRecoveryCommonOpts & {
  staminaBeforeCook: number | undefined,
};

const getEffectiveStaminaCookingRecovery = ({
  cookingRecoveryData,
  staminaBeforeCook,
}: GetEffectiveStaminaCookingRecoveryOpts): number => {
  if (staminaBeforeCook === undefined) {
    throw new Error('Unexpected undefined stamina before cooking');
  }

  for (const {staminaRange, recovery} of cookingRecoveryData) {
    if (staminaBeforeCook >= staminaRange.start && staminaBeforeCook < staminaRange.end) {
      return recovery;
    }
  }

  return 0;
};

type GetLogsWithCookingRecoveryOpts =
  Pick<GetLogsCommonOpts, 'logs' | 'sessionInfo' | 'recoveryRate'> &
  GetLogsWithCookingRecoveryCommonOpts & {
    cookingRecoveryConfig: StaminaCookingRecoveryConfig,
  };

export const getLogsWithCookingRecovery = ({
  logs,
  sessionInfo,
  recoveryRate,
  cookingRecoveryData,
  cookingRecoveryConfig,
}: GetLogsWithCookingRecoveryOpts) => {
  const {offset} = sessionInfo;

  return getLogsWithStaminaRecovery({
    logs,
    recoveries: userCookingMeals.map((userCookingMeal): StaminaRecovery => ({
      timing: rotateTime(cookingRecoveryConfig[userCookingMeal] + offset),
      getBaseAmount: (staminaBeforeCook) => getEffectiveStaminaCookingRecovery({
        cookingRecoveryData,
        staminaBeforeCook,
      }),
    })),
    recoveryRate,
    recoveryEventType: 'cookingRecovery',
  });
};
