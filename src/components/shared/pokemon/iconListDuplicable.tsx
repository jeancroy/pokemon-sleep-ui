import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Link from 'next-intl/link';

import {Flex} from '@/components/layout/flex';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokemonId} from '@/types/mongo/pokemon';
import {IconWithInfo} from '@/ui/ingredient/page/iconInfo';


type Props<TData> = {
  dataWithPokemonId: TData[] | undefined,
  getPokemonId: (data: TData) => PokemonId,
  getInfo?: (data: TData) => React.ReactNode,
  getReactKey?: (data: TData) => React.Key,
};

export const PokemonIconListDuplicable = <TData, >({
  dataWithPokemonId,
  getPokemonId,
  getInfo,
  getReactKey,
}: Props<TData>) => {
  const t = useTranslations('Game.PokemonName');

  if (!dataWithPokemonId?.length) {
    return (
      <div className="p-1.5">
        <div className="relative h-12 w-12">
          <Image src="/images/generic/pokeball_unavailable.png" alt="N/A" fill sizes={imageSmallIconSizes}/>
        </div>
      </div>
    );
  }

  return (
    <Flex direction="row" center wrap>
      {dataWithPokemonId.map((data, idx) => {
        const id = getPokemonId(data);

        return (
          <Link key={getReactKey ? getReactKey(data) : idx} href={`/pokedex/${id}`}>
            <div className="button-clickable p-1.5">
              <IconWithInfo
                imageSrc={`/images/pokemon/icons/${id}.png`}
                imageAlt={t(id.toString())}
                imageDimension="h-12 w-12"
                imageSizes={imageIconSizes}
                info={getInfo && getInfo(data)}
              />
            </div>
          </Link>
        );
      })}
    </Flex>
  );
};
