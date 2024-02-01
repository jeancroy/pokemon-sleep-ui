import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {getEvolutionItemMap} from '@/controller/pokemon/evolution';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {EvolutionItemSingle} from '@/ui/item/evolution/item';


export const EvolutionItems = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    evolutionItemMap,
  ] = await Promise.all([
    getEvolutionItemMap(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <Flex center>
        <Grid center className="grid-cols-1 gap-2 md:w-2/3 md:grid-cols-2 lg:w-1/2">
          {Object.entries(evolutionItemMap).map(([itemId, pokemonList]) => (
            <EvolutionItemSingle
              key={itemId}
              locale={locale}
              itemId={Number(itemId)}
              pokemonList={pokemonList}
            />
          ))}
        </Grid>
      </Flex>
    </PublicPageLayout>
  );
};
