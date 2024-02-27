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
import {useTeamLayoutControl} from '@/components/shared/team/setupControl/layoutControl/hook';
import {TeamSetupControlUI} from '@/components/shared/team/setupControl/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {
  teamAnalysisSlotName,
} from '@/types/teamAnalysis';
import {useTeamProducingStats} from '@/ui/team/analysis/calc/hook';
import {TeamAnalysisSetupUpdateCommonProps} from '@/ui/team/analysis/setup/control/type';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisSetupViewCommonProps} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {generateEmptyTeam} from '@/ui/team/analysis/utils';
import {isNotNullish} from '@/utils/type';


type Props = TeamAnalysisDataProps & TeamAnalysisSetupUpdateCommonProps & TeamAnalysisSetupViewCommonProps;

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    currentTeam,
    setupControl,
    snorlaxData,
    mealMap,
    preloaded,
    session,
  } = props;
  const {setup} = setupControl;

  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: session?.data?.user.preloaded,
    },
    ...props,
  });
  const {bundle, calculatedCookingConfig} = calculatedConfigBundle;
  const statsOfTeam = useTeamProducingStats({
    ...props,
    setup,
    bundle,
    calculatedCookingConfig,
  });
  const layoutControl = useTeamLayoutControl({
    setup,
    getCollapsibleIndexKeys: () => [...teamAnalysisSlotName],
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const collapsible = useCollapsibleControl();

  if (!statsOfTeam) {
    return <Loading text="Worker"/>;
  }

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamSetupControlUI
        layoutControl={layoutControl}
        generateNewTeam={generateEmptyTeam}
        uploadOpts={{
          type: 'teamAnalysis',
          data: {
            config: setup.config,
            comps: Object.values(setup.teams),
          },
        }}
        {...props}
      />
      <AdsUnit hideIfNotBlocked/>
      <TeamAnalysisTeamView
        showPokemon={showPokemon}
        calculatedCookingConfig={calculatedCookingConfig}
        layoutControl={layoutControl}
        statsOfTeam={statsOfTeam}
        bundle={bundle}
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
      <PokemonGroupedProduction grouped={statsOfTeam.grouped}/>
      <AdsUnit/>
      <MealCoverageComboCollapsible
        collapsible={collapsible}
        mealMap={mealMap}
        ingredientProduction={Object.fromEntries(
          Object.entries(statsOfTeam.grouped.ingredient)
            .map(([id, rate]) => [id, rate?.qty ?? 0]),
        )}
        actualPotCapacity={calculatedCookingConfig.actualPotCapacity}
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
