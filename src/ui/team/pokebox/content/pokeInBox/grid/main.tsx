import React from 'react';

import {clsx} from 'clsx';

import {Grid} from '@/components/layout/grid';
import {getPokeInBoxEntryKey} from '@/ui/team/pokebox/content/pokeInBox/common/utils';
import {PokeInBoxGridCell} from '@/ui/team/pokebox/content/pokeInBox/grid/cell';
import {PokeInBoxViewOfTypeProps} from '@/ui/team/pokebox/content/pokeInBox/type';


export const PokeInBoxGrid = ({
  filter,
  setEditingPokeInBox,
  processedPokebox,
  ...props
}: PokeInBoxViewOfTypeProps) => {
  return (
    <div className="min-h-[40vh] w-full">
      <Grid className={clsx(
        'grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
      )}>
        {processedPokebox.map(({source}) => {
          const {uuid} = source.extra;

          return (
            <PokeInBoxGridCell
              key={getPokeInBoxEntryKey(source.extra)}
              pokeInBox={source.extra}
              display={filter}
              snorlaxFavorite={filter.snorlaxFavorite}
              onClick={() => setEditingPokeInBox({action: 'update', uuid})}
              {...props}
            />
          );
        })}
      </Grid>
    </div>
  );
};
