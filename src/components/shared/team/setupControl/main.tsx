import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/preset/text';
import {InputRow} from '@/components/input/filter/row';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {CookingConfigDataProps} from '@/components/shared/cooking/config/type';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {TeamSelector} from '@/components/shared/team/selector/main';
import {TeamSelectorCommonProps} from '@/components/shared/team/selector/type';
import {TeamUserConfig} from '@/components/shared/team/setupControl/config/main';
import {TeamLayoutControlUI} from '@/components/shared/team/setupControl/layoutControl/main';
import {TeamQuickActionGlobalLevel} from '@/components/shared/team/setupControl/quickAction/globalLevel';
import {TeamQuickActionSyncPokemon} from '@/components/shared/team/setupControl/quickAction/syncPokemon';
import {TeamMemberStatsTypeInput} from '@/components/shared/team/setupControl/statsType/input';
import {TeamSetupControlDataProps} from '@/components/shared/team/setupControl/type';
import {UserDataUploadButton} from '@/components/shared/userData/upload';
import {productionPeriodI18nId} from '@/const/game/production/i18n';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {productionPeriod} from '@/types/game/producing/display';
import {TeamSetupConfig} from '@/types/game/team/config';
import {TeamMemberData, TeamMemberKey} from '@/types/game/team/member';
import {TeamSetup} from '@/types/game/team/setup';
import {TeamMemberStatsType} from '@/types/game/team/statsType';
import {TeamData, TeamMetadata} from '@/types/game/team/team';
import {UserDataUploadOpts} from '@/types/userData/upload';
import {cloneMerge} from '@/utils/object/cloneMerge';
import {isNotNullish, Nullable} from '@/utils/type';


type Props<
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
> =
  TeamSetupControlDataProps &
  CookingConfigDataProps &
  Omit<TeamSelectorCommonProps<TKey, TMember, TConfig, TTeam, TSetup>, 'memberList'> & {
    uploadOpts: UserDataUploadOpts,
    hideManualStaminaSkillRecovery?: boolean,
  };

export const TeamSetupControlUI = <
  TKey extends TeamMemberKey,
  TMember extends Nullable<TeamMemberData>,
  TConfig extends TeamSetupConfig,
  TTeam extends TeamData<TKey, TMember>,
  TSetup extends TeamSetup<TKey, TMember, TConfig, TTeam>,
>({
  pokemonList,
  uploadOpts,
  hideManualStaminaSkillRecovery,
  ...props
}: Props<TKey, TMember, TConfig, TTeam, TSetup>) => {
  const {setupControl} = props;
  const {
    actorReturn,
    layoutControl,
    premiumInputControl,
    currentTeam,
    currentCalculatedConfigBundle,
    setCurrentTeam,
    setCurrentMemberReplaceAll,
    updatePokemonFromPokebox,
  } = setupControl;
  const {isPremium} = premiumInputControl;
  const {session} = actorReturn;
  const {bundle} = currentCalculatedConfigBundle;

  const {fieldMetaMap} = useCommonServerData();

  const t = useTranslations('UI.Component.Team.SetupControl');
  const t2 = useTranslations('UI.Producing.Period');

  const memberList = Object.values<TMember>(currentTeam.members);

  return (
    <Flex className="gap-1">
      <TeamUserConfig
        bundle={bundle}
        cookingConfig={bundle.cookingConfig}
        setStaminaConfig={(stamina) => setCurrentTeam((currentTeam) => ({
          ...currentTeam,
          configOverride: {...currentTeam.configOverride, stamina},
        }))}
        setStaminaSkillTrigger={(recovery) => setCurrentTeam((currentTeam) => ({
          ...currentTeam,
          configOverride: cloneMerge(currentTeam.configOverride, {stamina: {skillRecovery: {recovery}}}),
        }))}
        setCookingConfig={(update) => setCurrentTeam((currentTeam) => ({
          ...currentTeam,
          configOverride: {
            ...currentTeam.configOverride,
            cooking: cloneMerge(currentTeam.configOverride.cooking, update),
          },
        }))}
        isPremium={isPremium}
        hideManualSkillRecovery={hideManualStaminaSkillRecovery}
        {...props}
      />
      <SnorlaxFavoriteInput
        filter={currentTeam.configOverride}
        setFilter={(getUpdatedConfigOverride) => setCurrentTeam((currentTeam) => ({
          ...currentTeam,
          configOverride: getUpdatedConfigOverride(currentTeam.configOverride),
        }))}
        filterKey="snorlaxFavorite"
        fieldMetaMap={fieldMetaMap}
        pokemonList={pokemonList}
      />
      <TeamMemberStatsTypeInput
        {...getMultiSelectOnClickProps<TeamMetadata, TeamMemberStatsType>({
          filter: currentTeam,
          setFilter: (getUpdated) => setCurrentTeam((original) => ({
            ...original,
            ...getUpdated(original),
          })),
          filterKey: 'pinnedStats',
        })}
      />
      <FilterTextInput
        title={t('Period')}
        idToText={(period) => t2(productionPeriodI18nId[period])}
        ids={[...productionPeriod]}
        isActive={(period) => period === currentTeam.analysisPeriod}
        onClick={(analysisPeriod) => setCurrentTeam((currentTeam) => ({
          ...currentTeam,
          analysisPeriod,
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
