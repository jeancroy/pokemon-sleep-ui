import React from 'react';

import {Dialog, Transition} from '@headlessui/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {Blur} from '@/components/static/blur';
import {NavListContent} from '@/ui/base/navbar/list/content';
import {NavListCommonProps} from '@/ui/base/navbar/list/type';


export const NavListLayout = ({open, setOpen}: NavListCommonProps) => {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-nav" onClose={setOpen}>
        <Blur/>
        <Transition.Child
          enter="duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className={clsx(
            'pointer-events-none fixed inset-y-0 left-0 flex w-full flex-row pr-10 transition ease-in-out',
          )}
        >
          <Dialog.Panel className="pointer-events-auto relative w-screen max-w-xs">
            <Flex noFullWidth className="absolute right-0 top-0 -mr-10 p-2">
              <button className="button-clickable" onClick={() => setOpen(false)}>
                <XMarkIcon className="size-6"/>
              </button>
            </Flex>
            <NavListContent/>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};
