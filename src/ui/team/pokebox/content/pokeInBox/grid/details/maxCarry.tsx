import React from 'react';

import {useTranslations} from 'next-intl';

import {LoadingText} from '@/components/icons/loading';
import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PokemonTimeToFullPack} from '@/components/shared/pokemon/inventory/fullPack/main';
import {PokeInBoxGridDetailsProps} from '@/ui/team/pokebox/content/pokeInBox/grid/details/type';
import {useCalculatePokeInBoxProduction} from '@/ui/team/pokebox/content/pokeInBox/worker/production/hook';


export const PokeInBoxGridMaxCarry = (props: PokeInBoxGridDetailsProps) => {
  const t = useTranslations('UI.Common');
  const {loading, rate} = useCalculatePokeInBoxProduction(props);

  if (loading || !rate) {
    return <LoadingText dimension="size-4"/>;
  }

  const {fullPackStats, carryLimitInfo} = rate;

  return (
    <Flex direction="row" noFullWidth className="items-center gap-2">
      <Flex direction="row" noFullWidth className="gap-0.5">
        <GenericIconLarger src="/images/generic/bag.png" alt={t('MaxCarry')}/>
        <div>{carryLimitInfo.final}</div>
      </Flex>
      <PokemonTimeToFullPack direction="col" fullPackStats={fullPackStats} normalTextSize/>
    </Flex>
  );
};
