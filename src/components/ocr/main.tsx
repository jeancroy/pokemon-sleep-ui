import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {InputFileImageOnly} from '@/components/input/file/image';
import {FilterTextInput} from '@/components/input/filter/text';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {Flex} from '@/components/layout/flex';
import {FlexButton} from '@/components/layout/flexButton';
import {ocrStatusToI18nId} from '@/components/ocr/const';
import {useOcr} from '@/components/ocr/hook';
import {OcrCommonProps} from '@/components/ocr/type';
import {ProgressBar} from '@/components/progressBar';
import {NextImage} from '@/components/shared/common/image/main';
import {localeName} from '@/const/website';
import {OcrLocale, ocrLocale} from '@/types/ocr/locale';
import {formatFloat} from '@/utils/number';
import {isOcrRunning} from '@/utils/ocr/status';
import {showToast} from '@/utils/toast';


export const Ocr = <TData, >({buttonText, textToData, renderData}: OcrCommonProps<TData>) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [locale, setLocale] = React.useState<OcrLocale>('en');
  const t = useTranslations('UI.Ocr.Status');
  const {
    state,
    imageRef,
    canvasRef,
    runOcr,
  } = useOcr({
    ocrLocale: locale,
    ocrThreshold: 180,
    onError: (message) => showToast({
      isAlert: true,
      content: message,
    }),
  });

  const {status, progress, text} = state;

  const ocrRunning = isOcrRunning(status);

  return (
    <Flex direction="col" className="gap-1.5">
      <div className="hidden">
        <NextImage ref={imageRef} src={image ?? ''} alt="OCR Origin"/>
        <canvas id="output" ref={canvasRef}/>
      </div>
      <AdsUnit/>
      <Flex direction="col" className="items-center gap-1.5 md:flex-row">
        <FilterTextInput
          style="none"
          onClick={setLocale}
          isActive={(ocrLang) => ocrLang === locale}
          title={
            <Flex direction="col" center className="px-2">
              <div className="h-6 w-6">
                <LanguageIcon/>
              </div>
            </Flex>
          }
          ids={[...ocrLocale]}
          idToButton={(ocrLang) => localeName[ocrLang]}
          idToItemId={(ocrLang) => `OcrLang-${ocrLang}`}
          noRowPadding
          noFixedTitleWidth
          noWrap
        />
        <InputFileImageOnly
          id="ocrImage"
          onFileSelected={(data) => setImage(data)}
          className="cursor-pointer gap-1"
          disabled={ocrRunning}
        />
        <FlexButton
          className="enabled:button-clickable-border disabled:button-disabled whitespace-nowrap px-4 py-1.5"
          onClick={runOcr}
          stretch
          center
          disabled={!image || ocrRunning}
        >
          {ocrRunning ? `${t(ocrStatusToI18nId[status])} (${formatFloat(progress)}%)` : buttonText}
        </FlexButton>
      </Flex>
      <ProgressBar percent={progress}/>
      <AnimatedCollapse show={!!text && status === 'completed'}>
        {text && renderData(textToData(text, locale), image)}
      </AnimatedCollapse>
    </Flex>
  );
};