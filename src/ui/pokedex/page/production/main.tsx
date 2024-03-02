import React from 'react';

import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import {clsx} from 'clsx';
import {Session} from 'next-auth';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {NextImage} from '@/components/shared/common/image/main';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonIndividualParamsPicker} from '@/components/shared/pokemon/predefined/individual/main';
import {defaultPokemonIndividualParams, specialtyIdMap} from '@/const/game/pokemon';
import {useCommonServerData} from '@/contexts/data/common/hook';
import {useUserActivation} from '@/hooks/userData/activation';
import {imageIconSizes} from '@/styles/image';
import {PokemonIndividualParams} from '@/types/game/pokemon/params';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonBerryProduction} from '@/ui/pokedex/page/production/berry';
import {PokemonProductionCombination} from '@/ui/pokedex/page/production/combination/main';
import {PokemonIngredientPossibilities} from '@/ui/pokedex/page/production/ingredient/possibility';
import {metaTitleClass} from '@/ui/pokedex/page/style';
import {PokemonDataCommonProps} from '@/ui/pokedex/page/type';


type Props = PokemonDataCommonProps & {
  session: Session | null,
};

export const PokemonProduction = (props: Props) => {
  const {
    pokemon,
    berryData,
    session,
  } = props;
  const {specialty, berry, ingredientChain} = pokemon;

  const {ingredientChainMap, subSkillMap} = useCommonServerData();

  const [input, setInput] = React.useState<PokemonIndividualParams>(
    defaultPokemonIndividualParams,
  );
  const {isPremium} = useUserActivation(session);

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.Pokemon.Info');
  const t3 = useTranslations('UI.Metadata');

  const chain = ingredientChainMap[ingredientChain];
  const analysisTitle = t3('Analysis.Title', {name: t(`PokemonName.${pokemon.id}`)});

  return (
    <Flex center className="info-section">
      <PokemonIndividualParamsPicker
        filter={input}
        setFilter={setInput}
        maxLevel={berryData.energy.length}
        isPremium={isPremium}
        subSkillMap={subSkillMap}
      />
      <HorizontalSplitter className="w-full"/>
      <PokemonMetaSection
        title={t2('Berry')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.berry && 'bg-blink')}
      >
        <PokemonBerryProduction
          pokemon={pokemon}
          berryName={t(`Berry.${berry.id}`)}
        />
      </PokemonMetaSection>
      <PokemonMetaSection
        title={t2('Ingredient')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.ingredient && 'bg-blink')}
      >
        <PokemonIngredientPossibilities chain={chain}/>
      </PokemonMetaSection>
      <PokemonMetaSection title={t2('Production')} titleClassName={metaTitleClass}>
        <PokemonProductionCombination
          input={input}
          chain={chain}
          {...props}
        />
      </PokemonMetaSection>
      <PokemonMetaSection title={<LinkIcon className="size-6"/>} titleClassName={metaTitleClass}>
        <FlexLink href={`/analysis/${pokemon.id}`} className={clsx(
          'button-clickable-bg group items-center gap-1.5 self-end px-2 py-1',
        )}>
          <div>
            {analysisTitle}
          </div>
          <div className="relative size-10">
            <NextImage
              src="/images/generic/analysis.png"
              alt={analysisTitle}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </div>
        </FlexLink>
      </PokemonMetaSection>
    </Flex>
  );
};
