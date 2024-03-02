import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {FadingLayout} from '@/components/layout/fading/main';
import {Flex} from '@/components/layout/flex/common';
import {
  PokemonDetailedProductionAtEnergy,
} from '@/components/shared/pokemon/production/stats/tabs/content/atEnergy/main';
import {
  PokemonDetailedProductionCooking,
} from '@/components/shared/pokemon/production/stats/tabs/content/cooking/main';
import {
  PokemonDetailedProductionDailyBreakdown,
} from '@/components/shared/pokemon/production/stats/tabs/content/dailyBreakdown/main';
import {
  PokemonDetailedProductionEnergyCurve,
} from '@/components/shared/pokemon/production/stats/tabs/content/energyCurve/main';
import {
  PokemonDetailedProductionTabSelection,
} from '@/components/shared/pokemon/production/stats/tabs/selection/main';
import {PokemonDetailedProductionTabs} from '@/components/shared/pokemon/production/stats/tabs/type';
import {PokemonDetailedProductionProps} from '@/components/shared/pokemon/production/stats/type';


export const PokemonDetailedProduction = (props: PokemonDetailedProductionProps) => {
  const [tab, setTab] = React.useState<PokemonDetailedProductionTabs>('dailyBreakdown');

  return (
    <Flex className="gap-1 sm:w-[80vw]">
      <AdsUnit/>
      <PokemonDetailedProductionTabSelection tab={tab} setTab={setTab}/>
      <FadingLayout
        current={tab}
        contents={{
          dailyBreakdown: <PokemonDetailedProductionDailyBreakdown {...props}/>,
          energyCurve: <PokemonDetailedProductionEnergyCurve {...props}/>,
          atEnergy: <PokemonDetailedProductionAtEnergy {...props}/>,
          cooking: <PokemonDetailedProductionCooking {...props}/>,
        }}
      />
    </Flex>
  );
};
