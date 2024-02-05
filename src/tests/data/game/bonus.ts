import {defaultRecoveryRate, defaultUserSettings} from '@/const/user/settings';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {getSleepSessionInfo} from '@/utils/game/sleep';


export const testBonus: {[id in number]: EffectiveBonus} = {
  1: {
    mapMultiplier: 1.05,
    stamina: {
      logs: [], // ignore
      sleepSessionInfo: getSleepSessionInfo({
        sleepSession: defaultUserSettings.stamina.sleepSession,
        recoveryRate: defaultRecoveryRate,
      }),
      multiplier: {
        average: null, // ignore
        sleep1: 2.2,
        sleep2: 2.2,
        awake: 1.6,
      },
      intervalsDuringSleep: {
        primary: [], // ignore
        secondary: [], // ignore
      },
    },
    overallMultiplier: 1.2,
  },
};
