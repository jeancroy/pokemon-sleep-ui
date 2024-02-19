import React from 'react';

import CursorArrowRaysIcon from '@heroicons/react/24/outline/CursorArrowRaysIcon';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';

import {AdsUnit} from '@/components/ads/main';
import {Loading} from '@/components/icons/loading';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {MealCoverageComboCollapsible} from '@/components/shared/meal/coverage/combo/collapsible';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonGroupedProduction} from '@/components/shared/pokemon/production/grouped/main';
import {TeamContributionSplitIndicator} from '@/components/shared/team/contributionSplit/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {teamAnalysisSlotName} from '@/types/teamAnalysis';
import {useTeamProducingStats} from '@/ui/team/analysis/calc/hook';
import {TeamAnalysisCompControl} from '@/ui/team/analysis/setup/control/comp/main';
import {TeamAnalysisSetupUpdateCommonProps} from '@/ui/team/analysis/setup/control/setup/common/type';
import {useTeamAnalysisLayoutControl} from '@/ui/team/analysis/setup/control/setup/layoutControl/hook';
import {TeamAnalysisSetupControlUI} from '@/ui/team/analysis/setup/control/setup/main';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisSetupViewCommonProps} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {isNotNullish} from '@/utils/type';


type Props = TeamAnalysisDataProps & TeamAnalysisSetupUpdateCommonProps & TeamAnalysisSetupViewCommonProps;

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    currentTeam,
    setupControl,
    snorlaxData,
    mealMap,
    preloaded,
    bundleFromClient,
  } = props;
  const {setup} = setupControl;

  const {calculatedConfigBundle, bundle} = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: bundleFromClient,
    },
    ...props,
  });
  const {calculatedCookingSettings} = calculatedConfigBundle;
  const statsOfTeam = useTeamProducingStats({
    ...props,
    setup,
    bundle,
    calculatedCookingSettings,
  });
  const layoutControl = useTeamAnalysisLayoutControl({setup});
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const collapsible = useCollapsibleControl();

  if (!statsOfTeam) {
    return <Loading text="Worker"/>;
  }

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamAnalysisSetupControlUI
        layoutControl={layoutControl}
        {...props}
      />
      <AdsUnit hideIfNotBlocked/>
      <TeamAnalysisTeamView
        showPokemon={showPokemon}
        bundle={bundle}
        calculatedCookingSettings={calculatedCookingSettings}
        layoutControl={layoutControl}
        statsOfTeam={statsOfTeam}
        {...props}
      />
      <TeamContributionSplitIndicator
        data={teamAnalysisSlotName.map((slotName) => {
          const pokemonId = currentTeam.members[slotName]?.pokemonId;

          if (!pokemonId) {
            return null;
          }

          return {
            pokemonId,
            production: statsOfTeam.bySlot[slotName]?.total.strength ?? 0,
          };
        }).filter(isNotNullish)}
      />
      <TeamAnalysisCompControl {...props}/>
      <AdsUnit/>
      <PokemonGroupedProduction grouped={statsOfTeam.grouped}/>
      <AdsUnit hideIfNotBlocked/>
      <MealCoverageComboCollapsible
        collapsible={collapsible}
        mealMap={mealMap}
        ingredientProduction={Object.fromEntries(
          Object.entries(statsOfTeam.grouped.ingredient)
            .map(([id, rate]) => [id, rate?.qty ?? 0]),
        )}
        actualPotCapacity={calculatedCookingSettings.actualPotCapacity}
        period={currentTeam.analysisPeriod}
      >
        <MealCoverageDetails coverage={statsOfTeam.mealCoverage} className="p-2"/>
        <Flex direction="row" center className="gap-1 p-0.5">
          <CursorArrowRaysIcon className="size-6"/>
          <ChartBarIcon className="size-6"/>
        </Flex>
      </MealCoverageComboCollapsible>
      <TeamAnalysisSummary
        period="weekly"
        stats={statsOfTeam}
        snorlaxData={snorlaxData}
      />
    </>
  );
};
