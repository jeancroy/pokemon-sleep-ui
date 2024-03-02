'use client';
import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {defaultExpType} from '@/const/game/xp';
import {PokemonExpCalculatorInputUI} from '@/ui/xp/input';
import {PokemonExpCalculatorTable} from '@/ui/xp/results/table';
import {
  PokemonExpCalculatorCommonProps,
  PokemonExpCalculatorDataProps,
  PokemonExpCalculatorInput,
} from '@/ui/xp/type';


export const PokemonExpCalculatorClient = (props: PokemonExpCalculatorDataProps) => {
  const {xpValueData} = props;
  const [input, setInput] = React.useState<PokemonExpCalculatorInput>({
    pokemon: null,
    nature: null,
    currentLv: 1,
    xpToNext: xpValueData[defaultExpType]?.data.at(0)?.toNext ?? NaN,
    rate: {
      candyExpBoost: 1,
      dreamShardDepletion: 1,
    },
    ownedCandies: 0,
    showNonKeyLevel: false,
  });

  const commonProps: PokemonExpCalculatorCommonProps = {
    ...props,
    filter: input,
    setFilter: setInput,
  };

  return (
    <Flex className="gap-1.5 xl:flex-row">
      <PokemonExpCalculatorInputUI {...commonProps} {...props}/>
      <PokemonExpCalculatorTable {...commonProps} {...props}/>
    </Flex>
  );
};
