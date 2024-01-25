import React from 'react';

import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import {clsx} from 'clsx';

import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {FlexForm} from '@/components/layout/flex/form';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {ActivationCheckerState} from '@/ui/admin/activation/search/type';
import {ActivationUiCommonProps} from '@/ui/admin/activation/type';
import {ActivationKeyViewer} from '@/ui/admin/activation/viewer/main/key';


export const ActivationSearcher = (props: ActivationUiCommonProps) => {
  const {control} = props;
  const {actAsync, showActivation, status} = control;

  const [data, setData] = React.useState<ActivationCheckerState>({
    key: '',
    userId: '',
    notFound: false,
  });
  const {key, userId, notFound} = data;

  return (
    <FlexForm className="info-section" onSubmit={async () => {
      const {updated} = await actAsync({
        action: 'load',
        options: {type: 'adminActivationCheck', opts: {key, userId}},
      });

      const info = updated?.user.lazyLoaded.adminActivationCheck;
      if (!info) {
        setData((original) => ({...original, notFound: true}));
        return;
      }

      showActivation(info);
    }}>
      <div className="text-2xl">
        Activation Key Searcher
      </div>
      <InputRowWithTitle title="Key">
        <InputBox
          type="text"
          value={key}
          className="w-full"
          onChange={({target}) => setData((original) => ({
            ...original,
            key: target.value,
          } satisfies ActivationCheckerState))}
        />
      </InputRowWithTitle>
      <InputRowWithTitle title="User ID">
        <InputBox
          type="text"
          value={userId}
          className="w-full"
          onChange={({target}) => setData((original) => ({
            ...original,
            userId: target.value,
          } satisfies ActivationCheckerState))}
        />
      </InputRowWithTitle>
      <InputRow className="justify-end">
        <button type="submit" disabled={status !== 'waiting'} className={clsx(
          'button-clickable-bg disabled:button-disabled size-8 shrink-0 p-1',
        )}>
          <UserActionStatusIcon status={status} onWaitingOverride={<MagnifyingGlassIcon/>}/>
        </button>
      </InputRow>
      <AnimatedCollapseQuick show={notFound}>
        <Flex className="text-end text-red-600 dark:text-red-400">
          Activation not found
        </Flex>
      </AnimatedCollapseQuick>
      <AnimatedCollapse show>
        <ActivationKeyViewer {...props}/>
      </AnimatedCollapse>
    </FlexForm>
  );
};
