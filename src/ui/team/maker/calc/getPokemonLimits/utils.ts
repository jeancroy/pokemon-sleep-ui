import {PokeInBox} from '@/types/userData/pokebox';
import {
  TeamMakerGetTeamMakerPokemonLimitsOpts,
  TeamMakerPokeInBoxDataForLimits,
} from '@/ui/team/maker/calc/getPokemonLimits/type';
import {getPokemonFinalEvolutionIds} from '@/utils/game/pokemon/evolution/final';
import {getProductionIndividualParams} from '@/utils/game/producing/params';
import {getLevelToCalcForPokeInBox} from '@/utils/team/previewLevel';
import {isNotNullish} from '@/utils/type';


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
        pokedexMap,
        evolutionCount: pokeInBox.evolutionCount,
      }).map(({id, evolutionCount}): PokeInBox => ({
        ...pokeInBox,
        pokemon: id,
        evolutionCount,
      }));
    })
    .map((pokeInBox) => {
      const pokemon = pokedexMap[pokeInBox.pokemon];
      if (!pokemon) {
        return null;
      }

      const actualLevel = getLevelToCalcForPokeInBox({
        actualLevel: pokeInBox.level,
        previewLevel,
      });

      return {
        pokeInBox,
        actualLevel,
        individual: getProductionIndividualParams({
          input: pokeInBox,
          pokemon,
          subSkillMap,
          overrideLevel: actualLevel,
        }),
      };
    })
    .filter(isNotNullish);
};
