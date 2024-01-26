import React from 'react';

import CodeBracketIcon from '@heroicons/react/24/outline/CodeBracketIcon';
import {clsx} from 'clsx';

import {OcrImporterProcessedImageCanvas} from '@/components/ocr/importer/controls/processed/canvas';
import {OcrImporterProcessedImageProps} from '@/components/ocr/importer/controls/processed/type';
import {PopupCommon} from '@/components/popup/common/main';


export const OcrImporterProcessedImage = ({processed}: OcrImporterProcessedImageProps) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <PopupCommon show={show} setShow={setShow}>
        <OcrImporterProcessedImageCanvas processed={processed}/>
      </PopupCommon>
      <button disabled={!processed} onClick={() => setShow(true)} className={clsx(
        'button-clickable-border disabled:button-disabled self-end p-1',
      )}>
        <CodeBracketIcon className="size-6"/>
      </button>
    </>
  );
};
