import {teamAnalysisSlotName} from '@/types/teamAnalysis';
import {GetTeamProducingStatsCommonOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStatsBySlot, TeamProducingStatsTotal} from '@/ui/team/analysis/setup/type';
import {toSum} from '@/utils/array';
import {getTotalStrengthProductionFromIndirectSkill} from '@/utils/game/producing/reducer/total/indirectSkill';
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
      strength: toSum(stats.map(({berry}) => berry.strength[state])),
      qty: toSum(stats.map(({berry}) => berry.qty[state])),
    },
    ingredient: {
      period,
      strength: toSum(
        stats
          .flatMap(({ingredient}) => (
            Object.values(ingredient).map(({strength}) => strength[state])
          ))
          .filter(isNotNullish),
      ),
      qty: toSum(
        stats
          .flatMap(({ingredient}) => (
            Object.values(ingredient).map(({qty}) => qty[state])
          ))
          .filter(isNotNullish),
      ),
    },
    skill: {
      period,
      strength: toSum(stats.map(({skill, skillIndirect}) => (
        skill.strength[state] + getTotalStrengthProductionFromIndirectSkill({skillIndirect})
      ))),
      qty: toSum(stats.map(({skill}) => skill.qty[state])),
    },
  };
};
