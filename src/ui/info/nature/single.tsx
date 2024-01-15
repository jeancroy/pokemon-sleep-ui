import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {natureStyle} from '@/styles/game/nature';
import {NatureData} from '@/types/game/pokemon/nature';
import {NatureInfoEffect} from '@/ui/info/nature/effect';


type Props = {
  nature: NatureData,
};

export const NatureInfoSingle = ({nature}: Props) => {
  const t = useTranslations('Game');

  const {id, buff, nerf} = nature;

  return (
    <Flex center className="gap-2 rounded-lg bg-slate-500/10 p-4">
      <Flex direction="row" center className={clsx(
        'gap-1 whitespace-nowrap',
        buff && nerf && natureStyle.clean,
      )}>
        <span className="text-2xl">
          {t(`Nature.${id}`)}
        </span>
        <small className="self-end text-slate-500">
          #{id}
        </small>
      </Flex>
      <NatureInfoEffect natureId={id} direction="buff" effectId={buff}/>
      <NatureInfoEffect natureId={id} direction="nerf" effectId={nerf}/>
    </Flex>
  );
};
