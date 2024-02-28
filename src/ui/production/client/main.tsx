'use client';
import React from 'react';

import {v4} from 'uuid';

import {AdsUnit} from '@/components/ads/main';
import {Loading} from '@/components/icons/loading';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useTeamSetupControl} from '@/components/shared/team/setupControl/hook';
import {TeamSetupControlUI} from '@/components/shared/team/setupControl/main';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {ProductionComparisonPreset} from '@/types/productionComparison';
import {useProductionComparisonPresetStats} from '@/ui/production/calc/hook';
import {ProductionComparisonTargets} from '@/ui/production/client/targets';
import {ProductionComparisonSetupControl} from '@/ui/production/client/type';
import {ProductionComparisonDataProps} from '@/ui/production/type';
import {generateNewProductionComparisonPreset, getInitialProductionComparisonSetup} from '@/ui/production/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';


export const ProductionComparisonClient = (props: ProductionComparisonDataProps) => {
  const {preloaded, pokedexMap} = props;

  const actorReturn = useUserDataActor();
  const {session} = actorReturn;

  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: preloaded.bundle,
      client: session?.data?.user.preloaded,
    },
    ...props,
  });
  const {bundle, calculatedCookingConfig} = calculatedConfigBundle;

  const {state, setState, showPokemon} = usePokemonLinkPopup();

  const setupControl: ProductionComparisonSetupControl = useTeamSetupControl({
    initialMigratedSetup: getInitialProductionComparisonSetup({
      data: preloaded.setup,
      defaultCookingTarget: bundle.cookingConfig.target,
    }),
    getDuplicatedMember: (_, source) => {
      const newUuid = v4();

      return {key: newUuid, member: {...source, uuid: newUuid}};
    },
    getLayoutCollapsibleIndexKeys: (team) => Object.keys(team.members),
  });
  const {setup} = setupControl;

  const currentPreset: ProductionComparisonPreset = getCurrentTeam({setup});

  const presetStats = useProductionComparisonPresetStats({
    snorlaxFavorite: currentPreset.snorlaxFavorite,
    bundle,
    calculatedCookingConfig,
    currentPreset,
    ...props,
  });

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
        currentTeam={currentPreset}
        pokemonList={pokemonList}
        generateNewTeam={(uuid) => generateNewProductionComparisonPreset({
          uuid,
          cookingTarget: bundle.cookingConfig.target,
        })}
        uploadOpts={{
          type: 'productionComparison',
          data: {
            config: setup.config,
            presets: Object.values(setup.teams),
          },
        }}
        getMemberList={(team) => Object.values(team.members)}
        {...props}
      />
      <AdsUnit hideIfNotBlocked/>
      <ProductionComparisonTargets
        maxEvolutionCount={getPokemonMaxEvolutionCount(pokemonList)}
        calculatedConfigBundle={calculatedConfigBundle}
        presetStats={presetStats}
        actorReturn={actorReturn}
        setupControl={setupControl}
        currentPreset={currentPreset}
        showPokemon={showPokemon}
        {...props}
      />
      <AdsUnit/>
      {/* Gap for toast to show on Pokemon addition without blocking the view */}
      <div className="h-40"/>
    </>
  );
};
