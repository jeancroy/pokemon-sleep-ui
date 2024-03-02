import {FilterInputProps} from '@/components/input/filter/type';
import {PokemonId} from '@/types/game/pokemon';
import {NatureId} from '@/types/game/pokemon/nature';
import {PokemonExpValueMap, PokemonShardConsumptionData} from '@/types/game/pokemon/xp';


export type PokemonExpCalculatorDataProps = {
  xpValueData: PokemonExpValueMap,
  xpShardConsumption: PokemonShardConsumptionData,
};

export type PokemonExpCalculatorCommonProps =
  PokemonExpCalculatorDataProps &
  FilterInputProps<PokemonExpCalculatorInput>;

export type PokemonExpCalculatorParams = {
  xpToNext: number,
  currentLv: number,
  ownedCandies: number,
  rate: {
    dreamShardDepletion: number,
    candyExpBoost: number,
  },
};

export type PokemonExpCalculatorInput = PokemonExpCalculatorParams & {
  pokemon: PokemonId | null,
  nature: NatureId | null,
  showNonBreakthroughLevel: boolean,
};
