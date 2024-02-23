import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonBerryStats} from '@/components/shared/pokemon/icon/itemStats/berry';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {useUserActivation} from '@/hooks/userData/activation';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {BerryPageDataProps} from '@/ui/berry/page/type';


export const BerryProductionsOfPokemon = ({
  preloaded,
  ...props
}: BerryPageDataProps) => {
  const {berryData, subSkillMap} = props;

  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    ...props,
  });
  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        maxLevel={berryData.energy.length}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="info-section"
      />
      <PokemonBerryStats
        input={input}
        calculatedConfigBundle={calculatedConfigBundle}
        {...props}
      />
    </>
  );
};
