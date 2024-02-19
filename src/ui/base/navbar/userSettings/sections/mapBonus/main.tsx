import React from 'react';

import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon';
import {useTranslations} from 'next-intl';

import {Grid} from '@/components/layout/grid';
import {MapBonusSlider} from '@/components/shared/production/bonus/map';
import {SnorlaxFavoriteInput} from '@/components/shared/snorlax/favorite';
import {UserBonus} from '@/types/game/bonus/main';
import {ReactStateUpdaterFromOriginal} from '@/types/react';
import {UserConfig} from '@/types/userData/config/user/main';
import {UserSettingsSection} from '@/ui/base/navbar/userSettings/sections/base';
import {UserSettingsMapBonusDataProps} from '@/ui/base/navbar/userSettings/sections/mapBonus/type';


type Props = UserSettingsMapBonusDataProps & {
  config: UserConfig,
  setConfig: ReactStateUpdaterFromOriginal<UserConfig>,
  bonus: UserBonus,
  setBonus: (newBonus: UserBonus) => void,
};

export const UserSettingsMapBonusUI = ({
  mapIds,
  maxMapBonusPercent,
  pokemonList,
  mapMeta,
  config,
  setConfig,
  bonus,
  setBonus,
}: Props) => {
  const t = useTranslations('UI.UserConfig');

  return (
    <UserSettingsSection titleIcon={<MapPinIcon/>} title={t('Section.MapBonus')}>
      <SnorlaxFavoriteInput
        filter={config}
        setFilter={setConfig}
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
    </UserSettingsSection>
  );
};
