import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {LevelIcon} from '@/components/shared/icon/lv';
import {NumberSliderRequiredProps} from '@/components/shared/input/number/required/type';
import {NumberPresetRequired} from '@/components/shared/input/number/required/withPreset';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useNumericPokemonKeyLevels} from '@/hooks/pokemon/keyLevel/numeric';


export const PokemonLevelSlider = (props: Omit<NumberSliderRequiredProps, 'text' | 'max'>) => {
  const t = useTranslations('UI.Pokemon.Individual');

  const {pokemonMaxLevel} = useCommonServerData();
  const presetLevels = useNumericPokemonKeyLevels();

  return (
    <NumberPresetRequired
      {...props}
      sliderTitle={t('Level')}
      presetTitle={
        <Flex center>
          <LevelIcon/>
        </Flex>
      }
      presetValues={presetLevels}
      max={pokemonMaxLevel}
    />
  );
};
