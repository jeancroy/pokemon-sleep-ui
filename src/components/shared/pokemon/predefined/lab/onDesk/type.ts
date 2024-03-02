import React from 'react';

import {PokemonComplexFilterOrigin} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {ProductionImplicitParams} from '@/types/game/producing/rate/params';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {ReactStateUpdaterFromOriginal} from '@/types/react';


export type PokemonOnDeskState = Omit<PokemonIndividualParams, 'level'> & ProductionImplicitParams & {
  pokemon: PokemonInfo,
  ingredients: IngredientProductionAtLevels,
  origin: PokemonComplexFilterOrigin,
};

export type PokemonOnDeskDataProps = {
  ocrTranslations: OcrTranslationsForPokemonInfo,
  maxEvolutionCount: number,
};

export type PokemonOnDeskCommonProps<TOnDesk extends PokemonOnDeskState> = PokemonOnDeskDataProps & {
  onRun: (setup: TOnDesk) => void,
  immediateUpdate?: boolean,
  renderAdditional: (onDesk: TOnDesk, setOnDesk: ReactStateUpdaterFromOriginal<TOnDesk>) => React.ReactNode,
};

export type PokemonOnDeskExportState = {
  level: number,
  name: string | null,
  show: boolean,
};
