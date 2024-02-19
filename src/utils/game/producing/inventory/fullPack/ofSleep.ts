import {FullPackStatsOfSleep} from '@/types/game/producing/inventory';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';
import {GetFullPackStatsCommonOpts} from '@/utils/game/producing/inventory/type';


type GetUpdatedFullPackStatsOfSleepOpts = {
  original: FullPackStatsOfSleep,
  spaceLeft: number,
  maxDrop: number,
  maxHelpCount: number,
  actualFrequency: number,
  actualDuration: number,
};

const getUpdatedFullPackStatsOfSleep = ({
  original,
  spaceLeft,
  maxDrop,
  maxHelpCount,
  actualFrequency,
  actualDuration,
}: GetUpdatedFullPackStatsOfSleepOpts): FullPackStatsOfSleep => {
  const {helpCount, duration} = original;

  if (spaceLeft < 0) {
    return {
      helpCount: {
        ...helpCount,
        filled: helpCount.filled + maxHelpCount,
      },
      duration: {
        ...duration,
        filled: duration.filled + actualDuration,
      },
    };
  }

  // Inventory fills during this interval
  if (spaceLeft - maxDrop <= 0) {
    const vacantHelpCount = Math.ceil(maxHelpCount * spaceLeft / maxDrop);
    const filledHelpCount = maxHelpCount - vacantHelpCount;

    const vacantDuration = actualFrequency * vacantHelpCount;
    const filledDuration = actualDuration - vacantDuration;

    return {
      helpCount: {
        vacant: helpCount.vacant + vacantHelpCount,
        filled: helpCount.filled + filledHelpCount,
      },
      duration: {
        vacant: duration.vacant + vacantDuration,
        filled: duration.filled + filledDuration,
      },
    };
  }

  return {
    helpCount: {
      ...helpCount,
      vacant: helpCount.vacant + maxHelpCount,
    },
    duration: {
      ...duration,
      vacant: duration.vacant + actualDuration,
    },
  };
};

type GetFullPackStatsOfSleepOpts = GetFullPackStatsCommonOpts & {
  staminaIntervals: EfficiencyInterval[] | null,
};

export const getFullPackStatsOfSleep = ({
  qtyPerHelp,
  frequency,
  carryLimit,
  staminaIntervals,
}: GetFullPackStatsOfSleepOpts): FullPackStatsOfSleep | null => {
  if (!staminaIntervals) {
    return null;
  }

  let expectedSecsPassed = 0;
  let actualSecsPassed = 0;
  let spaceLeft = carryLimit;
  let stats: FullPackStatsOfSleep = {
    helpCount: {vacant: 0, filled: 0},
    duration: {vacant: 0, filled: 0},
  };

  for (let i = 0; i < staminaIntervals.length; i++) {
    const {efficiency, duration} = staminaIntervals[i];
    const isLast = i + 1 === staminaIntervals.length;

    const actualFrequency = frequency / efficiency;

    let maxHelpCount = (duration - (actualSecsPassed - expectedSecsPassed)) / actualFrequency;
    if (!isLast) {
      maxHelpCount = Math.ceil(maxHelpCount);
    }
    const maxDrop = maxHelpCount * qtyPerHelp;

    const actualDuration = actualFrequency * maxHelpCount;

    stats = getUpdatedFullPackStatsOfSleep({
      original: stats,
      spaceLeft,
      maxDrop,
      maxHelpCount,
      actualFrequency,
      actualDuration,
    });

    expectedSecsPassed += duration;
    actualSecsPassed += maxHelpCount * actualFrequency;
    spaceLeft -= maxDrop;
  }

  return stats;
};
