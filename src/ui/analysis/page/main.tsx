import React from 'react';

import {AnalysisPageParams} from '@/app/[locale]/analysis/[id]/page';
import {Failed} from '@/components/icons/failed';
import {I18nProvider} from '@/contexts/i18n';
import {getAllBerryData} from '@/controller/berry';
import {getAllIngredients} from '@/controller/ingredient';
import {getAllPokemonAsArray} from '@/controller/pokemon';
import {AnalysisPageClient} from '@/ui/analysis/page/client';
import {AnalysisPageCommonProps} from '@/ui/analysis/page/type';
import {PageLayout} from '@/ui/base/layout';


type Props = {
  params: AnalysisPageParams,
};

export const AnalysisPage = ({params}: Props) => {
  const idNumber = Number(params.id);
  const pokedex = React.use(getAllPokemonAsArray());
  const pokemon = pokedex.find(({id}) => id === idNumber);
  const ingredientMap = React.use(getAllIngredients());
  const berryDataMap = React.use(getAllBerryData());

  if (!pokemon) {
    return <Failed text="Pokemon"/>;
  }

  if (!berryDataMap) {
    return <Failed text="Berry"/>;
  }

  const props: AnalysisPageCommonProps = {pokedex, pokemon, ingredientMap, berryDataMap};

  return (
    <PageLayout>
      <I18nProvider namespaces={['Game', 'UI.InPage.Pokedex', 'UI.Metadata']}>
        <AnalysisPageClient {...props}/>
      </I18nProvider>
    </PageLayout>
  );
};
