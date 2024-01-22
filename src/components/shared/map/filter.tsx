import React from 'react';

import {useTranslations} from 'next-intl';

import {useFilterPremiumRestrictable} from '@/components/input/filter/common/premium/hook';
import {FilterPremiumRestrictableProps} from '@/components/input/filter/common/premium/type';
import {FilterInputOnClickProps} from '@/components/input/filter/common/type';
import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {PremiumIcon} from '@/components/static/premium/icon';
import {imageGallerySizes} from '@/styles/image';
import {textFilterButtonStyle} from '@/styles/input';
import {SleepMapId} from '@/types/game/sleepStyle';


type Props = FilterInputOnClickProps<SleepMapId> & FilterPremiumRestrictableProps & {
  mapIds: SleepMapId[],
  highlight?: boolean,
  title?: React.ReactNode,
};

export const MapFilter = ({onClick, mapIds, highlight, title, ...props}: Props) => {
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game');

  const {
    isInputRestricted,
    isInputChangeRestricted,
  } = useFilterPremiumRestrictable(props);

  return (
    <FilterExpandedInput
      style={highlight ? 'highlight' : undefined}
      title={
        <Flex direction="row" center className="gap-1">
          {isInputRestricted && <PremiumIcon/>}
          <div>{title ?? t('Map')}</div>
        </Flex>
      }
      ids={mapIds}
      idToButton={(id) => {
        const mapName = t2(`Field.${id}`);

        return (
          <>
            <div className="relative -mx-2 h-full w-40">
              <NextImage
                src={`/images/field/${id}.png`}
                alt={mapName}
                sizes={imageGallerySizes} className="rounded-full opacity-50 dark:opacity-25"
              />
            </div>
            <Flex center className="absolute z-10 h-full">
              <div>{mapName}</div>
            </Flex>
          </>
        );
      }}
      className={textFilterButtonStyle}
      onClick={(id) => {
        if (isInputChangeRestricted()) {
          return;
        }

        onClick(id);
      }}
      {...props}
    />
  );
};
