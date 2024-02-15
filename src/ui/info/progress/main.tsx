import React from 'react';

import {Grid} from '@/components/layout/grid';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getAllGameProgressData} from '@/controller/progress';
import {DefaultPageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {GameProgressSingle} from '@/ui/info/progress/single';


export const GameProgressUI = async ({params}: DefaultPageProps) => {
  const {locale} = params;
  const [
    pokedexMap,
    gameProgresses,
  ] = await Promise.all([
    getPokedexMap(),
    getAllGameProgressData(),
  ]);

  return (
    <PublicPageLayout locale={locale}>
      <Grid className="grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {gameProgresses.map((data) => (
          <GameProgressSingle
            key={data.sleepStyleUnlocksRequired}
            pokedexMap={pokedexMap}
            data={data}
          />
        ))}
      </Grid>
    </PublicPageLayout>
  );
};
