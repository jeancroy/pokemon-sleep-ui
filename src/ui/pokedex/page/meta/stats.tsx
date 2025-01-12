import React from 'react';

import ArchiveBoxXMarkIcon from '@heroicons/react/24/outline/ArchiveBoxXMarkIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {DreamShardIcon} from '@/components/shared/icon/dreamShard';
import {PokemonCandyIcon} from '@/components/shared/icon/pokemon/candy';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonStats = ({pokemon}: PokemonDataProps) => {
  const {stats, candy} = pokemon;

  const t = useTranslations('UI.Pokemon');
  const t2 = useTranslations('UI.Common');
  const t3 = useTranslations('Game.PokemonCandy');

  return (
    <table className="border-separate border-spacing-1">
      <tbody>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/friendship.png" alt={t('Info.Stats.Friendship')} noInvert/>
          </td>
          <td>
            {stats.friendshipPoints}
          </td>
        </tr>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/clock.png" alt={t('Stats.Frequency.Base')}/>
          </td>
          <td>
            <PokemonFrequency frequency={stats.frequency} noIcon normalText/>
          </td>
        </tr>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/bag.png" alt={t2('MaxCarry')}/>
          </td>
          <td>
            {stats.maxCarry}
          </td>
        </tr>
        <tr>
          <td>
            <GenericIconLarger src="/images/generic/pokebox.png" alt={t('Info.Stats.Recruit')}/>
          </td>
          <td>
            <table className="mx-4 flex border-separate border-spacing-0.5 place-content-center">
              <tbody>
                <tr>
                  <td>
                    <GenericIconLarger src="/images/generic/research.png" alt={t2('ResearchExp')} noInvert/>
                  </td>
                  <td>
                    {stats.recruit.exp}
                  </td>
                </tr>
                <tr>
                  <td>
                    <DreamShardIcon alt={t2('DreamShards')} dimension="size-6" noInvert/>
                  </td>
                  <td>
                    {stats.recruit.shards}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <ArchiveBoxXMarkIcon className="size-5" title={t('Info.Stats.TransferReward')}/>
          </td>
          <td>
            <Flex direction="row" center noFullWidth className="gap-1.5">
              <PokemonCandyIcon pokemon={pokemon} alt={t3(candy.i18nId)} className="scale-150"/>
              <div>{stats.transfer.candy}</div>
            </Flex>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
