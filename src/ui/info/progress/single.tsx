import React from 'react';

import {XCircleIcon} from '@heroicons/react/24/outline';
import GiftIcon from '@heroicons/react/24/outline/GiftIcon';
import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {PotIcon} from '@/components/shared/icon/pot';
import {ItemPackUI} from '@/components/shared/item/pack';
import {MapLink} from '@/components/shared/map/link';
import {gameFeatureI18nId} from '@/const/game/progress';
import {PokedexMap} from '@/types/game/pokemon';
import {PotInfo} from '@/types/game/potInfo';
import {GameProgressData} from '@/types/game/progress';
import {GameProgressInfoSection} from '@/ui/info/progress/section';
import {getItemPackKey} from '@/utils/game/item';
import {formatInt} from '@/utils/number/format/regular';


type Props = {
  pokedexMap: PokedexMap,
  potInfoList: PotInfo[],
  data: GameProgressData,
};

export const GameProgressSingle = ({pokedexMap, potInfoList, data}: Props) => {
  const {
    sleepStyleUnlocksRequired,
    mapUnlock,
    maxMapBonusPercent,
    maxPotLevel,
    featureUnlock,
    rewardDiamonds,
    rewardItems,
  } = data;

  const t = useTranslations('UI.Common');
  const t2 = useTranslations('UI.InPage.Info');
  const t3 = useTranslations('UI.Game.Feature');
  const t4 = useTranslations('Game.Field');

  return (
    <Flex center className="bg-plate gap-1">
      <Flex direction="row" center noFullWidth className="gap-1.5 text-lg">
        <span>
          {t2('Progress.SleepStylesUnlocked')}
        </span>
        <GenericIconLarger
          src="/images/generic/sleep.png"
          alt={t2('Progress.SleepStylesUnlocked')}
          className="invert-hoverable"
        />
        <span>
          {sleepStyleUnlocksRequired}
        </span>
      </Flex>
      <HorizontalSplitter className="w-full"/>
      <GameProgressInfoSection highlight title={
        <>
          <GenericIconLarger src="/images/generic/map.png" alt={t('Map')}/>
          <span>{t2('Progress.MapUnlock')}</span>
        </>
      }>
        {
          mapUnlock ?
            <MapLink mapId={mapUnlock} className="size-full">
              {t4(mapUnlock.toString())}
            </MapLink> :
            <XCircleIcon className="size-6"/>
        }
      </GameProgressInfoSection>
      <GameProgressInfoSection highlight title={
        <>
          <ChevronUpIcon className="size-5"/>
          <span>{t2('Progress.MaxMapBonusPercent')}</span>
        </>
      }>
        <span className="text-xl">
          {formatInt(maxMapBonusPercent)}%
        </span>
      </GameProgressInfoSection>
      <GameProgressInfoSection title={
        <>
          <PotIcon className="size-6" alt={t2('Progress.MaxPotCapacity')}/>
          <span>{t2('Progress.MaxPotCapacity')}</span>
        </>
      }>
        <span className="text-xl">
          {potInfoList.find(({level}) => level === maxPotLevel)?.capacity ?? '-'}
        </span>
      </GameProgressInfoSection>
      <GameProgressInfoSection title={
        <>
          <LockOpenIcon className="size-4"/>
          <span>{t2('Progress.FeatureUnlock')}</span>
        </>
      }>
        <span className="text-xl">
          {featureUnlock ? t3(gameFeatureI18nId[featureUnlock]) : '-'}
        </span>
      </GameProgressInfoSection>
      <GameProgressInfoSection flexibleChildrenHeight title={
        <>
          <GiftIcon className="size-4"/>
          <span>{t2('Progress.Rewards')}</span>
        </>
      }>
        <ItemPackUI
          itemPack={{meta: {type: 'diamond'}, count: rewardDiamonds}}
          pokedexMap={pokedexMap}
        />
        {rewardItems.map((itemPack) => (
          <ItemPackUI
            key={getItemPackKey(itemPack)}
            itemPack={itemPack}
            pokedexMap={pokedexMap}
          />
        ))}
      </GameProgressInfoSection>
    </Flex>
  );
};
