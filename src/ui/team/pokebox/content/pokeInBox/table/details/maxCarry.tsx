import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/inventory/fullPack/main';
import {PokeInBoxTableDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/table/details/type';
import {getRateOfPokemon} from '@/ui/team/pokebox/content/pokeInBox/utils';


export const PokeInBoxTableMaxCarry = (props: PokeInBoxTableDetailsProps) => {
  const t = useTranslations('UI.Common');

  const {fullPackStats, carryLimitInfo} = getRateOfPokemon(props);

  return (
    <Flex direction="row" noFullWidth>
      <Flex direction="row" center noFullWidth className="w-14 gap-0.5">
        <GenericIconLarger src="/images/generic/bag.png" alt={t('MaxCarry')}/>
        <div>{carryLimitInfo.final}</div>
      </Flex>
      <PokemonTimeToFullPack
        direction="row"
        timeToFullPack={fullPackStats.secondsToFull}
        normalTextSize
        className="w-32"
      />
    </Flex>
  );
};
