import React from 'react';

import {GetMealCoverageComboDataOpts} from '@/components/shared/meal/coverage/combo/calc/type';
import {MealCoverageComboData} from '@/components/shared/meal/coverage/combo/type';
import {useWorker} from '@/hooks/worker/main';


export const useMealCoverageComboData = ({
  mealMap,
  ingredientProduction,
  period,
  filter,
}: GetMealCoverageComboDataOpts): MealCoverageComboData[] | null => {
  const [
    result,
    setResult,
  ] = React.useState<MealCoverageComboData[] | null>(null);

  const {work} = useWorker<GetMealCoverageComboDataOpts, MealCoverageComboData[]>({
    workerName: 'Meal Coverage Combo Worker',
    generateWorker: () => new Worker(new URL('main.worker', import.meta.url)),
    onCompleted: setResult,
    onError: console.error,
  });

  React.useEffect(() => {
    // Explicit to avoid passing unwanted properties
    work({
      mealMap,
      ingredientProduction,
      period,
      filter,
    });
  }, [ingredientProduction, filter]);

  return result;
};
