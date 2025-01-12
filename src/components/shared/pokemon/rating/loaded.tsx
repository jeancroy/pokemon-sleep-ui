import React from 'react';

import Cog6ToothIcon from '@heroicons/react/24/solid/Cog6ToothIcon';
import {Session} from 'next-auth';

import {AdsUnit} from '@/components/ads/main';
import {Flex} from '@/components/layout/flex/common';
import {RatingConfigPopup} from '@/components/shared/pokemon/rating/config/main';
import {useRatingResult} from '@/components/shared/pokemon/rating/hooks/result';
import {useRatingWeightedStats} from '@/components/shared/pokemon/rating/hooks/stats';
import {RatingResultInput} from '@/components/shared/pokemon/rating/input';
import {RatingResultChart} from '@/components/shared/pokemon/rating/section/chart/main';
import {RatingDetails} from '@/components/shared/pokemon/rating/section/details/main';
import {RatingResultSummary} from '@/components/shared/pokemon/rating/section/summary';
import {RatingResultProps, RatingSummaryCommonProps} from '@/components/shared/pokemon/rating/type';
import {defaultRatingConfig} from '@/const/game/rating/common';
import {useAutoUpload} from '@/hooks/userData/autoUpload';
import {RatingConfig} from '@/types/game/pokemon/rating/config';
import {migrate} from '@/utils/migrate/main';
import {ratingConfigMigrators} from '@/utils/migrate/ratingConfig/migrators';
import {Nullable} from '@/utils/type';


type Props = RatingResultProps & {
  session: Nullable<Session>,
  preloadedConfig: Nullable<RatingConfig>,
};

const RatingResultLoadedInternal = ({
  session,
  preloadedConfig,
  ...props
}: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const {request} = props;

  const [show, setShow] = React.useState(false);
  const [config, setConfig] = React.useState<RatingConfig>(migrate({
    original: defaultRatingConfig,
    override: preloadedConfig ?? null,
    migrators: ratingConfigMigrators,
    migrateParams: {},
  }));
  const {
    activeNumericKeyLevels,
    resultMap,
    updateResultOfLevel,
  } = useRatingResult({request});

  const {basis} = config;
  const ratingSummaryCommonProps: RatingSummaryCommonProps = {
    activeNumericKeyLevels,
    resultMap,
    config,
  };
  const weightedRating = useRatingWeightedStats(ratingSummaryCommonProps);

  useAutoUpload({
    opts: {
      type: 'config.rating',
      data: config,
    },
    triggerDeps: [config],
  });

  return (
    <>
      <RatingConfigPopup
        initial={config}
        show={show}
        setShow={setShow}
        onClose={setConfig}
      />
      <Flex ref={ref} className="items-end">
        <button className="button-clickable-bg size-8 rounded-full p-1" onClick={() => setShow(true)}>
          <Cog6ToothIcon/>
        </button>
      </Flex>
      <RatingResultInput session={session} config={config} setConfig={setConfig}/>
      <RatingResultSummary
        rating={weightedRating}
        basis={basis}
        {...props}
      />
      <RatingResultChart {...ratingSummaryCommonProps}/>
      <AdsUnit hideIfNotBlocked/>
      <RatingDetails
        onRated={updateResultOfLevel}
        {...props}
        {...ratingSummaryCommonProps}
      />
    </>
  );
};

export const RatingResultLoaded = React.forwardRef(RatingResultLoadedInternal);
