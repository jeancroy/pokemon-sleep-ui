import {generatePokemonInputFilterExtended} from '@/components/shared/pokemon/filter/utils/generate';
import {defaultPokemonSort} from '@/const/filter';
import {PokedexDisplay, PokedexFilter} from '@/ui/pokedex/index/type';
import {migrate} from '@/utils/migrate/main';
import {pokedexMigrators} from '@/utils/migrate/pokedex/migrators';
import {PokedexFilterMigrateParams} from '@/utils/migrate/pokedex/type';


export const generateInitialFilter = (preloadedDisplay: Partial<PokedexDisplay> | undefined): PokedexFilter => {
  return migrate<PokedexFilter, PokedexFilterMigrateParams>({
    original: {
      name: '',
      sort: defaultPokemonSort,
      display: 'mainSkill',
      ...generatePokemonInputFilterExtended(),
      version: pokedexMigrators.length,
    },
    override: preloadedDisplay ?? null,
    migrators: pokedexMigrators,
    migrateParams: {},
  });
};
