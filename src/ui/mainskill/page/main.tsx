import React from 'react';

import {MainSkillPageParams} from '@/app/[locale]/info/mainskill/[id]/page';
import {I18nProvider} from '@/components/i18n/provider';
import {Failed} from '@/components/icons/failed';
import {Flex} from '@/components/layout/flex/common';
import {getMainSkillData} from '@/controller/mainSkill';
import {getPokemonByMainSkill} from '@/controller/pokemon/info';
import {PageProps} from '@/types/next/page/common';
import {PublicPageLayout} from '@/ui/base/layout/public';
import {MainSkillMeta} from '@/ui/mainskill/page/meta';
import {MainSkillAvailablePokemon} from '@/ui/mainskill/page/pokemon';
import {MainSkillValueTable} from '@/ui/mainskill/page/table';


export const MainSkillPage = async ({params}: PageProps<MainSkillPageParams>) => {
  const {locale, id} = params;
  const idNumber = Number(id);
  const [
    mainSkillData,
    pokemonOfMainSkill,
  ] = await Promise.all([
    getMainSkillData(idNumber),
    getPokemonByMainSkill(idNumber),
  ]);

  if (!mainSkillData) {
    return <Failed text="Data"/>;
  }

  return (
    <PublicPageLayout locale={locale}>
      <Flex className="info-section-bg gap-5 p-3 md:flex-row">
        <MainSkillMeta data={mainSkillData}/>
        <MainSkillValueTable data={mainSkillData}/>
      </Flex>
      <I18nProvider locale={locale} namespaces={['Game']}>
        <MainSkillAvailablePokemon pokemonList={pokemonOfMainSkill}/>
      </I18nProvider>
    </PublicPageLayout>
  );
};
