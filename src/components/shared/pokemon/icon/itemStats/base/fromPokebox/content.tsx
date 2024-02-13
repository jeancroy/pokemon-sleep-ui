import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PokemonItemStatsFromPokeboxList} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/list';
import {
  PokemonItemStatsFromPokeboxCommonProps,
} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/type';
import {PremiumOnlyNotice} from '@/components/static/premium/notice';


type Props = PokemonItemStatsFromPokeboxCommonProps & {
  session: ReturnType<typeof useSession>,
};

export const PokemonItemStatsFromPokeboxContent = ({session, ...props}: Props) => {
  if (!session.data?.user.activation?.premium) {
    return (
      <Flex center className="info-highlight p-3">
        <PremiumOnlyNotice style="normal"/>
      </Flex>
    );
  }

  return <PokemonItemStatsFromPokeboxList {...props} reCalcDeps={[session]}/>;
};
