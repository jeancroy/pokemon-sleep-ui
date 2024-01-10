import React from 'react';

import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {MealCoverageAllRecipesContent} from '@/components/shared/meal/coverage/allRecipes/content';
import {MealCoverageTargetComboCommonProps} from '@/components/shared/meal/coverage/allRecipes/type';


type Props = MealCoverageTargetComboCommonProps & {
  children: React.ReactNode,
};

export const MealCoverageAllRecipes = ({children, ...props}: Props) => {
  const collapsible = useCollapsible();

  return (
    <Collapsible state={collapsible} button={children} classNameForHeight="h-[70vh] lg:h-[50vh]">
      <MealCoverageAllRecipesContent {...props}/>
    </Collapsible>
  );
};
