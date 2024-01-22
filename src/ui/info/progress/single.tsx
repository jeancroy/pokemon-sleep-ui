import React from 'react';

import {XCircleIcon} from '@heroicons/react/24/outline';
import GiftIcon from '@heroicons/react/24/outline/GiftIcon';
import LockOpenIcon from '@heroicons/react/24/outline/LockOpenIcon';
import ChevronUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {GenericIconLarger} from '@/components/shared/icon/common/larger';
import {DiamondIcon} from '@/components/shared/icon/diamond';
import {ItemIcon} from '@/components/shared/icon/item';
import {PotIcon} from '@/components/shared/icon/pot';
import {MapLink} from '@/components/shared/map/link';
import {gameFeatureI18nId} from '@/const/game/progress';
import {potCapacityData} from '@/data/potCapacity';
import {GameProgressData} from '@/types/game/progress';
import {GameProgressRewardItem} from '@/ui/info/progress/rewardItem';
import {GameProgressInfoSection} from '@/ui/info/progress/section';
import {formatInt} from '@/utils/number/format';


type Props = {
  data: GameProgressData,
};

export const GameProgressSingle = ({data}: Props) => {
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
  const t5 = useTranslations('Game.Item');

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
            <MapLink mapId={mapUnlock} className="h-full w-full">
              {t4(mapUnlock.toString())}
            </MapLink> :
            <XCircleIcon className="h-6 w-6"/>
        }
      </GameProgressInfoSection>
      <GameProgressInfoSection highlight title={
        <>
          <ChevronUpIcon className="h-5 w-5"/>
          <span>{t2('Progress.MaxMapBonusPercent')}</span>
        </>
      }>
        <span className="text-xl">
          {formatInt(maxMapBonusPercent)}%
        </span>
      </GameProgressInfoSection>
      <GameProgressInfoSection title={
        <>
          <PotIcon className="h-6 w-6" alt={t2('Progress.MaxPotCapacity')}/>
          <span>{t2('Progress.MaxPotCapacity')}</span>
        </>
      }>
        <span className="text-xl">
          {potCapacityData.find(({level}) => level === maxPotLevel)?.capacity ?? '-'}
        </span>
      </GameProgressInfoSection>
      <GameProgressInfoSection title={
        <>
          <LockOpenIcon className="h-4 w-4"/>
          <span>{t2('Progress.FeatureUnlock')}</span>
        </>
      }>
        <span className="text-xl">
          {featureUnlock ? t3(gameFeatureI18nId[featureUnlock]) : '-'}
        </span>
      </GameProgressInfoSection>
      <GameProgressInfoSection flexibleChildrenHeight title={
        <>
          <GiftIcon className="h-4 w-4"/>
          <span>{t2('Progress.Rewards')}</span>
        </>
      }>
        <GameProgressRewardItem
          icon={<DiamondIcon alt={t('Diamond')} noInvert/>}
          count={rewardDiamonds}
        />
        {rewardItems.map(({id, count}) => (
          <GameProgressRewardItem
            key={id}
            icon={
              <>
                <ItemIcon itemId={id} alt={t5(id.toString())} dimension="h-6 w-6" noInvert/>
                <span>{t5(id.toString())}</span>
              </>
            }
            count={count}
          />
        ))}
      </GameProgressInfoSection>
    </Flex>
  );
};
