import {useTranslations} from 'next-intl';

import {PokemonInputType} from '@/components/shared/pokemon/filter/type';


type Props = {
  type: Exclude<PokemonInputType, 'level'>,
};

export const PokemonFilterTitle = ({type}: Props) => {
  const t = useTranslations('UI.Pokemon.Info');

  if (type === 'pokemonType') {
    return t('PokemonType');
  }

  if (type === 'sleepType') {
    return t('SleepType');
  }

  if (type === 'specialty') {
    return t('Specialty');
  }

  if (type === 'berry') {
    return t('Berry');
  }

  if (type === 'ingredient') {
    return t('Ingredient');
  }

  if (type === 'mainSkill') {
    return t('MainSkill');
  }

  if (type === 'evolutionStage') {
    return t('Evolution');
  }

  throw new Error(`Unhandled pokemon filter title of type ${type satisfies never}`);
};
