import React from 'react';

import CursorArrowRaysIcon from '@heroicons/react/24/outline/CursorArrowRaysIcon';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {MealCoverageDetails} from '@/components/shared/meal/coverage/details/main';
import {MealCoverageTargetComboCollapsible} from '@/components/shared/meal/coverage/targetCombo/collapsible';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokemonGroupedProduction} from '@/components/shared/pokemon/production/grouped/main';
import {TeamContributionSplitIndicator} from '@/components/shared/team/contributionSplit/main';
import {useUserSettingsBundle} from '@/hooks/userData/bundle';
import {useCookingUserSettings} from '@/hooks/userData/cookingSettings';
import {teamAnalysisSlotName} from '@/types/teamAnalysis';
import {UserSettingsBundle} from '@/types/userData/settings';
import {getTeamProducingStats} from '@/ui/team/analysis/calc/main';
import {TeamAnalysisSetupControl} from '@/ui/team/analysis/setup/control';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisTeamView} from '@/ui/team/analysis/setup/team/main';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {DeepPartial, isNotNullish} from '@/utils/type';


type Props = TeamAnalysisDataProps & Omit<TeamAnalysisFilledProps, 'showPokemon' | 'bundle' | 'cookingSettings'> & {
  bundleFromClient: DeepPartial<UserSettingsBundle> | undefined,
};

export const TeamAnalysisSetupView = (props: Props) => {
  const {
    currentTeam,
    setup,
    setSetup,
    snorlaxData,
    mealMap,
    preloaded,
    bundleFromClient,
  } = props;

  const bundle = useUserSettingsBundle({
    bundle: {
      server: preloaded,
      client: bundleFromClient,
    },
  });

  const cookingSettings = useCookingUserSettings({...bundle, mealMap});

  const statsOfTeam = getTeamProducingStats({
    ...props,
    bundle,
    cookingSettings,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamAnalysisTeamView
        showPokemon={showPokemon}
        statsOfTeam={statsOfTeam}
        bundle={bundle}
        cookingSettings={cookingSettings}
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
            production: statsOfTeam.bySlot[slotName]?.total.energy ?? 0,
          };
        }).filter(isNotNullish)}
      />
      <TeamAnalysisSetupControl
        setup={setup}
        setSetup={setSetup}
        currentTeam={currentTeam}
      />
      <AdsUnit/>
      <PokemonGroupedProduction grouped={statsOfTeam.grouped}/>
      <MealCoverageTargetComboCollapsible
        mealMap={mealMap}
        ingredientProduction={Object.fromEntries(
          Object.entries(statsOfTeam.grouped.ingredient)
            .map(([id, rate]) => [id, rate?.quantity ?? 0]),
        )}
        period={currentTeam.analysisPeriod}
      >
        <MealCoverageDetails coverage={statsOfTeam.mealCoverage} className="p-2"/>
        <Flex direction="row" center className="gap-1 p-0.5">
          <CursorArrowRaysIcon className="h-6 w-6"/>
          <ChartBarIcon className="h-6 w-6"/>
        </Flex>
      </MealCoverageTargetComboCollapsible>
      <TeamAnalysisSummary
        period="weekly"
        stats={statsOfTeam}
        snorlaxData={snorlaxData}
      />
      <AdsUnit/>
    </>
  );
};
