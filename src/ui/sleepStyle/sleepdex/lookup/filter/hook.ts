import {useFilterInput} from '@/components/input/filter/hook';
import {isPokemonIncludedFromFilter} from '@/components/shared/pokemon/filter/utils/filter';
import {generatePokemonInputFilter} from '@/components/shared/pokemon/filter/utils/generate';
import {SleepdexStyleId} from '@/types/game/sleepdex';
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
  pokedexMap,
  snorlaxDataMap,
  eventDrowsyPowerMultiplierData,
  ...opts
}: UseSleepdexLookupFilterOpts) => {
  return useFilterInput<SleepdexLookupFilter, SleepdexLookupDataEntry, SleepdexStyleId>({
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
          spoRequirement: getSpoRequirement({
            spo,
            drowsyPowerMultiplier,
            sleepStyleUnlockRank: sleepStyle.rank,
            snorlaxData: mapId ? snorlaxDataMap[mapId] : null,
          }),
          pokemon,
        };
      })
      .filter(isNotNullish),
    dataToId: ({sleepStyle}) => toSleepdexStyleId({
      pokemonId: sleepStyle.pokemonId,
      styleId: sleepStyle.style,
    }),
    initialFilter: {
      ...generatePokemonInputFilter({isLevelAgnostic: true}),
      mapId: null,
      drowsyPowerMultiplier: getCurrentDrowsyPowerMultiplier(eventDrowsyPowerMultiplierData),
      drowsyPowerRequirement: 0,
      incenseOnly: false,
      display: 'drowsyPowerRequirements',
      sort: 'drowsyPowerRequirements',
    },
    isDataIncluded: (filter, data) => {
      if (filter.mapId !== null && !data.sleepStyle.mapIds.includes(filter.mapId)) {
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
      });
    },
    onSetFilter: (original, updated) => enforceFilterSelectedMapToShowSnorlaxRank({
      original,
      updated,
      ...opts,
    }),
  });
};
