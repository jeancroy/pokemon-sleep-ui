import React from 'react';

import {getServerSession} from 'next-auth';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getIngredientIds} from '@/controller/ingredient';
import {getMapIds} from '@/controller/mapMeta';
import {getMealMap} from '@/controller/meal';
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
    mealMap,
    mapIds,
    maxMapBonusPercent,
    ingredientIds,
  ] = React.use(Promise.all([
    getServerSession(authOptions),
    getMealMap(),
    getMapIds(),
    getMaxMapBonusPercent(),
    getIngredientIds(),
  ]));

  const mealTypes = getPossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  return (
    <I18nProvider locale={locale} namespaces={[
      'Game',
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
        mealMap={mealMap}
        ingredientIds={ingredientIds}
      >
        {announcement && <Announcements showOn="landscape"/>}
      </NavBarClient>
    </I18nProvider>
  );
};
