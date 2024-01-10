import React from 'react';

import {Flex} from '@/components/layout/flex/common';
import {ProgressBarSingle} from '@/components/progressBar/single';
import {CompletionResultUI} from '@/components/shared/completion/main';
import {SleepdexMap} from '@/types/game/sleepdex';
import {SleepStyleNormalMap, SleepStyleSpecialMap} from '@/types/game/sleepStyle';
import {getAllPossibleSleepStyles} from '@/utils/game/sleepdex';


type Props = {
  sleepStyleMap: SleepStyleNormalMap,
  sleepStyleSpecialMap: SleepStyleSpecialMap,
  sleepdex: SleepdexMap,
};

export const SleepdexRecordUnlockedCount = ({sleepStyleMap, sleepStyleSpecialMap, sleepdex}: Props) => {
  const total = React.useMemo(
    () => (
      getAllPossibleSleepStyles({normal: sleepStyleMap, special: sleepStyleSpecialMap}).length
    ),
    [sleepStyleMap, sleepStyleSpecialMap],
  );
  const count = React.useMemo(
    () => Object.values(sleepdex).map((unlocked) => !!unlocked).length
    , [sleepdex],
  );

  return (
    <Flex className="info-section">
      <CompletionResultUI completed={count} total={total} className="self-end"/>
      <ProgressBarSingle percent={count / total * 100}/>
    </Flex>
  );
};
