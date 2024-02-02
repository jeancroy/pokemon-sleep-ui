import {expose} from 'threads/worker';


import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/worker/production/main';


expose(getRateOfPokemon);
