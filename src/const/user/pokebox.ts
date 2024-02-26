import {defaultSeedUsage} from '@/const/game/seed';
import {Migratable} from '@/types/migrate';
import {PokeInBox} from '@/types/userData/pokebox';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';


export const defaultCommonConstPokeInBox: Pick<PokeInBox, keyof Migratable | 'isShiny' | 'isFavorite' | 'seeds'> = {
  version: pokeInBoxMigrators.length,
  isShiny: false,
  isFavorite: false,
  seeds: defaultSeedUsage,
};
