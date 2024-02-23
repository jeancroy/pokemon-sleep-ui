import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {MealImage} from '@/components/shared/meal/image';
import {MealLinkContent} from '@/components/shared/meal/link/content';
import {MealLinkCommonProps} from '@/components/shared/meal/link/type';
import {mealTypeBackgroundStyle} from '@/styles/game/mealType';


export const MealLink = (props: MealLinkCommonProps) => {
  const {mealDetails} = props;
  const {id, type} = mealDetails.meal;

  const t = useTranslations('Game.Food');

  const mealName = t(id.toString());

  return (
    <FlexLink
      href={`/meal/${id}`}
      direction="col"
      className={clsx(
        'relative size-full items-end rounded-lg',
        mealTypeBackgroundStyle[type],
      )}
    >
      <MealImage mealId={id} dimension="size-16" className="bottom-0 right-0 opacity-50" isAbsolute/>
      <Flex className="z-10 h-full justify-between gap-2 p-1.5">
        <div className="text-shadow-preset truncate text-left">
          {mealName}
        </div>
        <Flex noFullWidth>
          <MealLinkContent {...props}/>
        </Flex>
      </Flex>
    </FlexLink>
  );
};
