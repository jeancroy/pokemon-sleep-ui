import React from 'react';

import {PokemonInfo, PokemonSpecialtyId} from '@/types/game/pokemon';
import {ProductionByCalculatedStates} from '@/types/game/producing/rate/base';
import {PokemonProduction} from '@/types/game/producing/rate/main';
import {Dimension} from '@/types/style';


export type PokemonItemStatsCommonProps = {
  getItemRate: (pokemonRate: PokemonProduction) => ProductionByCalculatedStates | undefined,
  getIcon: (pokemon: PokemonInfo, dimension: Dimension) => React.ReactNode,
  targetSpecialty: PokemonSpecialtyId,
};
