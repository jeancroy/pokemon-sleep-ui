import React from 'react';

import {Transition} from '@headlessui/react';
import {clsx} from 'clsx';

import {CollapsibleMark} from '@/components/layout/collapsible/mark';
import {CollapsibleCommonProps} from '@/components/layout/collapsible/type';
import {getCollapsibleButtonStyle} from '@/components/layout/collapsible/utils';
import {Flex} from '@/components/layout/flex/common';


type Props = CollapsibleCommonProps & {
  classDuration?: `duration-${number}`,
  classDelay?: `delay-${number}`,
  classBorder?: `border-${string}`,
};

export const CollapsibleFull = ({
  state,
  button,
  appear,
  noButtonPadding,
  disabled,
  classDuration,
  classDelay,
  classBorder,
  children,
}: React.PropsWithChildren<Props>) => {
  const {show, setShow} = state;

  React.useEffect(() => {
    if (appear) {
      setShow(true);
    }
  }, []);

  const duration = classDuration ?? 'duration-1000';
  const delay = classDelay ?? 'delay-300';

  return (
    <Flex>
      <button
        type="button"
        onClick={() => setShow(!show)}
        disabled={disabled}
        className={getCollapsibleButtonStyle(noButtonPadding)}
      >
        <CollapsibleMark show={show}/>
        {button}
      </button>
      <Transition
        show={show}
        enterFrom="p-0"
        enterTo="p-1"
        leaveFrom="p-1"
        leaveTo="p-0"
        className={clsx(
          'rounded-b-lg border-x border-b transition-spacing duration-300 ease-in-out',
          classBorder ?? 'border-common',
        )}
      >
        <Transition.Child
          appear={appear}
          enter={duration}
          enterFrom="grid-rows-[0fr]"
          enterTo="grid-rows-[1fr]"
          leave={duration}
          leaveFrom="grid-rows-[1fr]"
          leaveTo="grid-rows-[0fr]"
          className="grid w-full transition-[grid-template-rows] ease-in-out"
        >
          <Transition.Child
            enter={`${delay} ${duration}`}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={duration}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="overflow-hidden transition-opacity ease-in-out"
          >
            {children}
          </Transition.Child>
        </Transition.Child>
      </Transition>
    </Flex>
  );
};
