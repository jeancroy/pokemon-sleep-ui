import React from 'react';

import {getServerSession} from 'next-auth';

import {Announcements} from '@/components/announcement/main';
import {I18nProvider} from '@/components/i18n/provider';
import {authOptions} from '@/const/auth';
import {getBerryDataMap} from '@/controller/berry';
import {getConfigRequiredData} from '@/controller/dataBundle/config';
import {getIngredientIds, getIngredientMap} from '@/controller/ingredient';
import {getIngredientChainMap} from '@/controller/ingredientChain';
import {getMainSkillMap} from '@/controller/mainSkill';
import {getFieldMetaMap, getMapIds} from '@/controller/mapMeta';
import {getPokedexMap} from '@/controller/pokemon/info';
import {getPokemonProducingParamsMap} from '@/controller/pokemon/producing';
import {getPotInfoList} from '@/controller/potInfo';
import {getMaxMapBonusPercent} from '@/controller/progress';
import {getRecipeLevelData} from '@/controller/recipeLevel';
import {getSubSkillMap} from '@/controller/subSkill';
import {NavBarClient} from '@/ui/base/navbar/client';
import {NavBarCommonProps, NavBarServerDataProps} from '@/ui/base/navbar/type';
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
    pokedexMap,
    berryDataMap,
    ingredientIds,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonProducingParamsMap,
    fieldMetaMap,
    potInfoList,
    recipeLevelData,
    configRequiredData,
  ] = React.use(Promise.all([
    getServerSession(authOptions),
    getMapIds(),
    getMaxMapBonusPercent(),
    getPokedexMap(),
    getBerryDataMap(),
    getIngredientIds(),
    getIngredientMap(),
    getIngredientChainMap(),
    getMainSkillMap(),
    getSubSkillMap(),
    getPokemonProducingParamsMap(),
    getFieldMetaMap(),
    getPotInfoList(),
    getRecipeLevelData(),
    getConfigRequiredData(),
  ]));

  const {mealMap} = configRequiredData;
  const mealTypes = getPossibleMealTypes(Object.values(mealMap).filter(isNotNullish));

  const props: NavBarServerDataProps = {
    noUserControl,
    session,
    mapIds,
    maxMapBonusPercent,
    mealTypes,
    pokedexMap,
    berryDataMap,
    ingredientIds,
    ingredientMap,
    ingredientChainMap,
    mainSkillMap,
    subSkillMap,
    pokemonProducingParamsMap,
    fieldMetaMap,
    potInfoList,
    recipeLevelData,
    ...configRequiredData,
  };

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
      <NavBarClient {...props}>
        {announcement && <Announcements showOn="landscape"/>}
      </NavBarClient>
    </I18nProvider>
  );
};
