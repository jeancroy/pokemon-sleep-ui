import React from 'react';

import {useSession} from 'next-auth/react';

import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {PokeboxImporterView} from '@/components/shared/pokebox/importer/pokebox';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokeboxImporterViaUuid} from '@/components/shared/pokebox/importer/uuid';
import {UserDataLazyLoadPokeboxSorted} from '@/components/shared/userData/lazyLoad/pokeboxSorted';
import {PokeInBox} from '@/types/userData/pokebox/main';


type Props = PokeboxImporterCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
  isPokeInBoxIncluded?: (pokeInBox: PokeInBox) => boolean,
};

export const PokeboxImporter = ({show, setShow, isPokeInBoxIncluded, ...props}: Props) => {
  const session = useSession();

  return (
    <PopupCommon show={show} setShow={setShow}>
      <Flex className="gap-1.5 sm:w-[60vw]">
        <PokeboxImporterViaUuid {...props}/>
        <UserDataLazyLoadPokeboxSorted
          sessionOverride={session}
          actDeps={[show]}
          toAct={() => show}
          render={(pokeInBoxList) => (
            <PokeboxImporterView
              pokebox={pokeInBoxList
                .filter((pokeInBox) => isPokeInBoxIncluded ? isPokeInBoxIncluded(pokeInBox) : true)}
              {...props}
            />
          )}
        />
      </Flex>
    </PopupCommon>
  );
};
