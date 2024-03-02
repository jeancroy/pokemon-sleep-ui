import {SleepMapId, SleepStyleNormalFlattened} from '@/types/game/sleepStyle';
import {getAnalysisStatsOfMap} from '@/ui/analysis/page/calc/pokemon/sleepStyleOfMap';
import {AnalysisStatsSleepStyle, GetAnalysisStatsWorkerOpts} from '@/ui/analysis/page/calc/type';
import {sortBySnorlaxRankAsc} from '@/utils/game/snorlax';
import {isNotNullish} from '@/utils/type';


type SelectedStyleOfMap = {[id in SleepMapId]?: SleepStyleNormalFlattened[]};

export const getAnalysisStatsOfSleepStyle = ({
  pokemon,
  sleepStyleMap,
}: GetAnalysisStatsWorkerOpts): AnalysisStatsSleepStyle[] => {
  const firstAppearanceOnMaps: SelectedStyleOfMap = {};
  const lastAppearanceOnMap: SelectedStyleOfMap = {};

  Object.values(sleepStyleMap).forEach((sleepStyleData) => {
    if (!sleepStyleData) {
      return;
    }

    sleepStyleData.forEach(({pokemonId, mapId, styles}) => {
      const sortedStyles = styles.sort((a, b) => sortBySnorlaxRankAsc(a.rank, b.rank));

      const minStyle = sortedStyles.at(0);
      const maxStyle = sortedStyles.at(-1);

      if (!minStyle || !maxStyle) {
        return;
      }

      if (!(mapId in firstAppearanceOnMaps)) {
        firstAppearanceOnMaps[mapId] = [];
      }
      firstAppearanceOnMaps[mapId]?.push({pokemonId, mapId, style: minStyle});

      if (!(mapId in lastAppearanceOnMap)) {
        lastAppearanceOnMap[mapId] = [];
      }
      lastAppearanceOnMap[mapId]?.push({pokemonId, mapId, style: maxStyle});
    });
  });

  return Object.keys(firstAppearanceOnMaps).map(Number)
    .map((mapId) => getAnalysisStatsOfMap({
      firstOfMap: firstAppearanceOnMaps[mapId],
      lastOfMap: lastAppearanceOnMap[mapId],
      pokemonId: pokemon.id,
    }))
    .filter(isNotNullish);
};
