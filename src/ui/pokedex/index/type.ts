import {PokemonInputFilterExtended} from '@/components/shared/pokemon/filter/type';
import {PokemonInfo} from '@/types/game/pokemon';
import {IngredientProduction} from '@/types/game/pokemon/ingredient';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SleepStyleNormal} from '@/types/game/sleepStyle';
import {SnorlaxFavorite} from '@/types/game/snorlax';
import {Migratable} from '@/types/migrate';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';
import {PokedexFilterCommon} from '@/ui/pokedex/common/type';
import {Nullable} from '@/utils/type';


export type PokemonInfoForPokedex = PokemonInfo & {
  sleepStyles: SleepStyleNormal[],
  nameOfAllLocale: string[],
};

export type PokedexData = PokemonInfoForPokedex[];

export type PokedexFilter = Migratable & PokemonInputFilterExtended & PokedexFilterCommon & {
  name: string,
};

export type PokedexFilterSave = Pick<
  PokedexFilter,
  'version' | 'sort' | 'display' | keyof PokemonIndividualParams
>;

export type PokedexDataProps = {
  pokedexData: PokedexData,
  preloaded: {
    display: Nullable<Partial<PokedexFilterSave>>,
  },
};

export type PokedexLinkProps = Pick<
  PokedexFilter,
  'display' | 'mainSkillLevel' | keyof PokemonIndividualParams
> & PokedexDataProps & {
  pokemon: PokemonInfo,
  pokemonProducingParams: PokemonProducingParams,
  snorlaxFavorite: SnorlaxFavorite,
  ingredients: IngredientProduction[],
  calculatedConfigBundle: CalculatedConfigBundle,
};
