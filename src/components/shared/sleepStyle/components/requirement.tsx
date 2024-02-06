import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {imageSmallIconSizes} from '@/styles/image';
import {Dimension} from '@/types/style';
import {PokemonSleepStyleProps} from '@/ui/pokedex/page/sleepStyle/type';
import {getSpoRequirement} from '@/utils/game/sleepStyle';
import {formatInt} from '@/utils/number/format/regular';


type Props = PokemonSleepStyleProps & {
  spo: number,
  dimension?: Dimension,
};

export const SleepStyleUnlockRequirement = ({
  snorlaxData,
  sleepStyleUnlockRank,
  spo,
  drowsyPowerMultiplier,
  dimension,
}: Props) => {
  const t = useTranslations('UI.SleepStyle');

  const {
    snorlaxRankMinimum,
    drowsyScore,
  } = React.useMemo(() => getSpoRequirement({
    spo,
    drowsyPowerMultiplier,
    sleepStyleUnlockRank,
    snorlaxData,
  }), [snorlaxData, sleepStyleUnlockRank, spo, drowsyPowerMultiplier]);

  return (
    <Flex direction="row" center noFullWidth className="gap-2">
      {snorlaxRankMinimum && <SnorlaxRankUI rank={snorlaxRankMinimum}/>}
      <Flex direction="row" center noFullWidth className="gap-1">
        <div className={clsx('relative', dimension ?? 'size-6')}>
          <NextImage
            src="/images/generic/snorlax.png"
            alt={t('DrowsyPowerRequirement')}
            sizes={imageSmallIconSizes}
          />
        </div>
        <div>{formatInt(drowsyScore)}</div>
      </Flex>
    </Flex>
  );
};
