import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';


export type PokeboxServerDataProps = {
  preloaded: {
    display: Partial<PokeboxViewerDisplay> | undefined,
  },
};
