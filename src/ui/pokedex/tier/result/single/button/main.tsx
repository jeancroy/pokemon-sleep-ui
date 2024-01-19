import React from 'react';


import {CollapsibleState} from '@/components/layout/collapsible/type';
import {Flex} from '@/components/layout/flex/common';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {pokedexTierBackgroundStyling} from '@/ui/pokedex/tier/result/const';
import {PokedexTierListTierMeta} from '@/ui/pokedex/tier/result/single/button/meta';
import {PokedexTierListPreview} from '@/ui/pokedex/tier/result/single/button/preview';
import {PokedexTierListTierDetails} from '@/ui/pokedex/tier/result/single/details/tier';
import {PokedexTierListSingleCommonProps} from '@/ui/pokedex/tier/result/single/type';


type Props = PokedexTierListSingleCommonProps & {
  collapsible: CollapsibleState,
};

export const PokedexTierListButton = ({collapsible, ...props}: Props) => {
  const {tier, sizePercentage} = props;

  return (
    <Flex className="group">
      <Flex direction="row" center noFullWidth className="gap-1 p-2">
        <PokedexTierListTierMeta {...props}/>
        <Flex className="gap-2">
          <PokedexTierListPreview show={!collapsible.show} {...props}/>
          <PokedexTierListTierDetails {...props}/>
        </Flex>
      </Flex>
      <ProgressBarSingle
        percent={sizePercentage}
        classBar={pokedexTierBackgroundStyling[tier]}
        classBarHeight="h-1.5"
        classRounding="rounded-b-lg"
        classRoundingOfBar="rounded-bl-lg"
      />
    </Flex>
  );
};
