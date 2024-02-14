import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {PremiumIcon} from '@/components/static/premium/icon';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';
import {TeamAnalysisSetupUpdateCommonProps} from '@/ui/team/analysis/setup/control/setup/common/type';
import {teamAnalysisSetupActionButtonStyle} from '@/ui/team/analysis/setup/control/setup/const';
import {toPokebox} from '@/utils/team/pokebox/toPokebox';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisQuickActionSyncAllPokemon = ({
  actorReturn,
  setupControl,
  currentTeam,
}: TeamAnalysisSetupUpdateCommonProps) => {
  const {actAsync, session, status} = actorReturn;
  const {updatePokemonFromPokebox} = setupControl;
  const {members} = currentTeam;

  const t = useTranslations('UI.InPage.Team.Analysis');
  const {isPremium} = useUserActivation(session.data);
  const {showPremiumRequiredToast} = usePremiumRequiredToast();

  const isSyncing = status === 'processing';

  const onSyncClicked = async () => {
    if (!isPremium) {
      showPremiumRequiredToast();
      return;
    }

    if (!actAsync) {
      return;
    }

    const {updated} = await actAsync({
      action: 'load',
      options: {
        type: 'pokeboxWithFilter',
        opts: {
          uuid: {$in: Object.values(members)
            .filter(isNotNullish)
            .map(({linkedPokeInBoxUuid}) => linkedPokeInBoxUuid)
            .filter(isNotNullish)},
        },
      },
    });

    const pokeInBoxList = updated?.user.lazyLoaded.pokeboxWithFilter;
    if (!pokeInBoxList) {
      return;
    }

    updatePokemonFromPokebox(toPokebox(pokeInBoxList));
  };

  return (
    <FlexButton
      disabled={!actAsync || isSyncing}
      center
      onClick={onSyncClicked}
      className={teamAnalysisSetupActionButtonStyle}
    >
      <ArrowPathIcon className="size-5"/>
      {!isPremium && <PremiumIcon/>}
      <span>{isSyncing ? t('Sync.Syncing') : t('Sync.Name')}</span>
    </FlexButton>
  );
};
