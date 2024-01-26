import React from 'react';

import DocumentMagnifyingGlassIcon from '@heroicons/react/24/outline/DocumentMagnifyingGlassIcon';

import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {Ocr} from '@/components/ocr/main';
import {OcrCommonProps} from '@/components/ocr/type';
import {PopupCommon} from '@/components/popup/common/main';
import {Dimension} from '@/types/style';


type Props<TData> = OcrCommonProps<TData> & {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  noFullWidth?: boolean,
  dimension?: Dimension,
};

export const OcrPopup = <TData, >({show, setShow, noFullWidth, dimension, ...props}: Props<TData>) => {
  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <Flex className="sm:w-[70vw]">
          <Ocr {...props}/>
        </Flex>
      </PopupCommon>
      <FlexButton
        className="button-clickable-bg gap-0.5 self-stretch px-1.5 py-1"
        onClick={() => setShow(true)}
        center
        noFullWidth={noFullWidth}
      >
        <DocumentMagnifyingGlassIcon className={dimension ?? 'size-8'}/>
        <div className="text-lg">
          OCR
        </div>
      </FlexButton>
    </>
  );
};
