import React from 'react';

import {getServerSession} from 'next-auth';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getCookingUserSettingsRequiredData} from '@/controller/dataBundle/cookingSettings';
import {getIngredientIds} from '@/controller/ingredient';
import {getFieldMetaMap, getMapIds} from '@/controller/mapMeta';
import {getPokemonList} from '@/controller/pokemon/info';
import {getMaxMapBonusPercent} from '@/controller/progress';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';
import {getPossibleMealTypes} from '@/utils/game/mealType';
import {isNotNullish} from '@/utils/type';


type Props = NavBarCommonProps & {
  announcement: boolean,
};

export const NavBar = ({noUserControl, locale, announcement}: Props) => {
  const [
    session,
    mapIds,
    maxMapBonusPercent,
    ingredientIds,
    cookingUserSettingsRequiredData,
    pokemonList,
    mapMeta,
  ] = React.use(Promise.all([
    getServerSession(authOptions),
    getMapIds(),
    getMaxMapBonusPercent(),
    getIngredientIds(),
    getCookingUserSettingsRequiredData(),
    getPokemonList(),
    getFieldMetaMap(),
  ]));

  const {mealMap} = cookingUserSettingsRequiredData;
  const mealTypes = getPossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.InPage.Cooking',
      'UI.InPage.Pokedex.Info',
      'UI.Metadata',
      'UI.Stamina',
      'UI.UserSettings',
      'UI.UserControl',
    ]}>
      <NavBarClient
        noUserControl={noUserControl}
        session={session}
        mapIds={mapIds}
        maxMapBonusPercent={maxMapBonusPercent}
        mealTypes={mealTypes}
        ingredientIds={ingredientIds}
        pokemonList={pokemonList}
        mapMeta={mapMeta}
        {...cookingUserSettingsRequiredData}
      >
        {announcement && <Announcements showOn="landscape"/>}
      </NavBarClient>
    </I18nProvider>
  );
};
