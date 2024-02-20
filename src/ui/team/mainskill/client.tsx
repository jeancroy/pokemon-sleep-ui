'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonLevelSliderRow} from '@/components/shared/pokemon/level/sliderRow';
import {PokemonLab} from '@/components/shared/pokemon/predefined/lab/main';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {useSkillTriggerAnalysisTargetState} from '@/ui/team/mainskill/state/hook';
import {SkillTriggerAnalysisTargets} from '@/ui/team/mainskill/targets/main';
import {
  SkillTriggerAnalysisDataProps,
  SkillTriggerAnalysisServerDataProps,
  SkillTriggerOnDeskState,
} from '@/ui/team/mainskill/type';
import {toSkillTriggerAnalysisUnit} from '@/ui/team/mainskill/utils';
import {getPokemonMaxEvolutionCount} from '@/utils/game/pokemon/evolution/count';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const SkillTriggerAnalysisClient = (props: SkillTriggerAnalysisServerDataProps) => {
  const {
    pokedexMap,
    pokemonMaxLevel,
    preloaded,
  } = props;

  const {data: session} = useSession();
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: session?.user.preloaded,
    },
    ...props,
  });
  const stateControl = useSkillTriggerAnalysisTargetState();

  const {setBase} = stateControl;

  const pokemonList = toPokemonList(pokedexMap);
  const data: SkillTriggerAnalysisDataProps = {
    pokemonList,
    maxEvolutionCount: getPokemonMaxEvolutionCount(pokemonList),
    calculatedConfigBundle,
    ...props,
  };

  return (
    <PokemonLab
      {...data}
      onPokemonPicked={(setup) => setBase({
        unit: toSkillTriggerAnalysisUnit(setup),
        clearTarget: true,
      })}
      onRun={(setup: SkillTriggerOnDeskState) => setBase({
        unit: toSkillTriggerAnalysisUnit(setup),
        clearTarget: false,
      })}
      toState={(onDeskState) => ({...onDeskState, level: 1})}
      immediateUpdate
      renderResult={({pokemon}) => (
        <SkillTriggerAnalysisTargets
          {...data}
          selectedPokemon={pokemon}
          stateControl={stateControl}
        />
      )}
      renderAdditional={({level}, setOnDesk) => (
        <PokemonLevelSliderRow
          max={pokemonMaxLevel}
          value={level}
          setValue={(level) => setOnDesk((original) => ({...original, level}))}
        />
      )}
    />
  );
};
