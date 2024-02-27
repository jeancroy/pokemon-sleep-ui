import {Production} from '@/types/game/producing/rate/base';
import {TeamMemberProduction} from '@/types/game/team/production';
import {TeamAnalysisSlotName, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {getTeamProductionOfSlot} from '@/ui/team/analysis/calc/slot';
import {TeamCompCalcOpts, TeamCompCalcResult} from '@/ui/team/analysis/calc/type';
import {TeamProducingStatsBySlot} from '@/ui/team/analysis/setup/type';
import {getPokemonProductionMulti} from '@/utils/game/producing/main/entry/multi';
import {getTotalPokemonProduction} from '@/utils/game/producing/reducer/total/common';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';
import {isNotNullish} from '@/utils/type';


export const getTeamCompCalcResult = ({
  period,
  state,
  snorlaxFavorite,
  ...opts
}: TeamCompCalcOpts): TeamCompCalcResult => {
  const {setup} = opts;
  const currentTeam = getCurrentTeam({setup});

  const {rates, grouped} = getPokemonProductionMulti({
    ...opts,
    groupingState: state,
    sharedOpts: {
      ...opts,
      snorlaxFavorite,
      period,
    },
    rateOpts: teamAnalysisSlotName.map((slotName) => {
      const producingStatsOpts = getTeamProductionOfSlot({
        // `slotName` has to be after `opts` because `opts` got `slotName` in it as well
        ...opts,
        slotName,
      });

      if (!producingStatsOpts) {
        return null;
      }

      const {rateOpts} = producingStatsOpts;

      return {
        opts: rateOpts,
        payload: {slotName},
      };
    }).filter(isNotNullish),
  });

  return {
    bySlot: Object.fromEntries(rates.map(({
      payload,
      calculatedUserConfig,
      atStage,
    }): [TeamAnalysisSlotName, TeamMemberProduction] => {
      const {slotName} = payload;
      const total: Production = getTotalPokemonProduction({rate: atStage.final, state});

      return [
        slotName,
        {
          ...atStage.final,
          calculatedUserConfig: calculatedUserConfig,
          total,
          level: currentTeam.members[slotName]?.level ?? null,
        },
      ];
    })) as TeamProducingStatsBySlot,
    grouped,
  };
};
