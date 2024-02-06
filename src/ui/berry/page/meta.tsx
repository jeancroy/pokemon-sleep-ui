import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonBerryIconContent} from '@/components/shared/pokemon/berry/iconContent';
import {imagePortraitSizes} from '@/styles/image';
import {BerryPageDataProps} from '@/ui/berry/page/type';
import {formatInt} from '@/utils/number/format/regular';


export const BerryMeta = ({berryData}: BerryPageDataProps) => {
  const {id, energy} = berryData;

  const t = useTranslations('Game.Berry');
  const t2 = useTranslations('UI.Common');

  const berryName = t(id.toString());
  const berryEnergyArray = energy.map(({energy}) => energy);

  return (
    <Flex center className="info-section lg:w-fit">
      <div className="text-xl">
        {berryName}
      </div>
      <PokemonBerryIconContent
        id={id}
        dimension="size-44"
        sizes={imagePortraitSizes}
        className="rounded-lg border border-slate-300 dark:border-slate-700"
      />
      <Flex direction="row" center className="gap-1 text-xl">
        <ColoredEnergyIcon alt={t2('Strength')}/>
        <div>
          {formatInt(Math.min(...berryEnergyArray))} ~ {formatInt(Math.max(...berryEnergyArray))}
        </div>
      </Flex>
    </Flex>
  );
};
