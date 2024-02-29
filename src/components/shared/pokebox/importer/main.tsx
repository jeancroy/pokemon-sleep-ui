import React from 'react';

import {useSession} from 'next-auth/react';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {PopupCommon} from '@/components/popup/common/main';
import {PokeboxImporterContent} from '@/components/shared/pokebox/importer/content';
import {PokeboxImporterCommonProps} from '@/components/shared/pokebox/importer/type';
import {PokeboxImporterViaUuid} from '@/components/shared/pokebox/importer/uuid';
import {UserDataLazyLoadPokeboxSorted} from '@/components/shared/userData/lazyLoad/pokeboxSorted';


type Props = PokeboxImporterCommonProps & {
  show: boolean,
  setShow: (show: boolean) => void,
};

export const PokeboxImporter = ({isPokeInBoxIncluded, show, setShow, ...props}: Props) => {
  const session = useSession();

  return (
    <PopupCommon show={show} setShow={setShow}>
      <Flex className="gap-1.5 sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] 2xl:w-[25vw]">
        <AdsUnit/>
        <PokeboxImporterViaUuid {...props}/>
        <UserDataLazyLoadPokeboxSorted
          sessionOverride={session}
          actDeps={[show]}
          toAct={() => show}
          render={(pokeInBoxList) => (
            <PokeboxImporterContent
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
