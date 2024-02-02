import React from 'react';

import {Collapsible} from '@/components/layout/collapsible/main';
import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {MealCoverageCombo} from '@/components/shared/meal/coverage/combo/main';
import {MealCoverageComboCommonProps} from '@/components/shared/meal/coverage/combo/type';


type Props = MealCoverageComboCommonProps & {
  collapsible: CollapsibleControl,
  children: React.ReactNode,
};

export const MealCoverageComboCollapsible = ({collapsible, children, ...props}: Props) => {
  return (
    <Collapsible control={collapsible} button={children} classNameForHeight="h-[70vh] lg:h-[50vh]">
      <MealCoverageCombo {...props}/>
    </Collapsible>
  );
};
