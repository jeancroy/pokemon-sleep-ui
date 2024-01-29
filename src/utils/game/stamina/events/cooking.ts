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
  Pick<GetLogsCommonOpts, 'logs' | 'sleepSessionInfo' | 'general' | 'recoveryRate'> &
  GetLogsWithCookingRecoveryCommonOpts & {
    cookingRecoveryConfig: StaminaCookingRecoveryConfig,
  };

export const getCookingRecoveryEntries = ({
  general,
  sleepSessionInfo,
  cookingRecoveryData,
  cookingRecoveryConfig,
}: GetLogsWithCookingRecoveryOpts): StaminaRecovery[] => {
  const {strategy} = general;
  const {offset} = sleepSessionInfo;

  if (strategy === 'optimistic') {
    return [];
  }

  if (strategy === 'conservative') {
    return userCookingMeals.map((userCookingMeal): StaminaRecovery => ({
      timing: rotateTime(cookingRecoveryConfig[userCookingMeal] + offset),
      getBaseAmount: (staminaBeforeCook) => getEffectiveStaminaCookingRecovery({
        cookingRecoveryData,
        staminaBeforeCook,
      }),
    }));
  }

  throw new Error(
    `Unhandled stamina recovery strategy [${strategy satisfies never}] for generating cooking recovery`,
  );
};

export const getLogsWithCookingRecovery = (opts: GetLogsWithCookingRecoveryOpts) => {
  const {logs, recoveryRate} = opts;

  return getLogsWithStaminaRecovery({
    logs,
    recoveries: getCookingRecoveryEntries(opts),
    recoveryRate,
    recoveryEventType: 'cookingRecovery',
  });
};
