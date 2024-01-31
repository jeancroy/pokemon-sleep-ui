import {defaultSeedUsage} from '@/const/game/seed';
import {Migrator} from '@/types/migrate';
import {TeamAnalysisComp, teamAnalysisSlotName} from '@/types/teamAnalysis';
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
    migrate: ({snorlaxFavorite, ...old}) => ({
      ...old,
      snorlaxFavorite: {
        mapId: null,
        berry: snorlaxFavorite,
      },
    }),
  },
];
