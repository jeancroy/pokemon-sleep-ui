import {Migrator} from '@/types/migrate';
import {PokedexFilter} from '@/ui/pokedex/index/type';
import {PokedexFilterMigrateParams} from '@/utils/migrate/pokedex/type';


export const pokedexMigrators: Migrator<PokedexFilter, PokedexFilterMigrateParams>[] = [
  {
    // `frequency` sort type split to `frequencyOfBerry` / `frequencyOfIngredient`
    toVersion: 1,
    migrate: ({sort, display, ...old}): PokedexFilter => ({
      ...old,
      // @ts-ignore
      sort: sort === 'frequency' ? 'frequencyOfBerry' : sort,
      // @ts-ignore
      display: display === 'frequency' ? 'frequencyOfBerry' : display,
    }),
  },
  {
    // `mainSkill` addition
    toVersion: 2,
    migrate: (old): PokedexFilter => ({
      ...old,
      mainSkill: {},
    }),
  },
  {
    // `timeToFullPack` sort type split to `timeToFullPackPrimary` / `timeToFullPackSecondary`
    toVersion: 3,
    migrate: ({sort, display, ...old}): PokedexFilter => ({
      ...old,
      // @ts-ignore
      sort: sort === 'timeToFullPack' ? 'timeToFullPackPrimary' : sort,
      // @ts-ignore
      display: display === 'timeToFullPack' ? 'timeToFullPackPrimary' : display,
    }),
  },
];
