'use client';
import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Loading} from '@/components/icons/loading';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {TeamMemberProductionSortingBasisInput} from '@/components/shared/team/productionSort/input/main';
import {useTeamSetupControl} from '@/components/shared/team/setupControl/hook';
import {TeamSetupControlUI} from '@/components/shared/team/setupControl/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useIngredientIdsFromMeals} from '@/hooks/ingredient/ingredientIds';
import {usePossibleMealTypes} from '@/hooks/meal/mealTypes';
import {useProductionComparisonPresetStats} from '@/ui/production/calc/hook';
import {ProductionComparisonTargets} from '@/ui/production/client/targets';
import {ProductionComparisonSetupControl} from '@/ui/production/client/type';
import {ProductionComparisonDataProps} from '@/ui/production/type';
import {generateNewProductionComparisonPreset, getInitialProductionComparisonSetup} from '@/ui/production/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {isNotNullish} from '@/utils/type';


export const ProductionComparisonClient = (props: ProductionComparisonDataProps) => {
  const {preloaded} = props;

  const serverData = useCommonServerData();
  const {pokedexMap, mealMap} = serverData;

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const setupControl: ProductionComparisonSetupControl = useTeamSetupControl({
    initialMigratedSetup: getInitialProductionComparisonSetup({
      data: preloaded.setup,
      defaultBundle: preloaded.bundle,
    }),
    getDuplicatedMember: (_, source) => {
      const newUuid = v4();

      return {key: newUuid, member: {...source, uuid: newUuid}};
    },
    getLayoutCollapsibleIndexKeys: (team) => Object.keys(team.members),
    ...props,
    ...serverData,
  });
  const {
    setup,
    actorReturn,
    premiumInputControl,
    currentTeam,
    currentCalculatedConfigBundle,
    setCurrentTeam,
  } = setupControl;
  const {isPremium, isInputChangeRestricted} = premiumInputControl;
  const {bundle, calculatedCookingConfig} = currentCalculatedConfigBundle;

  const presetStats = useProductionComparisonPresetStats({
    bundle,
    calculatedCookingConfig,
    currentPreset: currentTeam,
    ...serverData,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);
  const ingredientIds = useIngredientIdsFromMeals(meals);
  const pokemonList = toPokemonList(pokedexMap);

  if (!presetStats) {
    return <Loading text="Worker"/>;
  }

  return (
    <Flex className="gap-1">
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamSetupControlUI
        setupControl={setupControl}
        pokemonList={pokemonList}
        generateNewTeam={(uuid) => generateNewProductionComparisonPreset({uuid, bundle})}
        uploadOpts={{
          type: 'productionComparison',
          data: {
            config: setup.config,
            presets: Object.values(setup.teams),
          },
        }}
        getMemberList={(team) => Object.values(team.members)}
        mealTypes={mealTypes}
        ingredientIds={ingredientIds}
        {...props}
      />
      <TeamMemberProductionSortingBasisInput
        isPremium={isPremium}
        {...getSingleSelectOnClickProps({
          filter: currentTeam,
          setFilter: setCurrentTeam,
          filterKey: 'sort',
          isAllowed: () => !isInputChangeRestricted(),
        })}
      />
      <AdsUnit hideIfNotBlocked/>
      <ProductionComparisonTargets
        maxEvolutionCount={getPokemonMaxEvolutionCount(pokemonList)}
        calculatedConfigBundle={currentCalculatedConfigBundle}
        presetStats={presetStats}
        actorReturn={actorReturn}
        setupControl={setupControl}
        showPokemon={showPokemon}
        {...props}
      />
      <AdsUnit/>
      {/* Gap for toast to show on Pokemon addition without blocking the view */}
      <div className="h-40"/>
    </Flex>
  );
};
