import {ExtraTastyInfo} from '@/types/game/cooking/extraTasty';
import {PokemonProductionInitial} from '@/types/game/producing/rate/main';
import {getExtraTastyInfo} from '@/utils/game/cooking/extraTasty/main';
import {
  getExtraTastySkillBoostPercentByMeal,
  getMergedExtraTastySkillBoostPercentByMeal,
} from '@/utils/game/cooking/extraTasty/skillBoosts';
import {getHelpCountBetweenMeals} from '@/utils/game/producing/helpCount/betweenMeals/main';
import {PokemonProductionInCalcWithPayload} from '@/utils/game/producing/main/entry/stages/type';


type GetPokemonProductionExtraTastyInfoOpts<TPayload> = {
  rates: PokemonProductionInCalcWithPayload<PokemonProductionInitial, TPayload>[],
};

export const getPokemonProductionExtraTastyInfo = <TPayload>({
  rates,
}: GetPokemonProductionExtraTastyInfoOpts<TPayload>): ExtraTastyInfo => {
  return getExtraTastyInfo({
    skillBoostPercentByMeal: getMergedExtraTastySkillBoostPercentByMeal(rates.map(({rate, calculatedUserConfig}) => {
      const {efficiencyIntervals} = calculatedUserConfig.bonus.stamina;
      const {
        frequency,
        skillTrigger,
        activeSkillEffect,
      } = rate.intermediate;

      return getExtraTastySkillBoostPercentByMeal({
        triggersPerMeal: getHelpCountBetweenMeals({
          efficiencyIntervalByMeal: efficiencyIntervals.byMeal,
          baseFrequency: frequency,
          multiplier: skillTrigger.ratePercent / 100,
        }),
        percentBoostPerSkill: (activeSkillEffect?.type === 'cooking' && activeSkillEffect.successPercent) || 0,
      });
    })),
  });
};
