'use client';
import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';
import {useSleepdexLookupDataCalcWorker} from '@/ui/sleepStyle/sleepdex/lookup/calc/main';
import {useSleepdexLookupFilter} from '@/ui/sleepStyle/sleepdex/lookup/filter/hook';
import {SleepdexLookupInput} from '@/ui/sleepStyle/sleepdex/lookup/filter/main';
import {SleepdexLookupResult} from '@/ui/sleepStyle/sleepdex/lookup/result/main';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';
import {showToast} from '@/utils/toast';


export const SleepdexLookupClient = (props: SleepdexLookupServerDataProps) => {
  const [loading, setLoading] = React.useState(false);
  const t = useTranslations('UI.SleepStyle');
  const {data: session} = useSession();
  const {isPremium} = useUserActivation(session);
  const {showPremiumRequiredToast} = usePremiumRequiredToast();
  const {
    data,
    filter,
    setFilter,
    isIncluded,
  } = useSleepdexLookupFilter({
    ...props,
    isPremium,
    showPremiumRequired: showPremiumRequiredToast,
    showMapToast: () => showToast({
      isAlert: false,
      content: t('Message.ChooseMapFirst'),
    }),
  });
  const dataProcessed = useSleepdexLookupDataCalcWorker({
    workerOpts: {
      entries: data,
      isIncluded,
      sort: filter.sort,
    },
    setLoading,
  });

  return (
    <Flex className="gap-1.5">
      <SleepdexLookupInput
        filter={filter}
        setFilter={setFilter}
        isPremium={isPremium}
        session={session}
        {...props}
      />
      <CompletionResultUI
        completed={dataProcessed.length}
        total={data.length}
        className="self-end"
      />
      <SleepdexLookupResult
        dataToShow={dataProcessed}
        loading={loading}
        display={filter.display}
        {...props}
      />
    </Flex>
  );
};
