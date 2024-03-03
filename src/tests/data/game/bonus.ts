import {defaultRecoveryRate, defaultUserConfig} from '@/const/user/config/user';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {getSleepSessionInfo} from '@/utils/game/sleep';


export const testBonus: {[id in number]: EffectiveBonus} = {
  1: {
    mapMultiplier: 1.05,
    stamina: {
      logs: [], // ignore
      sleepSessionInfo: getSleepSessionInfo({
        sleepSession: defaultUserConfig.stamina.sleepSession,
        recoveryRate: defaultRecoveryRate,
      }),
      multiplier: {
        average: null, // ignore
        sleep1: 2.2,
        sleep2: 2.2,
        awake: 1.6,
      },
      efficiencyIntervals: {
        sleep: {
          primary: [], // ignore
          secondary: [], // ignore
        },
        byMeal: {
          breakfast: [], // ignore
          lunch: [], // ignore
          dinner: [], // ignore
        },
      },
    },
    overallMultiplier: 1.2,
    strengthMultiplier: {
      berry: 1,
      cooking: 1,
      skill: 1,
    },
  },
};
