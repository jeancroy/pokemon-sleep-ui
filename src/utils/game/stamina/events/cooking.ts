import {
  StaminaCookingRecoveryConfig,
  StaminaCookingRecoveryData,
  StaminaRecovery,
} from '@/types/game/stamina/recovery';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
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
  Pick<GetLogsCommonOpts, 'logs' | 'sleepSessionInfo' | 'recoveryRate'> &
  GetLogsWithCookingRecoveryCommonOpts & {
    cookingRecoveryConfig: StaminaCookingRecoveryConfig,
  };

export const getCookingRecoveryEntries = ({
  sleepSessionInfo,
  cookingRecoveryData,
  cookingRecoveryConfig,
}: GetLogsWithCookingRecoveryOpts): StaminaRecovery[] => {
  const {offset} = sleepSessionInfo;

  return cookingMeals.map((cookingMeal): StaminaRecovery => ({
    timing: rotateTime(cookingRecoveryConfig[cookingMeal] + offset),
    getBaseAmount: (staminaBeforeCook) => getEffectiveStaminaCookingRecovery({
      cookingRecoveryData,
      staminaBeforeCook,
    }),
    ignoreRecoveryRate: true,
  }));
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
