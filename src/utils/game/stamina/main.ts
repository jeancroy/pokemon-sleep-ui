import {StaminaEfficiency} from '@/types/game/stamina/efficiency';
import {getSleepSessionInfo} from '@/utils/game/sleep';
import {extractIntervalsDuringSleep} from '@/utils/game/stamina/interval';
import {getStaminaEventLogs} from '@/utils/game/stamina/log/main';
import {getStaminaEfficiencyMultiplierFromLogs} from '@/utils/game/stamina/log/multiplier';
import {GetStaminaEventLogOpts} from '@/utils/game/stamina/log/type';


export const getStaminaEfficiency = (opts: Omit<GetStaminaEventLogOpts, 'sleepSessionInfo'>): StaminaEfficiency => {
  const {config} = opts;
  const {sleepSession, recoveryRate} = config;

  const sleepSessionInfo = getSleepSessionInfo({sleepSession, recoveryRate});
  const hasSecondary = !!sleepSessionInfo.session.secondary;

  const logs = getStaminaEventLogs({sleepSessionInfo, ...opts});
  const multiplier = getStaminaEfficiencyMultiplierFromLogs({logs, hasSecondary});

  return {
    logs,
    multiplier,
    sleepSessionInfo,
    intervalsDuringSleep: extractIntervalsDuringSleep({logs, hasSecondary}),
  };
};
