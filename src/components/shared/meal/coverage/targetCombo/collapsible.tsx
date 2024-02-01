import React from 'react';

import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {MealCoverageTargetCombo} from '@/components/shared/meal/coverage/targetCombo/main';
import {MealCoverageTargetComboCommonProps} from '@/components/shared/meal/coverage/targetCombo/type';


type Props = MealCoverageTargetComboCommonProps & {
  children: React.ReactNode,
};

export const MealCoverageTargetComboCollapsible = ({children, ...props}: Props) => {
  const collapsible = useCollapsibleControl();

  return (
    <Collapsible control={collapsible} button={children} classNameForHeight="h-[70vh] lg:h-[50vh]">
      <MealCoverageTargetCombo {...props}/>
    </Collapsible>
  );
};
