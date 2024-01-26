import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';


type Props = {
  titleI18nId: I18nMessageKeysOfNamespace<'UI.Stamina.State'>,
  value: number | null,
};

export const StaminaEfficiencyAtState = ({titleI18nId, value}: Props) => {
  const t = useTranslations('UI.Stamina.State');

  return (
    <Flex direction="row" noFullWidth className="items-end gap-1">
      <div className="text-xs">{t(titleI18nId)}</div>
      <div>{value ? value.toFixed(4) : NaN}x</div>
    </Flex>
  );
};
