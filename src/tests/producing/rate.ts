import {testDefaultCalculatedUserConfig} from '@/tests/data/user/config';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {ProducingRateOfDrop} from '@/types/game/producing/rate';
import {ToFinalProducingRateOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


export const testBaseProducingRateOfDrop: ProducingRateOfDrop = {
  id: NaN,
  period: 'daily',
  frequency: NaN, // ignore
  triggerRate: NaN, // ignore
  qty: NaN, // ignore
  qtyPerHelp: NaN, // ignore
  strength: NaN, // ignore
  strengthPerHelp: NaN, // ignore
};

export const getTestFinalProducingRateOfDropCommonOpts = (
  bonus: EffectiveBonus,
): ToFinalProducingRateOfDropCommonOpts => ({
  fullPackStats: {
    bySleep: {
      primary: {
        helpCount: {
          vacant: 20,
          filled: 5.3,
        },
        duration: {
          vacant: 20000,
          filled: 10600,
        },
      },
      secondary: null,
    },
  },
  calculatedUserConfig: {
    ...testDefaultCalculatedUserConfig,
    bonus,
  },
  sleepSessionInfo: {
    ...bonus.stamina.sleepSessionInfo,
    duration: {
      awake: 55800,
      asleep: NaN, // ignore
    },
  },
});
