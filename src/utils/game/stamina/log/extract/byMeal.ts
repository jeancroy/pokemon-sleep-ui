import {EfficiencyInterval, EfficiencyIntervalsByCookingMeal} from '@/types/game/stamina/efficiency';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {cookingMeals} from '@/types/userData/config/cooking/meal';
import {getEfficiency} from '@/utils/game/stamina/efficiency';


type ExtractEfficiencyIntervalsByCookingMealOpts = {
  logs: StaminaEventLog[],
};

export const extractEfficiencyIntervalsByCookingMeal = ({
  logs,
}: ExtractEfficiencyIntervalsByCookingMealOpts): EfficiencyIntervalsByCookingMeal => {
  const intervalsByMeal: EfficiencyIntervalsByCookingMeal = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  let cookingRecoveryEncountered = 0;
  let current: EfficiencyInterval[] = [];

  for (let i = 1; i < logs.length; i++) {
    const last = logs[i - 1];
    const curr = logs[i];

    const interval: EfficiencyInterval = {
      efficiency: getEfficiency({stamina: last.stamina.after}),
      duration: curr.timing - last.timing,
    };

    current.push(interval);

    if (curr.type !== 'cookingRecovery' && curr.type !== 'sleep') {
      continue;
    }

    intervalsByMeal[cookingMeals[cookingRecoveryEncountered % cookingMeals.length]].push(...current);
    cookingRecoveryEncountered += 1;
    current = [];

    // Stop processing after going asleep - help count during sleep is not intended to get handled here
    if (curr.type === 'sleep') {
      break;
    }
  }

  return intervalsByMeal;
};
