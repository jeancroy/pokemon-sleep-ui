import {PokemonComplexFilterDataProps} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonOnDeskDataProps} from '@/components/shared/pokemon/predefined/lab/onDesk/type';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';


export type RatingServerDataProps = {
  ocrTranslations: OcrTranslationsForPokemonInfo,
};

export type RatingDataProps = RatingServerDataProps & PokemonComplexFilterDataProps & PokemonOnDeskDataProps;
