import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {Pokebox} from '@/types/userData/pokebox/main';
import {useProcessedPokebox} from '@/ui/team/pokebox/client/hook/process';
import {PokeboxCommonProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon/evolution/final';
import {getLevelToCalcForPokeInBox} from '@/utils/team/previewLevel';
import {isNotNullish} from '@/utils/type';


type UseCalculatedDataOpts = PokeboxCommonProps & {
  pokebox: Pokebox,
  session: ReturnType<typeof useSession>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const useCalculatedData = (opts: UseCalculatedDataOpts) => {
  const {
    pokedexMap,
    preloaded,
    pokebox,
    session,
    setLoading,
  } = opts;

  const t = useTranslations('Game');

  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: preloaded.bundle,
      client: session.data?.user.preloaded,
    },
    ...opts,
  });

  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    ...opts,
    pokemonNameMap: Object.fromEntries(
      Object.values(pokedexMap)
        .filter(isNotNullish)
        .map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
  });

  const processedPokebox = useProcessedPokebox({
    ...opts,
    pokeInBoxToCalc: Object.values(pokebox).filter(isNotNullish).flatMap((pokeInBox) => {
      const level = getLevelToCalcForPokeInBox({
        actualLevel: pokeInBox.level,
        previewLevel: filter.previewLevel,
      });

      if (!filter.previewFinalEvolution) {
        return [{...pokeInBox, level}];
      }

      const {pokemon} = pokeInBox;
      const pokemonInfo = pokedexMap[pokemon];

      if (!pokemonInfo) {
        return [];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({evolutionCount, id}) => ({
        ...pokeInBox,
        evolutionCount,
        pokemon: id,
        level,
      }));
    }),
    filter,
    calculatedConfigBundle,
    isIncluded,
    setLoading,
  });

  useAutoUpload({
    opts: {
      type: 'pokebox.display',
      data: {
        // Explicit references here so no extra data get stored
        sort: filter.sort,
        ratingBasis: filter.ratingBasis,
        displayOfGrid: filter.displayOfGrid,
        displayOfTable: filter.displayOfTable,
        viewType: filter.viewType,
        previewLevel: filter.previewLevel,
        previewFinalEvolution: filter.previewFinalEvolution,
        version: filter.version,
      },
    },
    triggerDeps: [filter.sort, filter.displayOfGrid, filter.displayOfTable, filter.viewType, filter.previewLevel],
    delay: 0,
  });

  return {
    calculatedConfigBundle,
    filter,
    setFilter,
    processedPokebox,
  };
};
