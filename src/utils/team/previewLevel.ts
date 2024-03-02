import {PokemonKeyLevel} from '@/types/game/pokemon/level';
import {toNumericPokemonKeyLevel} from '@/utils/game/pokemon/keyLevel';


type GetLevelToCalcForPokeInBoxOpts = {
  actualLevel: number,
  previewLevel: PokemonKeyLevel | null,
  pokemonMaxLevel: number,
};

export const getLevelToCalcForPokeInBox = ({
  actualLevel,
  previewLevel,
  pokemonMaxLevel,
}: GetLevelToCalcForPokeInBoxOpts) => {
  if (previewLevel === null) {
    return actualLevel;
  }

  return Math.max(actualLevel, toNumericPokemonKeyLevel({level: previewLevel, pokemonMaxLevel}));
};
