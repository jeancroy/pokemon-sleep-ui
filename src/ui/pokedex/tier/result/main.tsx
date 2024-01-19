import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {usePokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/hook';
import {PokemonLinkPopup} from '@/components/shared/pokemon/linkPopup/main';
import {PokedexCalcResultEntry} from '@/ui/pokedex/common/calc/type';
import {PokedexTierListInput} from '@/ui/pokedex/tier/input/type';
import {PokedexTierListSingle} from '@/ui/pokedex/tier/result/single/main';
import {pokedexTier} from '@/ui/pokedex/tier/result/type';
import {toBucketedPokedexTierListResults} from '@/ui/pokedex/tier/result/utils';


type Props = {
  input: PokedexTierListInput,
  sortedData: PokedexCalcResultEntry[],
};

export const PokedexTierListResult = ({input, sortedData}: Props) => {
  const {showPokemon, ...pokemonLinkPopup} = usePokemonLinkPopup();
  const resultBuckets = toBucketedPokedexTierListResults({sortedData});

  const bucketSizes = resultBuckets.map((bucket) => bucket.length);
  const largestBucket = Math.max(...bucketSizes);

  return (
    <Flex className="gap-1.5">
      <PokemonLinkPopup {...pokemonLinkPopup}/>
      {resultBuckets.map((bucket, idx) => (
        <PokedexTierListSingle
          key={idx}
          input={input}
          tier={pokedexTier[idx]}
          bucket={bucket}
          sizePercentage={bucketSizes[idx] / largestBucket * 100}
          onPokemonClicked={showPokemon}
        />
      ))}
    </Flex>
  );
};
