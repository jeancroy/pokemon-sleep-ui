'use client';
import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Loading} from '@/components/icons/loading';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useTeamSetupControl} from '@/components/shared/team/setupControl/hook';
import {TeamSetupControlUI} from '@/components/shared/team/setupControl/main';
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
  const {
    preloaded,
    pokedexMap,
    mealMap,
  } = props;

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const setupControl: ProductionComparisonSetupControl = useTeamSetupControl({
    bundleFromServer: preloaded.bundle,
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
  });
  const {
    setup,
    actorReturn,
    currentTeam,
    currentCalculatedConfigBundle,
  } = setupControl;
  const {bundle, calculatedCookingConfig} = currentCalculatedConfigBundle;

  const presetStats = useProductionComparisonPresetStats({
    bundle,
    calculatedCookingConfig,
    currentPreset: currentTeam,
    ...props,
  });

  const meals = Object.values(mealMap).filter(isNotNullish);
  const mealTypes = usePossibleMealTypes(meals);
  const ingredientIds = useIngredientIdsFromMeals(meals);
  const pokemonList = toPokemonList(pokedexMap);

  if (!presetStats) {
    return <Loading text="Worker"/>;
  }

  return (
    <>
      <PokemonLinkPopup state={state} setState={setState}/>
      <TeamSetupControlUI
        actorReturn={actorReturn}
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
      <AdsUnit hideIfNotBlocked/>
      <ProductionComparisonTargets
        maxEvolutionCount={getPokemonMaxEvolutionCount(pokemonList)}
        calculatedConfigBundle={currentCalculatedConfigBundle}
        presetStats={presetStats}
        actorReturn={actorReturn}
        setupControl={setupControl}
        currentPreset={currentTeam}
        showPokemon={showPokemon}
        {...props}
      />
      <AdsUnit/>
      {/* Gap for toast to show on Pokemon addition without blocking the view */}
      <div className="h-40"/>
    </>
  );
};
