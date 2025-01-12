import {testDefaultCalculatedUserConfig} from '@/tests/data/user/config';
import {EffectiveBonus} from '@/types/game/bonus/main';
import {
  ProductionByCalculatedStates,
  ProductionOfDrop,
  ProductionValueByCalculatedStates,
} from '@/types/game/producing/rate/base';
import {ToFinalProductionOfDropCommonOpts} from '@/utils/game/producing/toFinal/type';


export const testBaseProductionOfDrop: ProductionOfDrop = {
  id: NaN,
  period: 'daily',
  frequency: NaN, // ignore
  triggerRate: NaN, // ignore
  qty: NaN, // ignore
  qtyPerHelp: NaN, // ignore
  strength: NaN, // ignore
  strengthPerHelp: NaN, // ignore
};

export const testProductionValueByState: ProductionValueByCalculatedStates = {
  awake: NaN, // ignore
  sleep1Vacant: NaN, // ignore
  sleep1Filled: NaN, // ignore
  sleep2Vacant: NaN, // ignore
  sleep2Filled: NaN, // ignore
  base: NaN, // ignore
  equivalent: NaN, // ignore
  unfilledOnly: NaN, // ignore
};

export const testBaseProductionByState: ProductionByCalculatedStates = {
  id: NaN, // ignore
  frequency: testProductionValueByState, // ignore
  period: 'daily', // ignore
  qty: testProductionValueByState, // ignore
  strength: testProductionValueByState, // ignore
};

export const getTestFinalProductionOfDropCommonOpts = (
  bonus: EffectiveBonus,
): ToFinalProductionOfDropCommonOpts => ({
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
  skillTrigger: {
    ratePercent: NaN, // ignore
  },
});
