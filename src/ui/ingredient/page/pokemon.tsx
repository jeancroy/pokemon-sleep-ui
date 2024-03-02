'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUserActivation} from '@/hooks/userData/activation';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {Ingredient} from '@/types/game/ingredient';
import {PokemonIngredientProduction} from '@/types/game/pokemon';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';


type Props = {
  ingredient: Ingredient,
  pokemonIngredientProduction: PokemonIngredientProduction[],
};

export const IngredientPokemonProduction = ({
  ingredient,
  pokemonIngredientProduction,
}: Props) => {
  const serverData = useCommonServerData();
  const {
    serverConfigBundle,
  } = serverData;

  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );
  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: data?.user.preloaded,
    },
    ...serverData,
  });

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        isPremium={isPremium}
        className="info-section"
      />
      <PokemonIngredientStats
        input={input}
        ingredient={ingredient}
        calculatedConfigBundle={calculatedConfigBundle}
        pokemonIngredientProduction={pokemonIngredientProduction}
        {...serverData}
      />
    </>
  );
};
