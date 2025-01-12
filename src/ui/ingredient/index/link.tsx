import React from 'react';

import {useTranslations} from 'next-intl';

import {FlexLink} from '@/components/layout/flex/link';
import {NextImage} from '@/components/shared/common/image/main';
import {DreamShardIcon} from '@/components/shared/icon/dreamShard';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {imageSmallIconSizes} from '@/styles/image';
import {Ingredient} from '@/types/game/ingredient';


type Props = {
  ingredient: Ingredient,
};

export const IngredientLink = ({ingredient}: Props) => {
  const {id, price, energy} = ingredient;
  const t = useTranslations('UI.Common');
  const t2 = useTranslations('Game.Food');

  const ingredientName = t2(id.toString());

  return (
    <FlexLink
      href={`/ingredient/${id}`}
      direction="col"
      center
      className="button-clickable-bg w-full gap-0.5 p-1"
    >
      <div className="relative size-12">
        <NextImage src={`/images/ingredient/${id}.png`} alt={ingredientName} sizes={imageSmallIconSizes}/>
      </div>
      <div className="whitespace-nowrap p-1">
        {ingredientName}
      </div>
      <table className="-m-1 border-separate border-spacing-0.5 text-sm">
        <tbody>
          <tr>
            <td>
              <ColoredStrengthIcon dimension="size-4" alt={t('Strength')}/>
            </td>
            <td>
              {energy}
            </td>
          </tr>
          <tr>
            <td>
              <DreamShardIcon alt={t('DreamShards')} dimension="size-4" noInvert/>
            </td>
            <td>
              {price}
            </td>
          </tr>
        </tbody>
      </table>
    </FlexLink>
  );
};
