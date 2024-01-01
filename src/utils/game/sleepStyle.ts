import groupBy from 'lodash/groupBy';

import {spoToDrowsyScoreMultiplier} from '@/const/game/sleepStyle';
import {SnorlaxRank} from '@/types/game/rank';
import {
  SleepStyleMerged,
  SleepStyleNormalFlattened,
  SleepStyleSpecial,
  SleepStyleSpoRequirement,
} from '@/types/game/sleepStyle';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {getSnorlaxRankAtEnergy, sortBySnorlaxRankAsc} from '@/utils/game/snorlax';
import {isNotNullish, Nullable} from '@/utils/type';


type GetSpoRequirementOpts = {
  spo: number,
  drowsyPowerMultiplier: number,
  sleepStyleUnlockRank: Nullable<SnorlaxRank>,
  snorlaxData: Nullable<SnorlaxDataOfMap>,
};

export const getSpoRequirement = ({
  spo,
  drowsyPowerMultiplier,
  sleepStyleUnlockRank,
  snorlaxData,
}: GetSpoRequirementOpts): SleepStyleSpoRequirement => {
  const drowsyScore = spo * spoToDrowsyScoreMultiplier;
  const snorlaxStrength = drowsyScore / drowsyPowerMultiplier;

  const rankRequirement = [
    snorlaxData ?
      getSnorlaxRankAtEnergy({energy: snorlaxStrength, data: snorlaxData.data})?.rank :
      null,
  ];
  if (sleepStyleUnlockRank) {
    rankRequirement.push(sleepStyleUnlockRank);
  }

  const snorlaxRankMinimum = rankRequirement
    .filter(isNotNullish)
    .sort(sortBySnorlaxRankAsc)
    .at(-1) ?? null;

  return {
    drowsyScore,
    snorlaxStrength,
    snorlaxRankMinimum,
  };
};

type GetSleepStyleMergedOpts = {
  normal: SleepStyleNormalFlattened[],
  special: SleepStyleSpecial[],
};

export const getSleepStyleMerged = ({normal, special}: GetSleepStyleMergedOpts): SleepStyleMerged[] => {
  const groupedNormal = groupBy(
    normal,
    ({pokemonId, style}) => toSleepdexStyleId({
      pokemonId,
      styleId: style.style,
    }),
  );

  return [
    ...Object.values(groupedNormal)
      .map((normalStyles): SleepStyleMerged | null => {
        const first = normalStyles.at(0);

        if (!first) {
          return null;
        }

        return {
          ...first.style,
          pokemonId: first.pokemonId,
          mapIds: normalStyles.map(({mapId}) => mapId),
          incenseOnly: false,
        };
      })
      .filter(isNotNullish),
    ...special.map(({pokemonId, ...style}): SleepStyleMerged => ({
      pokemonId,
      mapIds: [],
      rank: null,
      incenseOnly: !style.unreleased,
      ...style,
    })),
  ];
};
