import {PokemonProducingRateFirstPass} from '@/types/game/producing/rate/main';
import {PokemonIndirectSkillEffects, PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';
import {getPokemonIndirectSkillProduction} from '@/utils/game/producing/branch/mainSkill/indirect/main';


type GetPokemonIndirectSkillProductionFromFirstPassOpts = {
  firstPassRate: PokemonProducingRateFirstPass,
  skillEffects: PokemonIndirectSkillEffects,
  targetCount: number,
};

export const getPokemonIndirectSkillProductionFromFirstPass = ({
  firstPassRate,
  skillEffects,
  targetCount,
}: GetPokemonIndirectSkillProductionFromFirstPassOpts): PokemonIndirectSkillProduction => {
  const {
    params,
    baseRates,
  } = firstPassRate;
  const {produceSplit} = params;
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
