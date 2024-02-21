import React from 'react';

import {PokemonComplexFilterOrigin} from '@/components/shared/pokemon/predefined/complexPicker/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientChainMap, IngredientProductionAtLevels} from '@/types/game/pokemon/ingredient';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonSubSkill, SubSkillMap} from '@/types/game/pokemon/subSkill';
import {ProducingRateImplicitParams} from '@/types/game/producing/rate/params';
import {OcrTranslationsForPokemonInfo} from '@/types/ocr/extracted/pokemon';
import {ReactStateUpdaterFromOriginal} from '@/types/react';


export type PokemonOnDeskState = ProducingRateImplicitParams & {
  pokemon: PokemonInfo,
  ingredients: IngredientProductionAtLevels,
  subSkill: PokemonSubSkill,
  nature: NatureId | null,
  origin: PokemonComplexFilterOrigin,
};

export type PokemonOnDeskDataProps = {
  ingredientChainMap: IngredientChainMap,
  subSkillMap: SubSkillMap,
  pokemonMaxLevel: number,
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
