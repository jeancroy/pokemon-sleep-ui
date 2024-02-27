'use client';
import React from 'react';

import GiftIcon from '@heroicons/react/24/outline/GiftIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';

import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {textFilterButtonStyle} from '@/styles/input';
import {ResearchRankInfoHeader} from '@/ui/info/researchRank/table/header';
import {ResearchRankInfoRow} from '@/ui/info/researchRank/table/row';
import {ResearchRankInfoDataProps} from '@/ui/info/researchRank/type';


export const ResearchRankInfoTable = ({researchRankData, ...props}: ResearchRankInfoDataProps) => {
  const [showRewards, setShowRewards] = React.useState(true);

  return (
    <Flex className="gap-1 overflow-x-auto overflow-y-hidden">
      <Flex className="items-end">
        <ToggleButton
          active={showRewards}
          className={clsx('group', textFilterButtonStyle)}
          onClick={() => setShowRewards(!showRewards)}
        >
          <Flex direction="row" center noFullWidth className="gap-1">
            <div className="size-6">
              {showRewards ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <GiftIcon className="size-6"/>
          </Flex>
        </ToggleButton>
      </Flex>
      <table className={clsx(
        'info-section-bg border-separate border-spacing-0.5 rounded-lg p-2 text-center [&_td]:px-1.5',
      )}>
        <thead>
          <ResearchRankInfoHeader showRewards={showRewards} {...props}/>
        </thead>
        <tbody>
          {researchRankData.map((entry) => (
            <ResearchRankInfoRow key={entry.rank} entry={entry} showRewards={showRewards} {...props}/>
          ))}
        </tbody>
      </table>
    </Flex>
  );
};
