import React from 'react';

import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterWithInclusionMap} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps, GetMultiSelectOnClickPropsOpts} from '@/components/input/filter/utils/props';
import {PokemonSubSkillText} from '@/components/shared/pokemon/subSkill/text';
import {textFilterButtonStyle} from '@/styles/input';
import {SubSkillData, SubSkillId, SubSkillMap} from '@/types/game/pokemon/subSkill';


type Props<
  TFilter extends FilterWithInclusionMap<SubSkillId>,
> = GetMultiSelectOnClickPropsOpts<TFilter, SubSkillId> & {
  subSkillList: SubSkillData[],
  subSkillMap: SubSkillMap,
};

export const PokemonSubSkillFilter = <TFilter extends FilterWithInclusionMap<SubSkillId>>({
  subSkillList,
  subSkillMap,
  ...props
}: Props<TFilter>) => {
  const t = useTranslations('UI.Pokemon.Individual');

  return (
    <FilterExpandedInput
      title={t('SubSkill')}
      idToButton={(id) => <PokemonSubSkillText subSkill={subSkillMap[id]}/>}
      ids={subSkillList.map(({id}) => id)}
      className={textFilterButtonStyle}
      {...getMultiSelectOnClickProps(props)}
    />
  );
};
