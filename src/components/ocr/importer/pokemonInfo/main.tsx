import React from 'react';

import {isIOS} from 'react-device-detect';

import {OcrPokemonInfoImportLayout} from '@/components/ocr/importer/pokemonInfo/layout';
import {OcrPokemonInfoImportCommonProps} from '@/components/ocr/importer/pokemonInfo/type';
import {OcrPopup} from '@/components/ocr/popup';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {ocrExtractPokemonInfo} from '@/utils/ocr/extract/pokemon';


type Props = OcrPokemonInfoImportCommonProps & {
  ocrTranslations: OcrTranslationsForPokemonInfo,
  noFullWidth?: boolean,
};

export const OcrPokemonInfoImporter = ({
  onCompleteImport,
  ocrTranslations,
  noFullWidth,
  ...props
}: Props) => {
  const [showOcr, setShowOcr] = React.useState(false);

  return (
    <OcrPopup
      show={showOcr}
      setShow={setShowOcr}
      buttonText="OCR!"
      textToData={(text, locale) => ocrExtractPokemonInfo({
        ocrLocale: locale,
        text,
        translations: ocrTranslations[locale],
      })}
      renderData={({data, text, image}) => (
        <OcrPokemonInfoImportLayout
          data={data}
          text={text}
          image={image}
          onCompleteImport={(pokemonId, state) => {
            onCompleteImport(pokemonId, state);
            setShowOcr(false);
          }}
          {...props}
        />
      )}
      noFullWidth={noFullWidth}
      getWhitelistChars={(locale) => isIOS ? null : (
        // Return `null` to disable the usage of whitelist characters
        // Temporary solution as English OCR translations doesn't work on iOS for some reason
        Object.values(ocrTranslations[locale])
          .flatMap((trans) => Object.keys(trans))
          .join('')
      )}
    />
  );
};
