import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {MapLink} from '@/components/shared/map/link';
import {SnorlaxRankUI} from '@/components/shared/snorlax/rank';
import {SleepMapId} from '@/types/game/sleepStyle';
import {I18nMessageKeysOfNamespace} from '@/types/i18n';
import {AnalysisStatsSleepStyleAppearance} from '@/ui/analysis/page/calc/type';
import {AnalysisStatsContinuousUI} from '@/ui/analysis/page/result/continuous';


type Props = {
  stats: AnalysisStatsSleepStyleAppearance,
  mapId: SleepMapId,
  i18nTitleKey: I18nMessageKeysOfNamespace<'UI.InPage.Analysis'>,
};

export const AnalysisStatsAppearanceUI = ({stats, mapId, i18nTitleKey}: Props) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Analysis');

  const mapName = t(`Field.${mapId}`);

  return (
    <AnalysisStatsContinuousUI
      stats={stats}
      title={t2(i18nTitleKey, {mapName})}
      renderData={({data}) => <SnorlaxRankUI rank={data} hideTextBelowMd/>}
    >
      <MapLink mapId={mapId} className="size-full p-1.5">
        <Flex center wrap className="gap-1.5 md:flex-row">
          <div className="whitespace-nowrap text-xl">
            {mapName}
          </div>
          <SnorlaxRankUI rank={stats.snorlaxRank}/>
        </Flex>
      </MapLink>
    </AnalysisStatsContinuousUI>
  );
};
