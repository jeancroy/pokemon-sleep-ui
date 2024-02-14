import React from 'react';

import {clsx} from 'clsx';

import {Collapsible} from '@/components/layout/collapsible/main';
import {CollapsibleControl} from '@/components/layout/collapsible/type';
import {MealCoverageCombo} from '@/components/shared/meal/coverage/combo/main';
import {MealCoverageComboCommonProps} from '@/components/shared/meal/coverage/combo/type';


type Props = MealCoverageComboCommonProps & {
  collapsible: CollapsibleControl,
  children: React.ReactNode,
  disabled?: boolean,
};

export const MealCoverageComboCollapsible = ({collapsible, children, disabled, ...props}: Props) => {
  return (
    <Collapsible control={collapsible} button={children} disabled={disabled} classNameForHeight={clsx(
      'h-[80vh] lg:h-[60vh]',
    )}>
      <MealCoverageCombo {...props}/>
    </Collapsible>
  );
};
