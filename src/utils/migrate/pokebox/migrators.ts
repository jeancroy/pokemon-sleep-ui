import {defaultSeedUsage} from '@/const/game/seed';
import {Migrator} from '@/types/migrate';
import {PokeInBox} from '@/types/userData/pokebox';
import {PokeInBoxMigrateParams} from '@/utils/migrate/pokebox/type';


export const pokeInBoxMigrators: Migrator<PokeInBox, PokeInBoxMigrateParams>[] = [
  {
    // Initial
    toVersion: 1,
    migrate: ({isShiny, isFavorite, seeds, ...pokeInBox}): PokeInBox => ({
      ...pokeInBox,
      isShiny: isShiny ?? false,
      isFavorite: isFavorite ?? false,
      seeds: seeds ?? defaultSeedUsage,
    }),
  },
];
