import {PokemonInputFilter, PokemonInputFilterExtended} from '@/components/shared/pokemon/filter/type';
import {FieldMetaMap} from '@/types/game/mapMeta';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SleepStyleNormal} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';
import {CalculatedConfigBundle, ConfigBundle} from '@/types/userData/config/bundle';
import {PokedexCalcDataProps} from '@/ui/pokedex/common/calc/type';
import {PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {Nullable} from '@/utils/type';


export type PokemonInfoForPokedex = PokemonInfo & {
  sleepStyles: SleepStyleNormal[],
  nameOfAllLocale: string[],
};

export type PokedexData = PokemonInfoForPokedex[];

// This is used for auto-saving Pokédex filter
export type PokedexDisplay =
  Migratable &
  // Need to store `mainSkill` to ensure the filter is properly enforced for main skill
  Pick<PokemonInputFilter, 'mainSkill'> &
  // Shouldn't need to store `snorlaxFavorite`
  // This is still included in `PokedexFilter` from `PokemonInputFilterExtended.snorlaxFavorite`
  Omit<PokedexFilterCommon, 'snorlaxFavorite'>;

export type PokedexFilter = PokemonInputFilterExtended & PokedexDisplay & {
  name: string,
};

export type PokedexDataProps = Omit<PokedexCalcDataProps, 'pokemonList' | 'preloaded'> & {
  pokedex: PokedexData,
  maxLevel: number,
  fieldMetaMap: FieldMetaMap,
  preloaded: {
    display: Nullable<Partial<PokedexDisplay>>,
    bundle: ConfigBundle,
  },
};

export type PokedexLinkProps = Pick<PokedexFilter, 'display' | keyof PokemonIndividualParams> & PokedexDataProps & {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  snorlaxFavorite: SnorlaxFavorite,
  ingredients: IngredientProduction[],
  calculatedConfigBundle: CalculatedConfigBundle,
};
