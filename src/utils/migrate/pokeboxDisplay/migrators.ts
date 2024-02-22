import {defaultPokemonIndividualParams} from '@/const/game/pokemon';
import {RatingBasis} from '@/types/game/pokemon/rating/config';
import {Migrator} from '@/types/migrate';
import {PokeboxViewerDisplay} from '@/ui/team/pokebox/viewer/type';
import {PokeboxViewerDisplayMigrateParams} from '@/utils/migrate/pokeboxDisplay/type';


export const pokeboxDisplayMigrators: Migrator<PokeboxViewerDisplay, PokeboxViewerDisplayMigrateParams>[] = [
  {
    // `frequency` sort type split to `frequencyOfBerry`/`frequencyOfIngredient`
    toVersion: 1,
    migrate: ({sort, ...old}): PokeboxViewerDisplay => ({
      ...old,
      sort: sort === 'frequency' ? 'frequencyOfBerry' : sort,
    }),
  },
  {
    // `displayType` split to `displayOfGrid` / `displayOfTable`
    toVersion: 2,
    // @ts-ignore
    migrate: ({sort, displayType, ...old}): PokeboxViewerDisplay => ({
      ...old,
      displayOfGrid: displayType,
      displayOfTable: {},
    }),
  },
  {
    // `displayOf*` changing `stats` to `maxCarry` or `frequency`
    toVersion: 3,
    migrate: ({displayOfGrid, displayOfTable, ...old}): PokeboxViewerDisplay => {
      const displayOfTableClone = {...displayOfTable};

      // @ts-ignore
      if (displayOfTableClone['stats']) {
        displayOfTableClone['frequency'] = true;
        // @ts-ignore
        delete displayOfTableClone['stats'];
      }

      return {
        ...old,
        // @ts-ignore
        displayOfGrid: displayOfGrid === 'stats' ? 'frequency' : displayOfGrid,
        displayOfTable: displayOfTableClone,
      };
    },
  },
  {
    // `previewFinalEvolution` addition
    toVersion: 4,
    migrate: (old) => ({
      ...old,
      previewFinalEvolution: false,
    }),
  },
  {
    // `PokemonIndividualParams` usage
    toVersion: 5,
    migrate: (old) => ({
      ...old,
      ...defaultPokemonIndividualParams,
    }),
  },
  {
    // `timeToFullPack` sort type split to `timeToFullPackPrimary` / `timeToFullPackSecondary`
    toVersion: 6,
    migrate: ({sort, ...old}) => ({
      ...old,
      // @ts-ignore
      sort: sort === 'timeToFullPack' ? 'timeToFullPackPrimary' : sort,
    }),
  },
  {
    // Removed `mainSkillValue` and `mainSkillTriggerValue` display / sort type
    toVersion: 7,
    migrate: ({sort, ...old}) => ({
      ...old,
      // @ts-ignore
      sort: sort === 'mainSkillValue' || sort === 'mainSkillTriggerValue' ? 'mainSkillDailyCount' : sort,
    }),
  },
  {
    // Updated the rating basis #790
    toVersion: 8,
    migrate: ({ratingBasis, ...old}) => {
      const ratingBasisReplacement: {[basis in string]?: RatingBasis} = {
        totalProduction: 'totalStrength',
        ingredientProduction: 'ingredientProduction',
        ingredientCount: 'ingredientProduction',
        skillTriggerValue: 'mainSkillTriggerCount',
      };

      return {
        ...old,
        ratingBasis: ratingBasis ? ratingBasisReplacement[ratingBasis] ?? null : null,
      };
    },
  },
];
