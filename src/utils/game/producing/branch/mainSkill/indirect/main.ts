import {
  PokemonIndirectSkillEffects,
  PokemonIndirectSkillProduction,
} from '@/types/game/producing/rate/skill';
import {ProduceSplit} from '@/types/game/producing/split';
import {getMainSkillInstantHelpEffect} from '@/utils/game/mainSkill/bySkill/help/main';
import {ProductionForMainSkillCalc} from '@/utils/game/mainSkill/bySkill/type';


type GetPokemonIndirectSkillProductionOpts = {
  produceSplit: ProduceSplit,
  skillEffects: PokemonIndirectSkillEffects,
  targetCount: number,
  production: ProductionForMainSkillCalc,
};

export const getPokemonIndirectSkillProduction = ({
  produceSplit,
  skillEffects,
  targetCount,
  production,
}: GetPokemonIndirectSkillProductionOpts): PokemonIndirectSkillProduction => {
  return {
    help: getMainSkillInstantHelpEffect({
      produceSplit,
      totalExtraHelps: skillEffects.totalExtraHelps,
      targetCount,
      production,
    }),
  };
};
