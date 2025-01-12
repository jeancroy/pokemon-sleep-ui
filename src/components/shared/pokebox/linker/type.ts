import React from 'react';

import {PokeInBox} from '@/types/userData/pokebox';


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
