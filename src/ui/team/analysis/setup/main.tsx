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
import {TeamSetupControlUI} from '@/components/shared/team/setupControl/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useIngredientIdsFromMeals} from '@/hooks/ingredient/ingredientIds';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {teamAnalysisSlotName} from '@/types/website/feature/teamAnalysis';
import {useTeamProduction} from '@/ui/team/analysis/calc/hook';
import {TeamAnalysisMemberView} from '@/ui/team/analysis/setup/members';
import {TeamAnalysisSummary} from '@/ui/team/analysis/setup/summary/main';
import {TeamAnalysisSetupViewCommonProps} from '@/ui/team/analysis/setup/type';
import {generateTeamAnalysisComp} from '@/ui/team/analysis/utils';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisSetupView = (props: TeamAnalysisSetupViewCommonProps) => {
  const {
    setupControl,
    snorlaxData,
  } = props;
  const {
    setup,
    currentCalculatedConfigBundle,
    currentTeam,
  } = setupControl;

  const serverData = useCommonServerData();
  const {mealMap} = serverData;

  const {bundle, calculatedCookingConfig} = currentCalculatedConfigBundle;
  const statsOfTeam = useTeamProduction({
    ...props,
    ...serverData,
    currentTeam,
    setup,
    bundle,
    calculatedCookingConfig,
  });
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const collapsible = useCollapsibleControl();

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);
  const ingredientIds = useIngredientIdsFromMeals(meals);

  if (!statsOfTeam) {
    return <Loading text="Worker"/>;
  }

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamSetupControlUI
        generateNewTeam={(uuid) => generateTeamAnalysisComp({uuid, bundle})}
        uploadOpts={{
          type: 'teamAnalysis',
          data: {
            config: setup.config,
            comps: Object.values(setup.teams),
          },
        }}
        getMemberList={(team) => Object.values(team.members)}
        mealTypes={mealTypes}
        ingredientIds={ingredientIds}
        hideManualStaminaSkillRecovery
        {...props}
      />
      <AdsUnit hideIfNotBlocked/>
      <TeamAnalysisMemberView
        showPokemon={showPokemon}
        calculatedCookingConfig={calculatedCookingConfig}
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
