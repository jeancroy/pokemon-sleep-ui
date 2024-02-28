import {v4} from 'uuid';

import {defaultProductionPeriod} from '@/const/game/production/defaults';
import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {
  ProductionComparisonConfig,
  ProductionComparisonPreset,
  ProductionComparisonSetup,
} from '@/types/productionComparison';
import {CookingTarget} from '@/types/userData/config/cooking/target';
import {UserProductionComparisonContent} from '@/types/userData/productionComparison';
import {getDefaultTeamName} from '@/utils/game/team/name';
import {migrate} from '@/utils/migrate/main';
import {productionComparisonConfigMigrators} from '@/utils/migrate/productionComparison/config/migrators';
import {productionComparisonPresetMigrators} from '@/utils/migrate/productionComparison/preset/migrators';
import {Nullable} from '@/utils/type';


type GenerateNewProductionComparisonPresetOpts = {
  uuid: string,
  cookingTarget: CookingTarget,
};

export const generateNewProductionComparisonPreset = ({
  uuid,
  cookingTarget,
}: GenerateNewProductionComparisonPresetOpts): ProductionComparisonPreset => {
  return {
    version: productionComparisonPresetMigrators.length,
    uuid,
    name: getDefaultTeamName(uuid),
    snorlaxFavorite: defaultSnorlaxFavorite,
    analysisPeriod: defaultProductionPeriod,
    members: {},
    pinnedStats: [],
    cookingTarget,
    team: {
      skill: {
        recovery: [],
        indirectSkills: {
          totalExtraHelps: 0,
        },
      },
      stacks: {
        helpingBonus: 0,
      },
    },
  };
};

type GetInitialProductionComparisonSetupOpts = {
  data: Nullable<UserProductionComparisonContent>,
  defaultCookingTarget: CookingTarget,
};

export const getInitialProductionComparisonSetup = ({
  data,
  defaultCookingTarget,
}: GetInitialProductionComparisonSetupOpts): ProductionComparisonSetup => {
  // If the user is not logged in or new, they won't have `preloadedSetup` so they need an initial comp
  // Therefore generate the initial comp for migration, then ignore it if it's not needed
  const initialCompUuid = v4();
  const config: ProductionComparisonConfig = migrate({
    original: {
      current: initialCompUuid,
      version: productionComparisonConfigMigrators.length,
    },
    override: data?.config ?? null,
    migrators: productionComparisonConfigMigrators,
    migrateParams: {},
  });

  const presetsToMigrate = data?.presets ?? [generateNewProductionComparisonPreset({
    uuid: initialCompUuid,
    cookingTarget: defaultCookingTarget,
  })];
  const presets: ProductionComparisonPreset[] = presetsToMigrate.map((team) => migrate({
    original: generateNewProductionComparisonPreset({
      uuid: team.uuid,
      cookingTarget: defaultCookingTarget,
    }),
    override: team,
    migrators: productionComparisonPresetMigrators,
    migrateParams: {},
  }));
  return {
    config,
    teams: Object.fromEntries(presets.map((team) => [team.uuid, team])),
  };
};
