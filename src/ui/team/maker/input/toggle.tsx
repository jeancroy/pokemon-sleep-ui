import React from 'react';

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {getSingleSelectOnClickProps} from '@/components/input/filter/utils/props';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {GenericIngredientSlashIcon} from '@/components/shared/icon/ingredientSlash';
import {textFilterButtonStyle} from '@/styles/input';
import {TeamMakerInputCommonProps} from '@/ui/team/maker/input/type';


export const TeamMakerInputToggles = ({
  input,
  setInput,
}: TeamMakerInputCommonProps) => {
  const {
    previewFinalEvolution,
    showInsufficientIngredients,
  } = input;

  const t = useTranslations('UI.InPage.Team');
  const t2 = useTranslations('UI.InPage.Pokedex.Input');

  return (
    <>
      <FilterTextInput
        title={
          <Flex direction="row" center className="gap-2">
            <EyeIcon className="size-6"/>
            <UserGroupIcon className="size-6"/>
          </Flex>
        }
        ids={[15, 25, 50, 100] as const}
        idToText={(count) => count.toString()}
        {...getSingleSelectOnClickProps({
          filter: input,
          setFilter: setInput,
          filterKey: 'teamCompsToShow',
          allowNull: false,
        })}
      />
      <InputRow className="justify-end">
        <ToggleButton
          active={previewFinalEvolution}
          onClick={() => setInput((original) => ({
            ...original,
            previewFinalEvolution: !original.previewFinalEvolution,
          }))}
          className={clsx('group gap-1', textFilterButtonStyle)}
        >
          {t2('FinalEvolution')}
        </ToggleButton>
        <ToggleButton
          active={showInsufficientIngredients}
          onClick={() => setInput(({showInsufficientIngredients, ...original}) => ({
            ...original,
            showInsufficientIngredients: !showInsufficientIngredients,
          }))}
          className={clsx('gap-1', textFilterButtonStyle)}
        >
          <div className="size-5">
            {showInsufficientIngredients ? <EyeIcon/> : <EyeSlashIcon/>}
          </div>
          <GenericIngredientSlashIcon
            alt={t('Maker.Behavior.ToggleInsufficientIngredients')}
            dimension="size-5"
            noInvert
            isActive={showInsufficientIngredients}
          />
        </ToggleButton>
      </InputRow>
    </>
  );
};
