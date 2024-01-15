import {teamAnalysisSlotName} from '@/types/teamAnalysis';
import {GetTeamProducingStatsCommonOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStatsBySlot, TeamProducingStatsTotal} from '@/ui/team/analysis/setup/type';
import {toSum} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type GetTeamProducingStatsTotalOpts = GetTeamProducingStatsCommonOpts & {
  bySlot: TeamProducingStatsBySlot,
};

export const getTeamProducingStatsTotal = ({
  period,
  state,
  bySlot,
}: GetTeamProducingStatsTotalOpts): TeamProducingStatsTotal => {
  const stats = teamAnalysisSlotName
    .map((slotName) => bySlot[slotName])
    .filter(isNotNullish);

  return {
    berry: {
      period,
      energy: toSum(stats.map(({berry}) => berry.energy[state])),
      quantity: toSum(stats.map(({berry}) => berry.quantity[state])),
    },
    ingredient: {
      period,
      energy: toSum(
        stats
          .flatMap(({ingredient}) => (
            Object.values(ingredient).map(({energy}) => energy[state])
          ))
          .filter(isNotNullish),
      ),
      quantity: toSum(
        stats
          .flatMap(({ingredient}) => (
            Object.values(ingredient).map(({quantity}) => quantity[state])
          ))
          .filter(isNotNullish),
      ),
    },
    skill: {
      period,
      energy: toSum(stats.map(({skill}) => skill.energy[state])),
      quantity: toSum(stats.map(({skill}) => skill.quantity[state])),
    },
  };
};
