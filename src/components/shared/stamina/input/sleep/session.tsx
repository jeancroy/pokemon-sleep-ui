import React from 'react';

import ArrowRightCircleIcon from '@heroicons/react/24/outline/ArrowRightCircleIcon';
import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import MinusCircleIcon from '@heroicons/react/24/outline/MinusCircleIcon';
import PlayCircleIcon from '@heroicons/react/24/outline/PlayCircleIcon';
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon';
import StopCircleIcon from '@heroicons/react/24/outline/StopCircleIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {StaminaConfigSleepTime} from '@/components/shared/stamina/input/sleep/time';
import {StaminaConfigProps} from '@/components/shared/stamina/input/type';
import {noOp} from '@/const/noOp';
import {getToggleButtonClass} from '@/styles/input';
import {SleepSession} from '@/types/game/sleep';


type Props = StaminaConfigProps & {
  session: SleepSession,
  num: number,
} & ({
  onClick?: never,
  isActive?: never,
} | {
  onClick: () => void,
  isActive: boolean,
});

export const StaminaConfigSleepSession = (props: Props) => {
  const {
    bundle,
    session,
    num,
    onClick,
    isActive,
  } = props;
  const {sleepSession} = bundle.userConfig.stamina;
  const t = useTranslations('UI.Stamina');

  const times = sleepSession[session];
  const active = onClick ? isActive : true;

  return (
    <Flex direction="row" center className="items-stretch gap-1.5">
      <FlexButton disabled={!onClick} onClick={onClick ?? noOp} className={clsx(
        'group items-center rounded-lg px-2 py-1 md:rounded-full',
        onClick ? getToggleButtonClass(active) : 'button-toggle-active-bg',
      )}>
        <div className="relative size-6">
          {onClick ?
            (active ? <PlusCircleIcon/> : <MinusCircleIcon/>) :
            <ArrowRightCircleIcon/>}
        </div>
        <div className="relative size-6">
          <GenericIcon
            src="/images/generic/sleep.png"
            noWrap
            noInvert
            alt={t('SleepSchedule')}
            isActive={active}
          />
        </div>
        <div>
          {num}
        </div>
      </FlexButton>
      <Flex className="items-center gap-1.5 md:flex-row">
        <StaminaConfigSleepTime
          {...props}
          icon={<PlayCircleIcon className="size-7 shrink-0 md:hidden"/>}
          times={times}
          isActive={active}
          timing="start"
        />
        <ArrowRightIcon className="hidden size-5 shrink-0 md:block"/>
        <StaminaConfigSleepTime
          {...props}
          icon={<StopCircleIcon className="size-7 shrink-0 md:hidden"/>}
          times={times}
          isActive={active}
          timing="end"
        />
      </Flex>
    </Flex>
  );
};
