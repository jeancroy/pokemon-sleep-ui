import React from 'react';

import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {Flex} from '@/components/layout/flex/common';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


type Props = {
  iconI18nId: I18nMessageKeysOfNamespace<'UI.Stamina.SkillRecovery'>,
  iconSrc: string,
  value: number,
  onValueChanged: (updated: number) => void,
};

export const StaminaConfigSkillRecoveryInput = ({
  iconI18nId,
  iconSrc,
  value,
  onValueChanged,
}: Props) => {
  const t = useTranslations('UI.Stamina.SkillRecovery');

  return (
    <Flex direction="row" noFullWidth className="gap-1.5">
      <GenericIcon alt={t(iconI18nId)} src={iconSrc} dimension="size-7"/>
      <InputBox
        type="number"
        step={0.1}
        min={0}
        className="w-20 text-center"
        value={value.toString()}
        onChange={({target}) => onValueChanged(parseFloat(target.value || '0'))}
      />
    </Flex>
  );
};
