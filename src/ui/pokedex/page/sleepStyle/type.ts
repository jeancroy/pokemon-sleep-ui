import React from 'react';

import {PokemonInfo} from '@/types/game/pokemon';
import {SnorlaxRank} from '@/types/game/rank';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SnorlaxDataOfMap} from '@/types/game/snorlax';


export type PokemonSleepStyleProps = {
  pokemon: PokemonInfo,
  sleepdex: SleepdexMap,
  setSleepdex: React.Dispatch<React.SetStateAction<SleepdexMap>>,
  drowsyPowerMultiplier: number,
  snorlaxData?: SnorlaxDataOfMap,
  sleepStyleUnlockRank?: SnorlaxRank,
};
