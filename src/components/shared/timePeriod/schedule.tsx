import React from 'react';

import ClockIcon from '@heroicons/react/24/outline/ClockIcon';
import {format} from 'date-fns/format';
import {formatDuration} from 'date-fns/formatDuration';
import {intervalToDuration} from 'date-fns/intervalToDuration';
import {useTranslations} from 'next-intl';

import {TimePeriodInDate} from '@/types/game/timePeriod';
import {padTimeUnit} from '@/utils/number/format/pad';
import {getTimePeriodPosition} from '@/utils/timePeriod';


type Props = {
  timePeriodInDate: TimePeriodInDate,
  className: string,
  showDuration?: boolean,
};

export const TimePeriodSchedule = ({timePeriodInDate, className, showDuration}: Props) => {
  const {start, end, close} = timePeriodInDate;

  const t = useTranslations('UI.Component.TimePeriodSchedule');

  const position = getTimePeriodPosition(timePeriodInDate);

  return (
    <table className={className}>
      <tbody>
        <tr>
          <td>{t('Start')}</td>
          <td>{format(start, 'yyyy-MM-dd HH:mm')}</td>
        </tr>
        <tr>
          <td>{t('End')}</td>
          <td>{format(end, 'yyyy-MM-dd HH:mm')}</td>
        </tr>
        {
          close && position === 'ended' &&
          <tr>
            <td>{t('Close')}</td>
            <td>{format(close, 'yyyy-MM-dd HH:mm')}</td>
          </tr>
        }
        {
          showDuration &&
          <tr>
            <td><ClockIcon className="size-4"/></td>
            <td>
              {formatDuration(
                intervalToDuration({start, end}),
                {
                  // format: ["hours", "minutes", "seconds"],
                  zero: true,
                  delimiter: ':',
                  locale: {
                    formatDistance: (_token, count) => padTimeUnit(count),
                  },
                },
              )}
            </td>
          </tr>
        }
      </tbody>
    </table>
  );
};
