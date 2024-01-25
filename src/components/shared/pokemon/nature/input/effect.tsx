import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, GetMultiSelectOnClickPropsOpts} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {natureEffectIconMap} from '@/const/game/nature';
import {natureStyle} from '@/styles/game/nature';
import {textFilterButtonStyle} from '@/styles/input';
import {NatureEffectDirection, NatureEffectId, natureEffectId} from '@/types/game/pokemon/nature';
import {NatureInfoEffectText} from '@/ui/info/nature/effectText';


type Props<
  TFilter extends FilterWithInclusionMap<NatureEffectId>,
> = GetMultiSelectOnClickPropsOpts<TFilter, NatureEffectId> & {
  direction: NatureEffectDirection,
};

export const PokemonNatureEffectInput = <TFilter extends FilterWithInclusionMap<NatureEffectId>>({
  direction,
  ...props
}: Props<TFilter>) => {
  const t = useTranslations('UI.InPage.Team');

  return (
    <FilterExpandedInput
      title={
        <Flex direction="row" noFullWidth center className={clsx('gap-1', natureStyle[direction])}>
          <div className="size-4">
            {natureEffectIconMap[direction]}
          </div>
          <div>{t('NatureEffect')}</div>
        </Flex>
      }
      idToButton={(id, isActive) => (
        <NatureInfoEffectText
          direction={direction}
          effectId={id}
          isActive={isActive}
        />
      )}
      ids={[...natureEffectId]}
      className={textFilterButtonStyle}
      {...getMultiSelectOnClickProps(props)}
    />
  );
};
