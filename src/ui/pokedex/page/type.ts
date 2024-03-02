import {BerryData} from '@/types/game/berry';
import {EventDrowsyPowerMultiplierData} from '@/types/game/event/drowsyPowerMultiplier';
import {PokemonInfo} from '@/types/game/pokemon';
import {PokemonBranchData} from '@/types/game/pokemon/branch';
import {PokemonProducingParams} from '@/types/game/pokemon/producing';
import {SleepStyleNormal, SleepStyleSpecial} from '@/types/game/sleepStyle';
import {SnorlaxDataMap} from '@/types/game/snorlax';
import {CalculatedConfigBundle} from '@/types/userData/config/bundle';


export type PokemonDataProps = {
  pokemon: PokemonInfo,
  pokemonBranch: PokemonBranchData | null,
  pokemonProducingParams: PokemonProducingParams,
  sleepStyles: SleepStyleNormal[],
  sleepStylesSpecial: SleepStyleSpecial[],
  berryData: BerryData,
  snorlaxDataMap: SnorlaxDataMap,
  eventDrowsyPowerMultiplierData: EventDrowsyPowerMultiplierData,
};

export type PokemonDataCommonProps = PokemonDataProps & {
  calculatedConfigBundle: CalculatedConfigBundle,
};
