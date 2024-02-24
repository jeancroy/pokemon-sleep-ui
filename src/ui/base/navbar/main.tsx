import React from 'react';

import {getServerSession} from 'next-auth';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientIds} from '@/controller/ingredient';
import {getFieldMetaMap, getMapIds} from '@/controller/mapMeta';
import {getPokemonList} from '@/controller/pokemon/info';
import {getPotInfoList} from '@/controller/potInfo';
import {getMaxMapBonusPercent} from '@/controller/progress';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps} from '@/ui/base/navbar/type';
import {getPossibleMealTypes} from '@/utils/game/meal/mealType';
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
    pokemonList,
    mapMeta,
    potInfoList,
    recipeLevelData,
    configRequiredData,
  ] = React.use(Promise.all([
    getServerSession(authOptions),
    getMapIds(),
    getMaxMapBonusPercent(),
    getIngredientIds(),
    getPokemonList(),
    getFieldMetaMap(),
    getPotInfoList(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]));

  const {mealMap} = configRequiredData;
  const mealTypes = getPossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
      'UI.Common',
      'UI.InPage.Cooking',
      'UI.InPage.Pokedex.Info',
      'UI.Metadata',
      'UI.Multiplier',
      'UI.Stamina',
      'UI.UserConfig',
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
        potInfoList={potInfoList}
        recipeLevelData={recipeLevelData}
        {...configRequiredData}
      >
        {announcement && <Announcements showOn="landscape"/>}
      </NavBarClient>
    </I18nProvider>
  );
};
