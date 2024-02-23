import React from 'react';

import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {ProductionUI} from '@/components/shared/production/rate/main';
import {ProductionContentCommonProps} from '@/components/shared/production/rate/type';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {Production} from '@/types/game/producing/rate/base';


type Props = ProductionContentCommonProps & {
  id: MainSkillId,
  rate: Production,
  hideStrength?: boolean,
};

export const PokemonSkillProduction = ({id, rate, hideStrength, ...props}: Props) => {
  return (
    <ProductionUI
      rate={rate}
      getIcon={(dimension) => <MainSkillIcon id={id} dimension={dimension}/>}
      hideStrength={hideStrength}
      {...props}
    />
  );
};
