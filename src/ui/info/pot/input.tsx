import React from 'react';

import {FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {PotCapacityInput} from '@/components/shared/input/potCapacity';
import {MealFilterLevelGnostic} from '@/components/shared/meal/filter/levelGnostic/main';
import {MealFilterGnosticRequiredData} from '@/components/shared/meal/filter/levelGnostic/type';
import {PotInfo} from '@/types/game/potInfo';
import {PotInfoFilter} from '@/ui/info/pot/type';


type Props = FilterWithUpdaterProps<PotInfoFilter> & MealFilterGnosticRequiredData & {
  potInfoList: PotInfo[],
};

export const PotInfoInput = ({
  filter,
  setFilter,
  potInfoList,
  ...props
}: Props) => {
  return (
    <>
      <PotCapacityInput
        potInfoList={potInfoList}
        {...getSingleSelectOnClickProps({
          filter,
          setFilter,
          filterKey: 'capacity',
          allowNull: false,
        })}
      />
      <MealFilterLevelGnostic
        filter={filter}
        setFilter={setFilter}
        {...props}
      />
    </>
  );
};
