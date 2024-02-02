import React from 'react';

import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {MealCoverageCombo} from '@/components/shared/meal/coverage/combo/main';
import {MealCoverageComboCommonProps} from '@/components/shared/meal/coverage/combo/type';


type Props = MealCoverageComboCommonProps & {
  children: React.ReactNode,
};

export const MealCoverageComboCollapsible = ({children, ...props}: Props) => {
  const collapsible = useCollapsibleControl();

  return (
    <Collapsible control={collapsible} button={children} classNameForHeight="h-[70vh] lg:h-[50vh]">
      <MealCoverageCombo {...props}/>
    </Collapsible>
  );
};
