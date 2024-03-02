import {useFilterInput} from '@/components/input/filter/hook';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {PokemonId} from '@/types/game/pokemon';
import {Pokebox} from '@/types/userData/pokebox';
import {PokeboxServerDataProps} from '@/ui/team/pokebox/type';
import {PokeboxPokemonForView, PokeboxViewerFilter} from '@/ui/team/pokebox/viewer/type';
import {generatePokeboxViewerFilter, isPokeInBoxIncluded} from '@/ui/team/pokebox/viewer/utils';
import {isNotNullish} from '@/utils/type';


type UsePokeboxViewerFilterOpts = PokeboxServerDataProps & {
  pokebox: Pokebox,
  pokemonNameMap: {[id in PokemonId]?: string},
};

export const usePokeboxViewerFilter = ({
  pokebox,
  pokemonNameMap,
  preloaded,
}: UsePokeboxViewerFilterOpts) => {
  const serverData = useCommonServerData();
  const {pokedexMap} = serverData;

  return useFilterInput<PokeboxViewerFilter, PokeboxPokemonForView, string>({
    data: Object.values(pokebox)
      .filter(isNotNullish)
      .map((inBox) => {
        const pokemonId = inBox.pokemon;
        if (!pokemonId) {
          return null;
        }

        const pokemon = pokedexMap[pokemonId];
        if (!pokemon) {
          return null;
        }

        return {
          info: pokemon,
          inBox,
          names: [inBox.name, pokemonNameMap[pokemonId]].filter(isNotNullish),
        } satisfies PokeboxPokemonForView;
      })
      .filter(isNotNullish),
    dataToId: ({inBox}) => inBox.uuid,
    initialFilter: generatePokeboxViewerFilter(preloaded),
    isDataIncluded: isPokeInBoxIncluded(serverData),
    deps: [pokebox],
  });
};
