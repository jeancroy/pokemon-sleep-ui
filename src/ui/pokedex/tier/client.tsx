'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {MarkdownContent} from '@/components/markdown/main';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUserActivation} from '@/hooks/userData/activation';
import {usePokedexCalc} from '@/ui/pokedex/common/calc/main';
import {usePokedexTierListInput} from '@/ui/pokedex/tier/input/hook';
import {PokedexTierListInputUI} from '@/ui/pokedex/tier/input/main';
import {PokedexTierListResult} from '@/ui/pokedex/tier/result/main';
import {toPokemonList} from '@/utils/game/pokemon/utils';


export const PokedexTierListClient = () => {
  const serverData = useCommonServerData();
  const {pokedexMap} = serverData;

  const pokemonList = toPokemonList(pokedexMap);

  const {data: session} = useSession();
  const {isPremium} = useUserActivation(session);
  const inputControls = usePokedexTierListInput({
    pokemonList,
    ...serverData,
  });
  const {
    filter: input,
    setFilter: setInput,
    isIncluded,
  } = inputControls;
  const [loading, setLoading] = React.useState(false);
  const {
    result,
    count,
  } = usePokedexCalc({
    session,
    filter: input.filter,
    isPokemonIncluded: isIncluded,
    setLoading,
    pokemonList,
    ...serverData,
  });

  const t = useTranslations('UI.InPage.Pokedex.Tier');

  return (
    <Flex className="gap-1.5">
      <MarkdownContent className="info-highlight p-1.5">
        {t('Tips')}
      </MarkdownContent>
      <PokedexTierListInputUI
        pokemonList={pokemonList}
        isPremium={isPremium}
        input={input}
        setInput={setInput}
      />
      <CompletionResultUI completed={count.selected} total={count.total} className="self-end"/>
      <AdsUnit hideIfNotBlocked/>
      <LazyLoad loading={loading}>
        <PokedexTierListResult input={input} sortedData={result}/>
      </LazyLoad>
    </Flex>
  );
};
