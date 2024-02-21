import {ProducingRate} from '@/types/game/producing/rate/base';
import {TeamMemberProduction} from '@/types/game/team';
import {TeamAnalysisSlotName, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {getTeamProducingStatsSlot} from '@/ui/team/analysis/calc/slot';
import {TeamCompCalcOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStatsBySlot} from '@/ui/team/analysis/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/entry/multi';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/reducer/sum';
import {isNotNullish} from '@/utils/type';


export const getTeamCompCalcResult = ({
  period,
  state,
  snorlaxFavorite,
  ...opts
}: TeamCompCalcOpts) => {
  const {setup} = opts;
  const currentTeam = getCurrentTeam({setup});

  const {rates, grouped} = getPokemonProducingRateMulti({
    ...opts,
    groupingState: state,
    sharedOpts: {
      ...opts,
      snorlaxFavorite,
      period,
    },
    rateOpts: teamAnalysisSlotName.map((slotName) => {
      const producingStatsOpts = getTeamProducingStatsSlot({
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
      const total: ProducingRate = getTotalOfPokemonProducingRate({rate: atStage.final, state});

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
