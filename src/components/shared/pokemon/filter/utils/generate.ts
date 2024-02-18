import {PokemonInputFilter, PokemonInputFilterExtended} from '@/components/shared/pokemon/filter/type';
import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {defaultLevel} from '@/const/game/production/defaults';
import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {PokemonInfo} from '@/types/game/pokemon';
import {toUnique} from '@/utils/array';
import {isNotNullish} from '@/utils/type';


type GeneratePokemonInputFilterOpts = {
  isLevelAgnostic: true,
  defaultPokemonLevel?: never,
} | {
  isLevelAgnostic: false,
  defaultPokemonLevel?: number,
};

export const generatePokemonInputFilter = ({
  isLevelAgnostic,
  defaultPokemonLevel,
}: GeneratePokemonInputFilterOpts): PokemonInputFilter => ({
  level: isLevelAgnostic ? null : (defaultPokemonLevel ?? defaultLevel),
  pokemonType: {},
  sleepType: {},
  specialty: {},
  ingredient: {},
  berry: {},
  mainSkill: {},
  evolutionStage: {},
});

export const generatePokemonInputFilterExtended = (): PokemonInputFilterExtended => ({
  mapId: {},
  snorlaxFavorite: defaultSnorlaxFavorite,
  ...generatePokemonInputFilter({isLevelAgnostic: false}),
  ...defaultPokemonIndividualParams,
});

type GenerateFilterOptionIdsFromPokemonOpts<TId> = {
  pokemonList: PokemonInfo[],
  toId: (single: PokemonInfo) => TId | TId[] | null | undefined,
};

export const generateFilterOptionIdsFromPokemon = <TId extends number>({
  pokemonList,
  toId,
}: GenerateFilterOptionIdsFromPokemonOpts<TId>) => {
  return toUnique(pokemonList.flatMap(toId))
    .filter(isNotNullish)
    .sort((a, b) => a - b);
};
