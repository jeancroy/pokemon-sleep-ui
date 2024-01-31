import {ProducingRate} from '@/types/game/producing/rate';
import {TeamMemberProduction} from '@/types/game/team';
import {TeamAnalysisSlotName, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {getTeamProducingStatsSlot} from '@/ui/team/analysis/calc/slot';
import {TeamCompCalcOpts} from '@/ui/team/analysis/calc/type';
import {TeamProducingStatsBySlot} from '@/ui/team/analysis/setup/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingRateMulti} from '@/utils/game/producing/main/multi';
import {getTotalOfPokemonProducingRate} from '@/utils/game/producing/rateReducer';
import {isNotNullish} from '@/utils/type';


export const getTeamCompCalcResult = ({
  period,
  state,
  snorlaxFavorite,
  ...opts
}: TeamCompCalcOpts) => {
  const {
    ingredientMap,
    setup,
    cookingSettings,
  } = opts;
  const currentTeam = getCurrentTeam({setup});

  const {rates, grouped} = getPokemonProducingRateMulti({
    ingredientMap,
    cookingSettings,
    groupingState: state,
    sharedOpts: {
      snorlaxFavorite,
      period,
    },
    rateOpts: teamAnalysisSlotName
      .map((slotName) => {
        const producingStatsOpts = getTeamProducingStatsSlot({
          // `slotName` has to be after `opts` because `opts` got `slotName` in it as well
          ...opts,
          slotName,
        });

        if (!producingStatsOpts) {
          return null;
        }

        const {
          rateOpts,
          calculatedSettings,
        } = producingStatsOpts;

        return {
          opts: rateOpts,
          payload: {
            slotName,
            calculatedSettings,
          },
        };
      })
      .filter(isNotNullish),
  });

  return {
    bySlot: Object.fromEntries(rates.map(({
      payload,
      atStage,
    }): [TeamAnalysisSlotName, TeamMemberProduction] => {
      const {slotName, calculatedSettings} = payload;
      const total: ProducingRate = getTotalOfPokemonProducingRate({rate: atStage.final, state});

      return [
        slotName,
        {
          ...atStage.final,
          calculatedSettings,
          total,
          level: currentTeam.members[slotName]?.level ?? null,
        },
      ];
    })) as TeamProducingStatsBySlot,
    grouped,
  };
};
