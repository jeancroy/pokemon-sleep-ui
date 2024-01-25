import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {imagePortraitSizes, imageSmallIconSizes} from '@/styles/image';
import {Ingredient} from '@/types/game/ingredient';


export const IngredientMeta = (ingredient: Ingredient) => {
  const {id, energy, price} = ingredient;

  const t = useTranslations('Game.Food');
  const t2 = useTranslations('UI.Common');

  const ingredientName = t(id.toString());

  return (
    <Flex center className="info-section md:w-fit">
      <div className="text-xl">
        {ingredientName}
      </div>
      <div className="relative size-44 rounded-lg border border-slate-300 dark:border-slate-700">
        <NextImage src={`/images/ingredient/${id}.png`} alt={ingredientName} sizes={imagePortraitSizes}/>
      </div>
      <table className="-m-1 border-separate border-spacing-1 text-xl">
        <tbody>
          <tr>
            <td>
              <ColoredEnergyIcon dimension="size-7" alt={t2('Strength')}/>
            </td>
            <td>
              {energy}
            </td>
          </tr>
          <tr>
            <td>
              <div className="relative size-7">
                <NextImage src="/images/generic/shard.png" alt={t2('DreamShards')} sizes={imageSmallIconSizes}/>
              </div>
            </td>
            <td>
              {price}
            </td>
          </tr>
        </tbody>
      </table>
    </Flex>
  );
};
