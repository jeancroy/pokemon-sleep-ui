import React from 'react';

import {Transition} from '@headlessui/react';

import {CollapsibleMark} from '@/components/layout/collapsible/mark';
import {CollapsibleCommonProps} from '@/components/layout/collapsible/type';
import {getCollapsibleButtonStyle} from '@/components/layout/collapsible/utils';
import {Flex} from '@/components/layout/flex/common';


type Props = CollapsibleCommonProps & {
  classNameForHeight: string,
};

export const Collapsible = ({
  state,
  button,
  appear,
  noButtonPadding,
  disabled,
  classNameForHeight,
  children,
}: React.PropsWithChildren<Props>) => {
  const {show, setShow} = state;

  React.useEffect(() => {
    if (appear) {
      setShow(true);
    }
  }, []);

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
        className="border-common rounded-b-lg border-x border-b transition-spacing duration-300 ease-in-out"
      >
        <Transition.Child
          enterFrom="h-0"
          enterTo={classNameForHeight}
          leaveFrom={classNameForHeight}
          leaveTo="h-0"
          className="overflow-y-auto overflow-x-hidden transition-[height] duration-300 ease-in-out"
        >
          <Transition.Child
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="transition-opacity duration-300 ease-in-out"
          >
            {children}
          </Transition.Child>
        </Transition.Child>
      </Transition>
    </Flex>
  );
};
