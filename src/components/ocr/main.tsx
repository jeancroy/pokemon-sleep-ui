import React from 'react';

import LanguageIcon from '@heroicons/react/24/outline/LanguageIcon';
import {useTranslations} from 'next-intl';

import {AdsUnit} from '@/components/ads/main';
import {InputFileImageOnly} from '@/components/input/file/image';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {AnimatedCollapse} from '@/components/layout/collapsible/animated';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {ocrStatusToI18nId} from '@/components/ocr/const';
import {useOcr} from '@/components/ocr/hook';
import {OcrCommonProps, OcrConfig} from '@/components/ocr/type';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {NextImage} from '@/components/shared/common/image/main';
import {InfoSlider} from '@/components/shared/input/infoSlider';
import {localeName} from '@/const/website';
import {ocrLocale} from '@/types/ocr/locale';
import {formatFloat} from '@/utils/number/format/regular';
import {isOcrRunning} from '@/utils/ocr/status';
import {showToast} from '@/utils/toast';


export const Ocr = <TData, >({buttonText, textToData, renderData, getWhitelistChars}: OcrCommonProps<TData>) => {
  const [image, setImage] = React.useState<string | null>(null);
  const [config, setConfig] = React.useState<OcrConfig>({
    locale: 'en',
    tolerance: 25,
  });

  const t = useTranslations('UI.Ocr');
  const {
    state,
    imageRef,
    canvasRef,
    runOcr,
  } = useOcr({
    config,
    whitelistChars: getWhitelistChars(config.locale),
    onError: (message) => showToast({
      isAlert: true,
      content: message,
    }),
  });

  const {
    error,
    status,
    progress,
    text,
  } = state;

  const ocrRunning = isOcrRunning(status);

  return (
    <Flex className="gap-1.5">
      <div className="fixed hidden">
        {image && <NextImage ref={imageRef} src={image} alt="OCR Origin" priority/>}
        <canvas id="output" ref={canvasRef}/>
      </div>
      <AdsUnit/>
      {
        error &&
        <Flex className="text-rose-600 shadow-rose-600 dark:text-rose-500 dark:shadow-rose-500">
          {error}
        </Flex>
      }
      <Flex className="items-center gap-1.5 md:flex-row">
        <FilterTextInput
          style="none"
          onClick={(locale) => setConfig((original) => ({
            ...original,
            locale,
          }))}
          isActive={(ocrLang) => ocrLang === config.locale}
          title={
            <Flex center className="px-2">
              <LanguageIcon className="size-6"/>
            </Flex>
          }
          ids={[...ocrLocale]}
          idToText={(ocrLang) => localeName[ocrLang]}
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
          center
          disabled={!image || ocrRunning}
        >
          {ocrRunning ? `${t(`Status.${ocrStatusToI18nId[status]}`)} (${formatFloat(progress)}%)` : buttonText}
        </FlexButton>
      </Flex>
      <InfoSlider
        title={t('Tolerance.Title')}
        value={config.tolerance}
        setValue={(tolerance) => setConfig((original) => ({
          ...original,
          tolerance,
        }))}
        maxValue={50}
      >
        <Flex noFullWidth className="text-sm">
          {t('Tolerance.Tips')}
        </Flex>
      </InfoSlider>
      <ProgressBarSingle percent={progress}/>
      <AnimatedCollapse show={!!text && status === 'completed'}>
        {text && renderData({
          data: textToData(text, config.locale),
          text,
          image: {
            raw: image,
            processedCanvasRef: canvasRef,
          },
        })}
      </AnimatedCollapse>
    </Flex>
  );
};
