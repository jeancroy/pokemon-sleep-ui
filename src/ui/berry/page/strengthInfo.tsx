import React from 'react';

import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsibleControl} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {StrengthGrowthChart} from '@/components/shared/chart/strength/main';
import {LevelIcon} from '@/components/shared/icon/lv';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {BerryData} from '@/types/game/berry';
import {Dimension} from '@/types/style';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  berryData: BerryData,
};

export const BerryStrengthInfo = ({berryData}: Props) => {
  const {energy} = berryData;

  const collapsible = useCollapsibleControl();
  const t = useTranslations('UI.Common');

  const dimension: Dimension = 'size-6';

  return (
    <CollapsibleFull control={collapsible} button={
      <Flex direction="row" center className="gap-1">
        <LevelIcon dimension={dimension}/>
        <div>/</div>
        <ColoredStrengthIcon alt={t('Strength')} dimension={dimension}/>
      </Flex>
    }>
      <Flex className="info-section h-[50vh]">
        <StrengthGrowthChart
          data={energy.map(({lv, energy}) => ({
            level: lv,
            strength: {
              berry: energy,
            },
          }))}
          dataKeys={['berry']}
          dataNames={() => ({
            berry: null,
          })}
          formatTicks={formatInt}
          leftMargin={-10}
        />
      </Flex>
    </CollapsibleFull>
  );
};
