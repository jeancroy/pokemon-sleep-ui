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
import {getSnorlaxRankAtStrength, sortBySnorlaxRankAsc} from '@/utils/game/snorlax';
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
  const strength = drowsyScore / drowsyPowerMultiplier;

  const rankRequirement = [
    snorlaxData ?
      getSnorlaxRankAtStrength({strength, data: snorlaxData.data})?.rank :
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
    spo,
    drowsyScore,
    snorlaxStrength: strength,
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
    ({style}) => style.internalId,
  );

  return [
    ...Object.values(groupedNormal).map((normalStyles): SleepStyleMerged | null => {
      const first = normalStyles.at(0);

      if (!first) {
        return null;
      }

      return {
        ...first.style,
        pokemonId: first.pokemonId,
        rank: Object.fromEntries(normalStyles.map(({mapId, style}) => [mapId, style.rank])),
        incenseOnly: false,
      };
    }).filter(isNotNullish),
    ...special.map(({pokemonId, ...style}): SleepStyleMerged => ({
      pokemonId,
      rank: {},
      incenseOnly: !style.unreleased,
      ...style,
    })),
  ];
};
