import {defaultSeedUsage} from '@/const/game/seed';
import {defaultSnorlaxFavorite} from '@/const/game/snorlax';
import {defaultCookingConfig} from '@/const/user/config/cooking';
import {defaultStaminaCalcConfig} from '@/const/user/config/user';
import {TeamMemberData} from '@/types/game/team/member';
import {Migrator} from '@/types/migrate';
import {TeamAnalysisComp, teamAnalysisSlotName} from '@/types/website/feature/teamAnalysis';
import {TeamAnalysisCompMigrateParams} from '@/utils/migrate/teamAnalysis/comp/type';


export const teamAnalysisCompMigrators: Migrator<TeamAnalysisComp, TeamAnalysisCompMigrateParams>[] = [
  {
    // no-op, simply add a version number
    toVersion: 1,
    migrate: (old) => old,
  },
  {
    // `staminaConfig` addition
    toVersion: 2,
    migrate: (old) => ({...old, staminaConfig: null}),
  },
  {
    // `seeds` transition from optional to required
    toVersion: 3,
    migrate: ({members, ...old}) => ({
      ...old,
      members: Object.fromEntries(teamAnalysisSlotName.map((slot) => {
        const member = members[slot];

        if (!member) {
          return [slot, null];
        }

        return [slot, {...member, seeds: defaultSeedUsage}];
      })) as TeamAnalysisComp['members'],
    }),
  },
  {
    // Updated `SnorlaxFavorite` typing
    toVersion: 4,
    // @ts-ignore
    migrate: ({snorlaxFavorite, ...old}) => ({
      ...old,
      snorlaxFavorite: {
        mapId: null,
        berry: snorlaxFavorite,
      },
    }),
  },
  {
    // Added `linkedPokeInBoxUuid`
    toVersion: 5,
    migrate: ({members, ...old}) => ({
      ...old,
      members: Object.fromEntries(teamAnalysisSlotName.map((slot) => {
        const member = members[slot];

        if (!member) {
          return [slot, null];
        }

        return [slot, {...member, linkedPokeInBoxUuid: null} satisfies TeamMemberData | null];
      })) as TeamAnalysisComp['members'],
    }),
  },
  {
    // Updated `SnorlaxFavorite` typing placement
    toVersion: 6,
    // @ts-ignore
    migrate: ({snorlaxFavorite, ...old}) => ({
      ...old,
      configOverride: {
        snorlaxFavorite: snorlaxFavorite ?? defaultSnorlaxFavorite,
        cooking: defaultCookingConfig,
        stamina: defaultStaminaCalcConfig,
      },
    }),
  },
  {
    // Added `configSource`
    toVersion: 7,
    migrate: (old) => ({
      ...old,
      configSource: 'default',
    }),
  },
  {
    // Added `pinnedStats`
    toVersion: 8,
    migrate: (old) => ({
      ...old,
      pinnedStats: {total: true},
    }),
  },
];
