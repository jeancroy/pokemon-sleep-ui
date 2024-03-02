import React from 'react';

import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {useCommonServerData} from '@/contexts/data/common/hook';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {useCalculatedConfigBundle} from '@/hooks/userData/config/bundle/calculated';
import {Pokebox} from '@/types/userData/pokebox';
import {useProcessedPokebox} from '@/ui/team/pokebox/client/hook/process';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';
import {usePokeboxViewerFilter} from '@/ui/team/pokebox/viewer/hook';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon/evolution/final';
import {toPokemonList} from '@/utils/game/pokemon/utils';
import {getLevelToCalcForPokeInBox} from '@/utils/team/previewLevel';
import {isNotNullish} from '@/utils/type';


type UseCalculatedDataOpts = PokeboxServerDataProps & {
  pokebox: Pokebox,
  session: ReturnType<typeof useSession>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

export const useCalculatedData = (opts: UseCalculatedDataOpts) => {
  const {
    pokebox,
    session,
    setLoading,
  } = opts;

  const serverData = useCommonServerData();
  const {
    pokedexMap,
    serverConfigBundle,
    pokemonMaxLevel,
  } = serverData;

  const t = useTranslations('Game');

  const calculatedConfigBundle = useCalculatedConfigBundle({
    bundle: {
      server: serverConfigBundle,
      client: session.data?.user.preloaded,
    },
    ...opts,
    ...serverData,
  });

  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxViewerFilter({
    ...opts,
    pokemonNameMap: Object.fromEntries(
      toPokemonList(pokedexMap).map(({id}) => [id, t(`PokemonName.${id}`)]),
    ),
  });

  const processedPokebox = useProcessedPokebox({
    ...opts,
    pokeInBoxToCalc: Object.values(pokebox).filter(isNotNullish).flatMap((pokeInBox) => {
      const level = getLevelToCalcForPokeInBox({
        actualLevel: pokeInBox.level,
        previewLevel: filter.previewLevel,
        pokemonMaxLevel,
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
        pokedexMap,
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
