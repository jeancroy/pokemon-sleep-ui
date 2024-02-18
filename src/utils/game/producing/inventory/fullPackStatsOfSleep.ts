import {FullPackStatsOfSleep} from '@/types/game/producing/carryLimit';
import {EfficiencyInterval} from '@/types/game/stamina/efficiency';
import {GetFullPackStatsCommonOpts} from '@/utils/game/producing/inventory/type';


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

  let overflowDuration = 0;
  let spaceLeft = carryLimit;
  let stats: FullPackStatsOfSleep = {
    helpCount: 0,
    secsToFull: 0,
  };

  for (const {efficiency, duration} of staminaIntervals) {
    const actualFrequency = frequency / efficiency;

    const maxHelpCount = Math.ceil((duration - overflowDuration) / actualFrequency);
    const maxDrop = maxHelpCount * qtyPerHelp;

    const actualDuration = actualFrequency * maxHelpCount;

    if (spaceLeft - maxDrop <= 0) {
      const actualHelpCountInInterval = Math.ceil(spaceLeft / maxDrop * maxHelpCount);

      return {
        helpCount: stats.helpCount + actualHelpCountInInterval,
        secsToFull: stats.secsToFull + (actualFrequency * actualHelpCountInInterval),
      };
    }

    overflowDuration = actualDuration - duration;
    spaceLeft -= maxDrop;
    stats = {
      helpCount: stats.helpCount + maxHelpCount,
      secsToFull: stats.secsToFull + actualDuration,
    };
  }

  return null;
};
