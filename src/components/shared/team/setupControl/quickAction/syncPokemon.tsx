import React from 'react';

import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import {useTranslations} from 'next-intl';

import {FlexButton} from '@/components/layout/flex/button';
import {teamSetupControlButtonStyle} from '@/components/shared/team/setupControl/const';
import {PremiumIcon} from '@/components/static/premium/icon';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {Pokebox} from '@/types/userData/pokebox';
import {toPokebox} from '@/utils/team/pokebox/toPokebox';


type Props = {
  actorReturn: UseUserDataActorReturn,
  linkedPokeInBoxUuidList: string[],
  onPokeboxReceived: (pokebox: Pokebox) => void,
};

export const TeamQuickActionSyncPokemon = ({
  actorReturn,
  linkedPokeInBoxUuidList,
  onPokeboxReceived,
}: Props) => {
  const {actAsync, session, status} = actorReturn;

  const t = useTranslations('UI.Component.Team.QuickAction.Sync');
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
          uuid: {$in: linkedPokeInBoxUuidList},
        },
      },
    });

    const pokeInBoxList = updated?.user.lazyLoaded.pokeboxWithFilter;
    if (!pokeInBoxList) {
      return;
    }

    onPokeboxReceived(toPokebox(pokeInBoxList));
  };

  return (
    <FlexButton
      disabled={!actAsync || isSyncing}
      center
      onClick={onSyncClicked}
      className={teamSetupControlButtonStyle}
    >
      <ArrowPathIcon className="size-5"/>
      <PremiumIcon isPremium={isPremium}/>
      <span>{isSyncing ? t('Syncing') : t('Name')}</span>
    </FlexButton>
  );
};
