import React from 'react';

import {PokeboxLinkerControl, PokeboxLinkerState} from '@/components/shared/pokebox/linker/type';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {PokeInBox} from '@/types/userData/pokebox';


export type UsePokeboxLinkerOpts = {
  initialPokeInBoxUuid: string | null,
};

export const usePokeboxLinker = ({initialPokeInBoxUuid}: UsePokeboxLinkerOpts): PokeboxLinkerControl => {
  // `pokeInBoxPreview`
  const [state, setState] = React.useState<PokeboxLinkerState>({
    pokeInBoxUuid: initialPokeInBoxUuid ?? '',
    pokeInBoxPreview: null,
    showImporter: false,
  });
  const {actAsync} = useUserDataActor();
  const {pokeInBoxUuid} = state;

  const updatePokeInBoxPreview = async () => {
    if (!actAsync) {
      return;
    }

    const {updated} = await actAsync({
      action: 'load',
      options: {
        type: 'pokeboxSingle',
        opts: {pokeInBoxUuid},
      },
    });

    setState((original) => ({
      ...original,
      pokeInBoxPreview: updated?.user.lazyLoaded.pokeboxSingle ?? null,
    }));
  };

  const onPokeInBoxSelected = (pokeInBox: PokeInBox) => setState((original) => ({
    ...original,
    pokeInBoxPreview: pokeInBox,
    pokeInBoxUuid: pokeInBox.uuid,
    showImporter: false,
  } satisfies PokeboxLinkerState));

  React.useEffect(() => {
    // No need to check for preview if `pokeInBoxUuid` is empty
    if (!pokeInBoxUuid) {
      return;
    }

    const timeoutId = setTimeout(updatePokeInBoxPreview, 500);

    return () => clearTimeout(timeoutId);
  }, [pokeInBoxUuid]);

  return {state, setState, onPokeInBoxSelected};
};
