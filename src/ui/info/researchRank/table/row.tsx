import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {DreamShardIcon} from '@/components/shared/icon/dreamShard';
import {ItemPackUI} from '@/components/shared/item/pack';
import {ResearchRankData} from '@/types/game/researchRank';
import {ResearchRankInfoTableCommonProps} from '@/ui/info/researchRank/table/type';
import {getItemPackKey} from '@/utils/game/item';
import {formatInt} from '@/utils/number/format/regular';


type Props = ResearchRankInfoTableCommonProps & {
  entry: ResearchRankData,
};

export const ResearchRankInfoRow = ({pokedexMap, dreamClusterData, showRewards, entry}: Props) => {
  const {
    rank,
    toNext,
    accumulated,
    pokemonMaxLevel,
    dreamClusterBase,
    rewards,
  } = entry;

  const t = useTranslations('UI.Common');

  return (
    <tr>
      <td>{rank}</td>
      <td>{formatInt(toNext)}</td>
      <td>{formatInt(accumulated)}</td>
      <td>{formatInt(pokemonMaxLevel)}</td>
      {dreamClusterData.map(({itemId, multiplier}) => (
        <td key={itemId}>
          <Flex direction="row" noFullWidth center className="items-center gap-1">
            <DreamShardIcon alt={t('DreamShards')} noShrink/>
            <span>{formatInt(dreamClusterBase * multiplier)}</span>
          </Flex>
        </td>
      ))}
      {
        showRewards &&
        <td className="w-40">
          <Flex direction="row" className="gap-1.5 px-2">
            {rewards.map((reward) => (
              <ItemPackUI
                key={getItemPackKey(reward)}
                pokedexMap={pokedexMap}
                itemPack={reward}
                hideName
              />
            ))}
          </Flex>
        </td>
      }
    </tr>
  );
};
