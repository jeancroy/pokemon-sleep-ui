import {GroupedSubSkillBonus} from '@/types/game/pokemon/subSkill';
import {ProductionCalcBehavior} from '@/types/game/producing/behavior/type';
import {HelpingBonusEffect} from '@/types/game/producing/helpingBonus';
import {toSum} from '@/utils/array';
import {getHelpingBonusStack} from '@/utils/game/producing/params';


type GetPokemonProducingRateHelpingBonusEffectOpts = {
  subSkillBonuses: GroupedSubSkillBonus[],
  calcBehavior?: ProductionCalcBehavior,
};

export const getPokemonProducingRateHelpingBonusEffect = ({
  subSkillBonuses,
  calcBehavior,
}: GetPokemonProducingRateHelpingBonusEffectOpts): HelpingBonusEffect => {
  const helpingBonusStacks = toSum(subSkillBonuses.map((subSkillBonus) => getHelpingBonusStack({subSkillBonus})));

  return (
    calcBehavior?.asSingle ?
      {context: 'single', active: !!helpingBonusStacks} :
      {context: 'team', stack: helpingBonusStacks}
  );
};
