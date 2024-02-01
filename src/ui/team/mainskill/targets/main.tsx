import React from 'react';

import {clsx} from 'clsx';

import {AdsUnit} from '@/components/ads/main';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {PokemonCollapsiblePicker} from '@/components/shared/pokemon/predefined/picker';
import {PokemonInfo} from '@/types/game/pokemon';
import {UseSkillTriggerAnalysisTargetStateReturn} from '@/ui/team/mainskill/state/type';
import {useSkillTriggerAnalysisCalculated} from '@/ui/team/mainskill/targets/calc';
import {SkillTriggerAnalysisTargetControl} from '@/ui/team/mainskill/targets/control';
import {SkillTriggerAnalysisTarget} from '@/ui/team/mainskill/targets/target';
import {SkillTriggerAnalysisCommonProps} from '@/ui/team/mainskill/targets/type';
import {toSkillTriggerAnalysisUnitFromPokeInBox} from '@/ui/team/mainskill/targets/utils';


type Props = SkillTriggerAnalysisCommonProps & {
  selectedPokemon: PokemonInfo,
  stateControl: UseSkillTriggerAnalysisTargetStateReturn,
};

export const SkillTriggerAnalysisTargets = (props: Props) => {
  const {
    pokedexMap,
    ingredientChainMap,
    pokemonList,
    selectedPokemon,
    stateControl,
  } = props;

  const {
    state,
    createUnit,
    createUnitDirect,
    updateUnit,
    deleteUnit,
    copyUnit,
  } = stateControl;

  const collapsiblePicker = useCollapsibleControl();

  const {units, sort} = useSkillTriggerAnalysisCalculated({
    ...props,
    state,
  });

  return (
    <Flex className="gap-1.5">
      <AdsUnit/>
      <Flex className="gap-1.5 lg:flex-col-reverse">
        <PokemonCollapsiblePicker
          pokemonList={pokemonList}
          collapsibleState={collapsiblePicker}
          isIncluded={Object.fromEntries(pokemonList.map(({id, skill}) => [
            id, selectedPokemon.skill === skill,
          ]))}
          onPokemonPicked={(pokemon) => {
            const chain = ingredientChainMap[pokemon.ingredientChain];

            if (!chain) {
              return;
            }

            createUnit({pokemon, chain});
          }}
          classNameForHeight="h-80 md:h-60 lg:h-40"
        />
        <SkillTriggerAnalysisTargetControl
          disableSort={!units.length}
          onSort={sort}
          onPokeInBoxPicked={(pokeInBox) => (
            createUnitDirect(toSkillTriggerAnalysisUnitFromPokeInBox(pokeInBox))
          )}
          isPokeInBoxIncluded={(pokeInBox) => (
            pokedexMap[pokeInBox.pokemon]?.skill === selectedPokemon.skill
          )}
          {...props}
        />
        <Grid className={clsx(
          'grid-cols-1 gap-1.5 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6',
        )}>
          {units.map((unit) => {
            const {id, pokemonId} = unit;
            const pokemon = pokedexMap[pokemonId];

            if (!pokemon) {
              return null;
            }

            return (
              <SkillTriggerAnalysisTarget
                {...props}
                key={id}
                pokemon={pokemon}
                unit={unit}
                updateUnit={(update) => updateUnit(id, update)}
                deleteUnit={() => deleteUnit(id)}
                copyUnit={() => copyUnit(id)}
              />
            );
          })}
        </Grid>
      </Flex>
    </Flex>
  );
};
