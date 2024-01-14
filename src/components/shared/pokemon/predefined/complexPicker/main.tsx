import React from 'react';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {OcrPokemonInfoImporter} from '@/components/ocr/importer/pokemonInfo/main';
import {PokeboxImporterButton} from '@/components/shared/pokebox/importer/button';
import {usePokemonComplexPickerFilter} from '@/components/shared/pokemon/predefined/complexPicker/hook';
import {PokemonComplexFilterCommonProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonCollapsibleFilter} from '@/components/shared/pokemon/predefined/filter';
import {PokemonCollapsiblePicker} from '@/components/shared/pokemon/predefined/picker';


export const PokemonComplexFilter = (props: PokemonComplexFilterCommonProps) => {
  const {
    pokemonList,
    pokedexMap,
    subSkillMap,
    ocrTranslations,
    onPokemonPicked,
  } = props;

  const {filter, setFilter, isIncluded} = usePokemonComplexPickerFilter({
    data: pokemonList,
    ...props,
  });
  const filterCollapsible = useCollapsible();
  const resultCollapsible = useCollapsible();

  React.useEffect(() => {
    resultCollapsible.setShow(true);
  }, [filter]);

  return (
    <Flex className="gap-1">
      <PokemonCollapsibleFilter
        collapsibleState={filterCollapsible}
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      <PokemonCollapsiblePicker
        collapsibleState={resultCollapsible}
        isIncluded={isIncluded}
        pokemonList={pokemonList}
        onPokemonPicked={(pokemon) => onPokemonPicked({origin: 'pokedex', pokemon})}
      />
      <Flex direction="row" center className="gap-1">
        <PokeboxImporterButton
          {...props}
          noFullWidth={false}
          onPokeboxPicked={(pokeInBox) => {
            const pokemon = pokedexMap[pokeInBox.pokemon];

            if (!pokemon) {
              return;
            }

            onPokemonPicked({...pokeInBox, origin: 'pokebox', pokemon});
          }}
        />
        <OcrPokemonInfoImporter
          ocrTranslations={ocrTranslations}
          onCompleteImport={(pokemonId, {subSkill, nature}) => {
            const pokemon = pokedexMap[pokemonId];

            if (!pokemon) {
              return;
            }

            onPokemonPicked({
              origin: 'ocr',
              pokemon,
              subSkill,
              nature,
            });
          }}
          subSkillMap={subSkillMap}
          noFullWidth={false}
        />
      </Flex>
    </Flex>
  );
};
