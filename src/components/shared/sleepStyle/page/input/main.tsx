import React from 'react';

import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {MapInputDisplayType} from '@/components/shared/sleepStyle/page/input/displayType';
import {MapInputMarkSleepdexToggle} from '@/components/shared/sleepStyle/page/input/markSleepdex';
import {MapInputSleepStyleToggle} from '@/components/shared/sleepStyle/page/input/styleIndex';
import {MapInputEmptyRankToggle} from '@/components/shared/sleepStyle/page/input/toggleOfEmptyRank';
import {MapInputLockedOnlyToggle} from '@/components/shared/sleepStyle/page/input/toggleOfLockedOnly';
import {MapInputSleepdexStatsToggle} from '@/components/shared/sleepStyle/page/input/toggleOfSleepdexStats';
import {MapInputWithDataProps} from '@/components/shared/sleepStyle/page/input/type';
import {toUnique} from '@/utils/array';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const MapInfoInput = (props: MapInputWithDataProps) => {
  const {
    filter,
    setFilter,
    pokedexMap,
    sleepStyles,
  } = props;

  return (
    <Flex className="gap-1">
      <PokemonFilter
        pokemonList={toPokemonList(pokedexMap)}
        {...props}
      />
      <MapInputSleepStyleToggle
        sleepStyles={toUnique(sleepStyles.map(({style}) => style.style))}
        filter={filter}
        setFilter={setFilter}
      />
      <MapInputDisplayType filter={filter} setFilter={setFilter}/>
      <InputRow className="justify-end gap-1.5">
        <MapInputMarkSleepdexToggle {...props}/>
        <MapInputSleepdexStatsToggle {...props}/>
        <MapInputLockedOnlyToggle {...props}/>
        <MapInputEmptyRankToggle filter={filter} setFilter={setFilter}/>
      </InputRow>
    </Flex>
  );
};
