import React from 'react';

import ArrowRightIcon from '@heroicons/react/24/outline/ArrowRightIcon';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {StaminaCurrent} from '@/components/shared/stamina/current';
import {staminaEventTypeI18nId} from '@/const/game/stamina';
import {StaminaEventLog} from '@/types/game/stamina/event';
import {formatSignedNumber} from '@/utils/number/format/signed';
import {formatSeconds, rotateTime} from '@/utils/time';


type Props = {
  logs: StaminaEventLog[],
  timingOffset: number,
};

export const StaminaLogsUI = ({logs, timingOffset}: Props) => {
  const t = useTranslations('UI.Stamina.EventType');
  const t2 = useTranslations('UI.Common');

  return (
    <table className="-m-1 border-separate border-spacing-0.5">
      <tbody>
        {logs.map(({type, timing, stamina}) => (
          <tr key={timing} className="odd:bg-slate-500/10">
            <td>
              {formatSeconds({seconds: rotateTime(timingOffset + timing), omitSeconds: true})}
            </td>
            <td>
              {t(staminaEventTypeI18nId[type])}
            </td>
            <td>
              <Flex direction="row" center className="gap-1">
                <StaminaCurrent alt={t2('Stamina')} stamina={stamina.before}/>
                <ArrowRightIcon className="size-4"/>
                <StaminaCurrent alt={t2('Stamina')} stamina={stamina.after}/>
              </Flex>
            </td>
            <td>
              {formatSignedNumber({format: 'int', num: stamina.after - stamina.before || null})}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
