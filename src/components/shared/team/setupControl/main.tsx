import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {Flex} from '@/components/layout/flex/common';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {TeamSelector} from '@/components/shared/team/selector/main';
import {TeamSelectorCommonProps} from '@/components/shared/team/selector/type';
import {TeamLayoutControlUI} from '@/components/shared/team/setupControl/layoutControl/main';
import {TeamQuickActionGlobalLevel} from '@/components/shared/team/setupControl/quickAction/globalLevel';
import {TeamQuickActionSyncPokemon} from '@/components/shared/team/setupControl/quickAction/syncPokemon';
import {TeamSetupControlDataProps} from '@/components/shared/team/setupControl/type';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {productionPeriodI18nId} from '@/const/game/production/i18n';
import {UseUserDataActorReturn} from '@/hooks/userData/actor/type';
import {productionPeriod} from '@/types/game/producing/display';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamData} from '@/types/game/team/team';
import {UserDataUploadOpts} from '@/types/userData/upload';
import {getCurrentTeam} from '@/utils/team/setup/getCurrentTeam';
import {isNotNullish, Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> = TeamSetupControlDataProps & Omit<TeamSelectorCommonProps<TKey, TMember, TConfig, TTeam, TSetup>, 'memberList'> & {
  currentTeam: TTeam,
  actorReturn: UseUserDataActorReturn,
  uploadOpts: UserDataUploadOpts,
};

export const TeamSetupControlUI = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  fieldMetaMap,
  pokemonList,
  currentTeam,
  actorReturn,
  uploadOpts,
  ...props
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {setupControl} = props;
  const {
    setSetup,
    layoutControl,
    setCurrentMemberReplaceAll,
    updatePokemonFromPokebox,
  } = setupControl;
  const {session} = actorReturn;

  const t = useTranslations('UI.Component.Team.SetupControl');
  const t2 = useTranslations('UI.Producing.Period');

  const memberList = Object.values<TMember>(currentTeam.members);

  return (
    <Flex className="gap-1">
      <SnorlaxFavoriteInput
        filter={currentTeam}
        setFilter={(getUpdatedTeam) => setSetup((setup) => {
          const updated = getUpdatedTeam(getCurrentTeam({setup}));

          return {
            ...setup,
            teams: {
              ...setup.teams,
              [updated.uuid]: updated,
            },
          };
        })}
        filterKey="snorlaxFavorite"
        fieldMetaMap={fieldMetaMap}
        pokemonList={pokemonList}
      />
      <FilterTextInput
        title={t('Period')}
        idToText={(period) => t2(productionPeriodI18nId[period])}
        ids={[...productionPeriod]}
        isActive={(period) => period === currentTeam.analysisPeriod}
        onClick={(analysisPeriod) => setSetup((setup) => ({
          ...setup,
          teams: {
            ...setup.teams,
            [currentTeam.uuid]: {
              ...currentTeam,
              analysisPeriod,
            },
          },
        }))}
      />
      <TeamQuickActionGlobalLevel
        onLevelSelected={(level) => setCurrentMemberReplaceAll({update: {level}})}
      />
      <InputRow className="justify-end gap-1">
        <TeamSelector
          className="mr-auto shrink-0"
          status={session.status}
          {...props}
        />
        <Flex direction="row" noFullWidth wrap className="justify-end gap-1">
          <TeamQuickActionSyncPokemon
            actorReturn={actorReturn}
            onPokeboxReceived={updatePokemonFromPokebox}
            linkedPokeInBoxUuidList={memberList.map((member) => member?.linkedPokeInBoxUuid).filter(isNotNullish)}
          />
          <TeamLayoutControlUI layoutControl={layoutControl}/>
          <UserDataUploadButton opts={uploadOpts}/>
        </Flex>
      </InputRow>
    </Flex>
  );
};
