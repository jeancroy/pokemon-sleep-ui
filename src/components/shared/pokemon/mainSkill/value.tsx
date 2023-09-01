import React from 'react';

import {Flex} from '@/components/layout/flex';
import {MainSkillEffectTypeIcon} from '@/components/shared/pokemon/mainSkill/typeIcon';
import {MainSkillEffectType} from '@/types/game/pokemon/mainSkill';


type Props = {
  type: MainSkillEffectType,
  value: React.ReactNode,
};

export const MainSkillEffectValue = ({type, value, children}: React.PropsWithChildren<Props>) => {
  return (
    <Flex direction="row" noFullWidth className="items-center gap-1">
      <MainSkillEffectTypeIcon type={type}/>
      {children}
      <div>{value}</div>
    </Flex>
  );
};
