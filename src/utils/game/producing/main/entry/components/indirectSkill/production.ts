import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {PokemonIndirectSkillEffects, PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';
import {getPokemonIndirectSkillProduction} from '@/utils/game/producing/branch/mainSkill/indirect/main';


type GetPokemonIndirectSkillProductionFromInitialOpts = {
  initialRate: PokemonProductionInitial,
  skillEffects: PokemonIndirectSkillEffects,
  targetCount: number,
};

export const getPokemonIndirectSkillProductionFromInitial = ({
  initialRate,
  skillEffects,
  targetCount,
}: GetPokemonIndirectSkillProductionFromInitialOpts): PokemonIndirectSkillProduction => {
  const {
    intermediate,
    baseRates,
  } = initialRate;
  const {produceSplit} = intermediate;
  const {berry, ingredient} = baseRates;

  return getPokemonIndirectSkillProduction({
    produceSplit,
    skillEffects,
    targetCount,
    production: {
      berry: {
        id: berry.id,
        value: {
          qtyPerHelp: berry.qtyPerHelp,
          strengthPerHelp: berry.strengthPerHelp,
        },
      },
      ingredient: ingredient.map(({id, qtyPerHelp, strengthPerHelp}) => ({
        id,
        value: {qtyPerHelp, strengthPerHelp},
      })),
    },
  });
};
