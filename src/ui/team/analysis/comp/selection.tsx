import React from 'react';

import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {AnimatedCollapseQuick} from '@/components/layout/collapsible/animatedQuick';
import {FlexButton} from '@/components/layout/flex/button';
import {Flex} from '@/components/layout/flex/common';
import {DeleteButton} from '@/components/shared/common/button/delete';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {UnavailableIcon} from '@/components/shared/common/unavailable';
import {imageIconSizes} from '@/styles/image';
import {TeamAnalysisComp, TeamAnalysisSetup} from '@/types/teamAnalysis';
import {TeamAnalysisCompSelectorProps} from '@/ui/team/analysis/comp/type';
import {getTeamName} from '@/ui/team/analysis/utils';


type Props = TeamAnalysisCompSelectorProps & {
  team: TeamAnalysisComp,
  onClick: () => void,
};

export const TeamAnalysisCompSelection = ({
  setup,
  onUpdated,
  onDeleted,
  onCopied,
  team,
  onClick,
}: Props) => {
  const {config, comps} = setup;

  const t = useTranslations('Game');

  const isCurrent = config.current === team.uuid;

  return (
    <AnimatedCollapseQuick key={team.uuid} show appear className="border-common rounded-lg border">
      <Flex center className={clsx(
        'h-full',
        isCurrent && 'button-bg',
      )}>
        <Flex direction="row" className="gap-2 p-2">
          <InputBox
            type="text"
            value={team.name}
            placeholder={getTeamName(team)}
            className="w-full"
            onChange={({target}) => onUpdated({
              ...setup,
              comps: {
                ...comps,
                [team.uuid]: {
                  ...team,
                  name: target.value,
                },
              },
            } satisfies TeamAnalysisSetup)}
          />
          <button className="button-clickable-bg size-7 shrink-0 rounded-lg p-1" onClick={() => onCopied(team.uuid)}>
            <DocumentDuplicateIcon/>
          </button>
          {
            config.current !== team.uuid &&
            <DeleteButton dimension="size-7" onClick={() => onDeleted(team.uuid)}/>
          }
        </Flex>
        <FlexButton noFullWidth={false} disabled={isCurrent} onClick={onClick} center className={clsx(
          'enabled:button-clickable gap-1.5 p-2',
        )}>
          {Object.entries(team.members).map(([slot, member]) => (
            member ?
              <IconWithInfo
                key={slot}
                imageSrc={`/images/pokemon/icons/${member.pokemonId}.png`}
                imageAlt={member.name || t(`PokemonName.${member.pokemonId}`)}
                imageDimension="size-12"
                imageSizes={imageIconSizes}
                info={member.level}
              /> :
              <UnavailableIcon key={slot}/>
          ))}
        </FlexButton>
      </Flex>
    </AnimatedCollapseQuick>
  );
};
