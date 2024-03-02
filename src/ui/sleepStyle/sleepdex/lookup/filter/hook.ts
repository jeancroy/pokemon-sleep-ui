import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {SleepStyleInternalId} from '@/types/game/sleepStyle';
import {enforceFilterSelectedMapToShowSnorlaxRank} from '@/ui/sleepStyle/sleepdex/lookup/filter/enforcer';
import {
  SleepdexLookupDataEntry,
  SleepdexLookupFilter,
  SleepdexLookupFilterEnforcingCommonOpts,
} from '@/ui/sleepStyle/sleepdex/lookup/filter/type';
import {SleepdexLookupServerDataProps} from '@/ui/sleepStyle/sleepdex/lookup/type';
import {getCurrentDrowsyPowerMultiplier} from '@/utils/game/event/drowsyPowerMultiplier';
import {toSleepdexStyleId} from '@/utils/game/sleepdex';
import {getSleepStyleMerged, getSpoRequirement} from '@/utils/game/sleepStyle';
import {isNotNullish} from '@/utils/type';


type UseSleepdexLookupFilterOpts = SleepdexLookupServerDataProps & SleepdexLookupFilterEnforcingCommonOpts;

export const useSleepdexLookupFilter = ({
  sleepStyles,
  snorlaxDataMap,
  eventDrowsyPowerMultiplierData,
  ...opts
}: UseSleepdexLookupFilterOpts) => {
  const serverData = useCommonServerData();
  const {pokedexMap} = serverData;

  return useFilterInput<SleepdexLookupFilter, SleepdexLookupDataEntry, SleepStyleInternalId>({
    data: ({mapId, drowsyPowerMultiplier}) => getSleepStyleMerged(sleepStyles)
      .map((sleepStyle): SleepdexLookupDataEntry | null => {
        const {pokemonId, spo, style} = sleepStyle;
        const pokemon = pokedexMap[pokemonId];

        if (!pokemon) {
          return null;
        }

        return {
          sleepdexStyleId: toSleepdexStyleId({
            pokemonId,
            styleId: style,
          }),
          sleepStyle,
          pokemon,
          spoRequirement: getSpoRequirement({
            spo,
            drowsyPowerMultiplier,
            sleepStyleUnlockRank: mapId ? sleepStyle.rank[mapId] : null,
            snorlaxData: mapId ? snorlaxDataMap[mapId] : null,
          }),
        };
      })
      .filter(isNotNullish),
    dataToId: ({sleepStyle}) => sleepStyle.internalId,
    initialFilter: {
      ...generatePokemonInputFilter({isLevelAgnostic: true}),
      mapId: null,
      drowsyPowerMultiplier: getCurrentDrowsyPowerMultiplier(eventDrowsyPowerMultiplierData),
      drowsyPowerRequirement: 0,
      incenseOnly: false,
      display: 'drowsyPowerRequirement',
      sort: 'drowsyPowerRequirement',
    },
    isDataIncluded: (filter, data) => {
      if (filter.mapId !== null && !Object.keys(data.sleepStyle.rank).includes(filter.mapId.toString())) {
        return false;
      }

      if (filter.incenseOnly && !data.sleepStyle.incenseOnly) {
        return false;
      }

      if (!!filter.drowsyPowerRequirement && data.spoRequirement.drowsyScore > filter.drowsyPowerRequirement) {
        return false;
      }

      return isPokemonIncludedFromFilter({
        filter,
        pokemon: data.pokemon,
        ...opts,
        ...serverData,
      });
    },
    onSetFilter: (original, updated) => enforceFilterSelectedMapToShowSnorlaxRank({
      original,
      updated,
      ...opts,
    }),
  });
};
