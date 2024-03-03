import {PokemonProduction, PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {PokemonIndirectSkillEffects} from '@/types/game/producing/rate/skill';
import {
  getPokemonIndirectSkillProductionFromInitial,
} from '@/utils/game/producing/main/entry/components/indirectSkill/production';


type GetPokemonProductionFinalAtStageOpts = {
  rate: PokemonProductionInitial,
  skillEffects: PokemonIndirectSkillEffects,
  targetCount: number,
};

export const getPokemonProductionFinalOfStage = ({
  rate,
  skillEffects,
  targetCount,
}: GetPokemonProductionFinalAtStageOpts): PokemonProduction => {
  return {
    ...rate,
    skillIndirect: getPokemonIndirectSkillProductionFromInitial({
      initialRate: rate,
      skillEffects,
      targetCount,
    }),
  };
};
