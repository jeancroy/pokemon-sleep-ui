import React from 'react';

import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {NextImageAutoHeight} from '@/components/shared/common/image/autoHeight';


type Props = {
  image: string | null,
};

export const OcrImporterImagePreview = ({image}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <Flex className="p-2 sm:w-[60vw]">
          {image && <NextImageAutoHeight src={image} alt="OCR"/>}
        </Flex>
      </PopupCommon>
      <button disabled={!image} onClick={() => setShow(true)} className={clsx(
        'button-clickable-border disabled:button-disabled self-end p-1',
      )}>
        <PhotoIcon className="h-6 w-6"/>
      </button>
    </>
  );
};
