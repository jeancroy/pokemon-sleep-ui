'use client';
import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useProducingParams} from '@/ui/info/production/client/hook';
import {ProducingParamsInput} from '@/ui/info/production/client/input';
import {ProducingParamsSingle} from '@/ui/info/production/client/single';
import {ProducingParamsDataProps} from '@/ui/info/production/type';


export const ProducingParamsClient = (props: ProducingParamsDataProps) => {
  const {state, setState, showPokemon} = usePokemonLinkPopup();
  const {
    filter,
    setFilter,
    pokemonResult,
    maximum,
  } = useProducingParams(props);

  return (
    <Flex className="gap-2">
      <PokemonLinkPopup state={state} setState={setState}/>
      <ProducingParamsInput
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
      <AdsUnit hideIfNotBlocked/>
      <Grid className="grid-cols-1 gap-1.5 text-sm sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
        {pokemonResult.map(({pokemonInfo, params, show}) => ((
          <ProducingParamsSingle
            key={pokemonInfo.id}
            pokemonInfo={pokemonInfo}
            params={params}
            maximum={maximum}
            show={show}
            onPokemonClicked={() => showPokemon(pokemonInfo)}
          />
        )))}
      </Grid>
    </Flex>
  );
};
