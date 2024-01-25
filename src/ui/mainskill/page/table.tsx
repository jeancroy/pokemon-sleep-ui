import React from 'react';

import ChevronDoubleUpIcon from '@heroicons/react/24/solid/ChevronDoubleUpIcon';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {LevelIcon} from '@/components/shared/icon/lv';
import {MainSkillEffectUI} from '@/components/shared/pokemon/mainSkill/effect/main';
import {MainSkillData} from '@/types/game/pokemon/mainSkill';


type Props = {
  data: MainSkillData,
};

export const MainSkillValueTable = ({data}: Props) => {
  const {effects} = data;

  return (
    <Flex>
      <Grid center className="grid-cols-2 gap-1 self-center rounded-lg text-lg md:w-60">
        <div>
          <LevelIcon/>
        </div>
        <ChevronDoubleUpIcon className="size-6"/>
        {effects.map((effect) => (
          <React.Fragment key={effect.level}>
            <div>
              {effect.level}
            </div>
            <div>
              <MainSkillEffectUI effect={effect}/>
            </div>
          </React.Fragment>
        ))}
      </Grid>
    </Flex>
  );
};
