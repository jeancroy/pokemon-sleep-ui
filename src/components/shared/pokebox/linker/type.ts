import React from 'react';

import {PokeboxImporterDataProps} from '@/components/shared/pokebox/importer/type';
import {PokeInBox} from '@/types/userData/pokebox/main';


export type PokeboxLinkerDataProps = PokeboxImporterDataProps;

export type PokeboxLinkerState = {
  pokeInBoxUuid: string,
  pokeInBoxPreview: PokeInBox | null,
  showImporter: boolean,
};

export type PokeboxLinkerControl = {
  state: PokeboxLinkerState,
  setState: React.Dispatch<React.SetStateAction<PokeboxLinkerState>>,
  onPokeInBoxSelected: (pokeInBox: PokeInBox) => void,
};
