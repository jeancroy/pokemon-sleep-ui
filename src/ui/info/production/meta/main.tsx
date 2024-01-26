import React from 'react';

import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';

import {Flex} from '@/components/layout/flex/common';
import {PokemonProducingParamsMeta} from '@/types/game/pokemon/producing';
import {Dimension} from '@/types/style';
import {ProducingParamsMetaLastUpdated} from '@/ui/info/production/meta/lastUpdated';
import {formatInt} from '@/utils/number/format';


type Props = {
  meta: PokemonProducingParamsMeta | null,
};

export const ProducingParamsMeta = ({meta}: Props) => {
  if (!meta) {
    return null;
  }

  const {dataCount, lastUpdated} = meta;

  const dimension: Dimension = 'size-6';

  return (
    <Flex className="info-section text-xl md:flex-row md:justify-between">
      <Flex noFullWidth direction="row" className="items-center gap-1">
        <DocumentTextIcon className={dimension}/>
        <div>{formatInt(dataCount)}</div>
      </Flex>
      <Flex noFullWidth direction="row" className="items-center gap-1">
        <CloudArrowUpIcon className={dimension}/>
        <ProducingParamsMetaLastUpdated epochMs={lastUpdated * 1000}/>
      </Flex>
    </Flex>
  );
};
