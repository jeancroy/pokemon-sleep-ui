import {PokemonIndirectSkillProduction} from '@/types/game/producing/rate/skill';
import {toSum} from '@/utils/array';


type GetTotalStrengthProductionFromIndirectSkillOpts = {
  skillIndirect: PokemonIndirectSkillProduction,
};

export const getTotalStrengthProductionFromIndirectSkill = ({
  skillIndirect,
}: GetTotalStrengthProductionFromIndirectSkillOpts) => {
  let total = 0;
  const {help} = skillIndirect;

  if (help) {
    const {berry, ingredient} = help.production;

    total += berry.strength + toSum(ingredient.map(({strength}) => strength));
  }

  return total;
};
