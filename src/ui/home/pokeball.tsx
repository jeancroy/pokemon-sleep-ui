import React from 'react';

import {Transition} from '@headlessui/react';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {imageIconSizes} from '@/styles/image';


const generatePokeballType = () => {
  return Math.floor(Math.random() * 1000 % 4) + 1;
};

export const HomePokeball = () => {
  const [type, setType] = React.useState(generatePokeballType());
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    if (show) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setType(generatePokeballType());
      setShow(true);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [show]);

  return (
    <Flex center>
      <div className="relative">
        <div className="absolute bottom-0 right-0 z-10">
          <button className="button-clickable-bg p-1" onClick={() => setShow(false)} disabled={!show}>
            <ArrowPathIcon className="size-4"/>
          </button>
        </div>
        <Transition
          show={show}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="relative size-28"
        >
          <NextImage src={`/images/rank/${type}.png`} alt="?" sizes={imageIconSizes} className="transform-gpu"/>
        </Transition>
      </div>
    </Flex>
  );
};
