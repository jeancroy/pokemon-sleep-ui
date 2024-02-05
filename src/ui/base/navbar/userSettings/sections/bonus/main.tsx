import React from 'react';

import ArrowUpCircleIcon from '@heroicons/react/24/outline/ArrowUpCircleIcon';
import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {MapBonusSlider} from '@/components/shared/production/bonus/map';
import {OverallBonusSlider} from '@/components/shared/production/bonus/overall';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {UserBonus} from '@/types/game/bonus';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserSettings} from '@/types/userData/settings/main';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserSettingsBonusDataProps} from '@/ui/base/navbar/userSettings/sections/bonus/type';


type Props = UserSettingsBonusDataProps & {
  settings: UserSettings,
  setSettings: ReactStateUpdaterFromOriginal<UserSettings>,
  bonus: UserBonus,
  setBonus: (newBonus: UserBonus) => void,
};

export const UserSettingsBonusUI = ({
  mapIds,
  maxMapBonusPercent,
  pokemonList,
  mapMeta,
  settings,
  setSettings,
  bonus,
  setBonus,
}: Props) => {
  const t = useTranslations('UI.UserSettings');

  return (
    <UserSettingsSection titleIcon={<ArrowUpCircleIcon/>} title={t('Section.MapBonus')}>
      <SnorlaxFavoriteInput
        filter={settings}
        setFilter={setSettings}
        filterKey="snorlaxFavorite"
        pokemonList={pokemonList}
        mapMeta={mapMeta}
      />
      <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-2">
        {mapIds.map((mapId) => (
          <MapBonusSlider
            key={mapId}
            mapId={mapId}
            maxMapBonusPercent={maxMapBonusPercent}
            value={bonus.map[mapId] ?? 0}
            setValue={(value) => setBonus({
              ...bonus,
              map: {
                ...bonus.map,
                [mapId]: value,
              },
            })}
          />
        ))}
      </Grid>
      <OverallBonusSlider value={bonus.overall} setValue={(overall) => setBonus({
        ...bonus,
        overall,
      })}/>
    </UserSettingsSection>
  );
};
