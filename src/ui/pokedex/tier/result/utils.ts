import {PokedexCalcResultEntry} from '@/ui/pokedex/common/calc/type';
import {pokedexTier} from '@/ui/pokedex/tier/result/type';
import {toBucketed} from '@/utils/number/bucket';


type ToBucketsPokedexTierListResultsOpts = {
  sortedData: PokedexCalcResultEntry[],
};

export const toBucketedPokedexTierListResults = ({
  sortedData,
}: ToBucketsPokedexTierListResultsOpts): PokedexCalcResultEntry[][] => {
  return toBucketed({
    data: sortedData,
    getBasis: ({sorter}) => sorter,
    count: pokedexTier.length,
    order: 'desc',
  });
};
