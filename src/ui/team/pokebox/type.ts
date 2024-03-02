import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeboxServerDataProps = {
  pokemonMaxLevel: number,
  preloaded: {
    display: Partial<PokeboxViewerDisplay> | undefined,
  },
};
