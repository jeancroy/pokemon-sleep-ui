import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {NatureData, NatureEffectId} from '@/types/game/pokemon/nature';
import {NatureInfoEffectText} from '@/ui/info/nature/effectText';
import {NatureInfoSingle} from '@/ui/info/nature/single';


type Props = {
  buffEffectId: NatureEffectId | null,
  natures: NatureData[],
};

export const NatureInfoGroup = ({buffEffectId, natures}: Props) => {
  return (
    <Flex className="info-section">
      <div className="text-2xl">
        <NatureInfoEffectText direction="buff" effectId={buffEffectId} dimension="size-7"/>
      </div>
      <Grid className="grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {natures.map((nature) => <NatureInfoSingle key={nature.id} nature={nature}/>)}
      </Grid>
    </Flex>
  );
};
