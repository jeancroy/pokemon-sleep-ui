import {
  getTeamMakerCandidateMapFromTopList,
  GetTeamMakerCandidateMapFromTopListOpts,
} from '@/ui/team/maker/calc/getCandidates/initial/fromTop';
import {getTeamMakerFullMealCoverCandidates} from '@/ui/team/maker/calc/getCandidates/initial/fullMealCover';
import {TeamMakerCandidateInitialData} from '@/ui/team/maker/calc/getCandidates/initial/type';
import {getTeamMakerCandidates} from '@/ui/team/maker/calc/getCandidates/main';
import {GetTeamMakerCandidatesOpts} from '@/ui/team/maker/calc/getCandidates/type';
import {TeamMakerCandidateData, TeamMakerMemberCount} from '@/ui/team/maker/type/common';
import {getCombinationCount} from '@/utils/compute';


type GetTeamMakerInitialCandidateMapOpts = GetTeamMakerCandidatesOpts & GetTeamMakerCandidateMapFromTopListOpts;

export const getTeamMakerCandidateInitialData = (
  opts: GetTeamMakerInitialCandidateMapOpts,
): TeamMakerCandidateInitialData => {
  const {
    input,
  } = opts;
  const {
    basis,
    memberCount,
    teamCompsToShow,
  } = input;

  if (basis === 'strength') {
    return {
      candidates: getTeamMakerCandidateMapFromTopList(opts),
      isLimitCheckingNotNeeded: false,
    };
  }

  if (basis === 'mealCoverage') {
    const candidatesReturn: Map<string, TeamMakerCandidateData> = new Map<string, TeamMakerCandidateData>();

    for (const {candidates, memberCount} of getTeamMakerFullMealCoverCandidates(opts)) {
      if (!candidates.size) {
        continue;
      }

      for (const [key, value] of candidates) {
        candidatesReturn.set(key, value);
      }

      const spotsLeft = input.memberCount - memberCount;
      if (!spotsLeft) {
        continue;
      }

      for (const [key, value] of getTeamMakerCandidates({
        ...opts,
        input: {
          ...input,
          basis: 'strength',
          memberCount: spotsLeft as TeamMakerMemberCount,
        },
      })) {
        candidatesReturn.set(key, value);
      }
    }

    const isAllCombinationsCanShow = getCombinationCount(candidatesReturn.size, memberCount) >= teamCompsToShow;

    if (!isAllCombinationsCanShow) {
      // If unsatisfied meal cover comp might show, add these candidates at the top
      // as windowing on meal coverage might still be needed
      for (const [key, value] of getTeamMakerCandidateMapFromTopList(opts)) {
        candidatesReturn.set(key, value);
      }
    }

    return {
      candidates: candidatesReturn,
      isLimitCheckingNotNeeded: isAllCombinationsCanShow,
    };
  }

  throw new Error(`Unhandled team maker basis for candidate initial data: ${basis satisfies never}`);
};
