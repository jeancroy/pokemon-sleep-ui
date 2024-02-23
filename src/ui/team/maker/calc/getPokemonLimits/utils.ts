import {PokeInBox} from '@/types/userData/pokebox/main';
import {
  TeamMakerGetTeamMakerPokemonLimitsOpts,
  TeamMakerPokeInBoxDataForLimits,
} from '@/ui/team/maker/calc/getPokemonLimits/type';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon/evolution/final';
import {getProductionSingleParams} from '@/utils/game/producing/params';
import {getLevelToCalcForPokeInBox} from '@/utils/team/previewLevel';


export const getTeamMakerPokeInBoxDataForLimits = ({
  pokedexMap,
  subSkillMap,
  input,
  pokeboxSource,
}: TeamMakerGetTeamMakerPokemonLimitsOpts): TeamMakerPokeInBoxDataForLimits[] => {
  const {previewLevel, previewFinalEvolution} = input;

  return pokeboxSource
    .flatMap((pokeInBox): PokeInBox[] => {
      if (!previewFinalEvolution) {
        return [pokeInBox];
      }

      return getPokemonFinalEvolutionIds({
        pokemonId: pokeInBox.pokemon,
        pokedex: pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({id, evolutionCount}): PokeInBox => ({
        ...pokeInBox,
        pokemon: id,
        evolutionCount,
      }));
    })
    .map((pokeInBox) => {
      const actualLevel = getLevelToCalcForPokeInBox({
        actualLevel: pokeInBox.level,
        previewLevel,
      });

      return {
        pokeInBox,
        actualLevel,
        singleParams: getProductionSingleParams({
          ...pokeInBox,
          level: actualLevel,
          subSkillMap,
        }),
      };
    });
};
