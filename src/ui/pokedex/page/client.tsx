'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {PokemonBranches} from '@/ui/pokedex/page/branch/main';
import {PokemonEvolution} from '@/ui/pokedex/page/evolution/main';
import {PokemonMeta} from '@/ui/pokedex/page/meta/main';
import {PokemonProduction} from '@/ui/pokedex/page/production/main';
import {PokemonSleepStyles} from '@/ui/pokedex/page/sleepStyle/main';
import {PokemonDataCommonProps, PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonClient = (props: PokemonDataProps) => {
  const {pokemonBranch} = props;

  const serverData = useCommonServerData();
  const {serverConfigBundle} = serverData;

  const pokemonLinkPopup = usePokemonLinkPopup();
  const {data} = useSession();
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: data?.user.preloaded,
    },
    ...serverData,
  });

  const commonProps: PokemonDataCommonProps = {
    calculatedConfigBundle,
    ...props,
  };

  return (
    <>
      <PokemonLinkPopup {...pokemonLinkPopup}/>
      <PokemonMeta {...props}/>
      <AdsUnit/>
      <PokemonProduction session={data} {...commonProps}/>
      <AdsUnit/>
      <PokemonEvolution {...pokemonLinkPopup} {...props}/>
      {pokemonBranch && <AdsUnit/>}
      <PokemonBranches {...pokemonLinkPopup} {...props}/>
      <AdsUnit/>
      <PokemonSleepStyles {...commonProps}/>
    </>
  );
};
