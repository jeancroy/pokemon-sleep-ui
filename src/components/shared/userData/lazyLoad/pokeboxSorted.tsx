import React from 'react';

import {UserDataLazyLoad} from '@/components/shared/userData/lazyLoad/main';
import {UserDataLazyLoadCommonProps} from '@/components/shared/userData/lazyLoad/types';
import {PokeInBox} from '@/types/userData/pokebox';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';


type Props = UserDataLazyLoadCommonProps & {
  render: (pokeInBoxList: PokeInBox[]) => React.ReactNode,
};

export const UserDataLazyLoadPokeboxSorted = ({render, ...props}: Props) => {
  return (
    <UserDataLazyLoad
      options={{type: 'pokeboxSorted'}}
      loadingText="Pokebox"
      content={({data}) => render(
        data?.pokeboxSorted?.map((pokeInBox) => migrate({
          original: pokeInBox,
          override: null,
          migrators: pokeInBoxMigrators,
          migrateParams: {},
        })) ?? [],
      )}
      {...props}
    />
  );
};
