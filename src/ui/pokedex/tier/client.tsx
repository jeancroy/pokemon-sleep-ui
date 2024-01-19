'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {LazyLoad} from '@/components/layout/lazyLoad';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {useUserActivation} from '@/hooks/userData/activation';
import {usePokedexCalc} from '@/ui/pokedex/common/calc/main';
import {usePokedexTierListInput} from '@/ui/pokedex/tier/input/hook';
import {PokedexTierListInputUI} from '@/ui/pokedex/tier/input/main';
import {PokedexTierListResult} from '@/ui/pokedex/tier/result/main';
import {PokedexTierListDataProps} from '@/ui/pokedex/tier/type';


export const PokedexTierListClient = (props: PokedexTierListDataProps) => {
  const {data} = useSession();
  const {isPremium} = useUserActivation(data);
  const inputControls = usePokedexTierListInput(props);
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
    filter: input.filter,
    isPokemonIncluded: isIncluded,
    setLoading,
    ...props,
  });

  const t = useTranslations('UI.InPage.Pokedex.Tier');

  return (
    <Flex className="gap-1.5">
      <AdsUnit/>
      <Flex className="rounded-lg p-1.5 shadow-border-inner dark:shadow-slate-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown">
          {t('Tips')}
        </ReactMarkdown>
      </Flex>
      <PokedexTierListInputUI
        isPremium={isPremium}
        input={input}
        setInput={setInput}
        {...props}
      />
      <CompletionResultUI completed={count.selected} total={count.total} className="self-end"/>
      <LazyLoad loading={loading}>
        <PokedexTierListResult input={input} sortedData={result}/>
      </LazyLoad>
      <AdsUnit/>
    </Flex>
  );
};
