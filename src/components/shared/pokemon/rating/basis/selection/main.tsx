import React from 'react';

import {useTranslations} from 'next-intl';
import ReactMarkdown from 'react-markdown';

import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {Flex} from '@/components/layout/flex/common';
import {RatingBasisSelectionBase} from '@/components/shared/pokemon/rating/basis/selection/base';
import {RatingBasisSelectionCommonProps} from '@/components/shared/pokemon/rating/basis/selection/type';
import {RatingBasisTitle} from '@/components/shared/pokemon/rating/basis/title';
import {ratingBasisExplainerI18nId} from '@/const/game/rating';
import {RatingBasis, ratingBasis} from '@/types/game/pokemon/rating/config';


export const RatingBasisSelection = (props: RatingBasisSelectionCommonProps<RatingBasis>) => {
  const {current} = props;

  const t = useTranslations('UI.Rating.Basis');

  return (
    <Flex>
      <RatingBasisSelectionBase
        {...props}
        ids={[...ratingBasis]}
        idToButton={(basis, isActive) => (
          <RatingBasisTitle basis={basis} isActive={isActive}/>
        )}
      />
      <AnimatedCollapseQuick key={current} show appear>
        <ReactMarkdown className="info-highlight-inner markdown mt-2 p-2 text-left">
          {t(ratingBasisExplainerI18nId[current])}
        </ReactMarkdown>
      </AnimatedCollapseQuick>
    </Flex>
  );
};
