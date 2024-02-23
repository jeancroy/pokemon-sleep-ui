import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {PokemonProductionRateOfCategory} from '@/components/shared/pokemon/production/grouped/type';
import {Production} from '@/types/game/producing/rate/base';
import {Dimension} from '@/types/style';
import {toSum} from '@/utils/array';
import {formatFloat} from '@/utils/number/format/regular';
import {isNotNullish} from '@/utils/type';


type Props = {
  icon: React.ReactNode,
  data: PokemonProductionRateOfCategory[],
  getReactNode: (id: number, rate: Production) => React.ReactNode,
  showQuantity: boolean,
  dimension?: Dimension,
};

export const PokemonGroupedProductionCategory = ({icon, data, getReactNode, showQuantity, dimension}: Props) => {
  const quantity = toSum(data.map((row) => row.rate?.qty).filter(isNotNullish));

  return (
    <Flex className="gap-3 rounded-lg p-2 md:flex-row">
      <Flex direction="row" center noFullWidth className="w-20 gap-0.5 self-center md:flex-col">
        <div className={clsx('relative', dimension)}>
          {icon}
        </div>
        {
          showQuantity &&
          <div className="text-sm">
            {formatFloat(quantity)}
          </div>
        }
      </Flex>
      <Flex direction="row" center wrap className="gap-1">
        {data.length ?
          data
            .sort((a, b) => (a.rate?.strength ?? 0) - (b.rate?.strength ?? 0))
            .map(({id, rate}) => {
              if (!rate) {
                return null;
              }

              return (
                <React.Fragment key={id}>
                  {getReactNode(id, rate)}
                </React.Fragment>
              );
            }) :
          <UnavailableIcon dimension="size-10"/>}
      </Flex>
    </Flex>
  );
};
