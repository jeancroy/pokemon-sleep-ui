'use client';
import React from 'react';

import {useSession} from 'next-auth/react';

import {PokemonIngredientStats} from '@/components/shared/pokemon/icon/itemStats/ingredient';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {useUserActivation} from '@/hooks/userData/activation';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {Ingredient} from '@/types/game/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {IngredientProductionDataProps} from '@/ui/ingredient/page/type';


type Props = IngredientProductionDataProps & {
  pokemonMaxLevel: number,
  ingredient: Ingredient,
};

export const IngredientPokemonProduction = ({
  preloaded,
  pokemonMaxLevel,
  subSkillMap,
  ingredient,
  ...props
}: Props) => {
  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );
  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const {translatedSettings, bundle} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    ...props,
  });

  return (
    <>
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        maxLevel={pokemonMaxLevel}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
        className="info-section"
      />
      <PokemonIngredientStats
        input={input}
        ingredient={ingredient}
        bundle={bundle}
        translatedSettings={translatedSettings}
        subSkillMap={subSkillMap}
        {...props}
      />
    </>
  );
};
