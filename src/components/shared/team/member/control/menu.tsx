import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {DropDown} from '@/components/dropdown/main';
import {FlexButton} from '@/components/layout/flex/button';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {GenericPokeballIcon} from '@/components/shared/icon/pokeball';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {
  teamMemberControlButtonStyle,
  teamMemberControlMenuIconStyle,
  teamMemberControlMenuOptionStyle,
} from '@/components/shared/team/member/control/const';
import {TeamMemberCopyIcon} from '@/components/shared/team/member/control/icon/copy';
import {TeamMemberDetailedStatsIcon} from '@/components/shared/team/member/control/icon/detailedStats';
import {TeamMemberEditIcon} from '@/components/shared/team/member/control/icon/edit';
import {TeamMemberRatingIcon} from '@/components/shared/team/member/control/icon/rating';
import {teamMemberSendRatingRequest} from '@/components/shared/team/member/control/utils';
import {TeamMemberPopupType} from '@/components/shared/team/member/popup/type';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {PremiumIcon} from '@/components/static/premium/icon';
import {useUserDataActor} from '@/hooks/userData/actor/main';
import {toPokeInBox} from '@/utils/team/pokebox/toPokeInBox';


type Props = TeamMemberProps & {
  ratingControl: RatingPopupControl,
  onPopupButtonClick: (type: TeamMemberPopupType) => void,
  isPremium: boolean,
};

export const TeamMemberControlMenu = ({
  ratingControl,
  onPopupButtonClick,
  isPremium,
  ...props
}: Props) => {
  const {member, onDuplicateClick, pokemon, showPokemon} = props;

  const {act, status} = useUserDataActor({statusToast: true});
  const t = useTranslations('UI.Component.Team.Member');

  return (
    <DropDown
      renderButton={(DropdownMenuButton) => (
        <DropdownMenuButton disabled={status === 'processing'} className={teamMemberControlButtonStyle}>
          <UserActionStatusIcon status={status} onWaitingOverride={<EllipsisVerticalIcon/>}/>
        </DropdownMenuButton>
      )}
      itemList={[
        [
          () => (
            <FlexButton disabled={!act} className={teamMemberControlMenuOptionStyle} onClick={() => {
              if (!act) {
                return;
              }

              act({
                action: 'upload',
                options: {
                  type: 'pokebox.create',
                  data: toPokeInBox(member),
                },
              });
            }}>
              <div className={teamMemberControlMenuIconStyle}>
                <UserActionStatusIcon status={status} onWaitingOverride={<ArrowTopRightOnSquareIcon/>}/>
              </div>
              <span>{t('Control.ExportToPokebox')}</span>
            </FlexButton>
          ),
          () => (
            <FlexButton disabled={!act} className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'pokeboxLink',
            )}>
              <LinkIcon className={teamMemberControlMenuIconStyle}/>
              <PremiumIcon isPremium={isPremium}/>
              <span>{t('Control.PokeboxLinking')}</span>
            </FlexButton>
          ),
          () => (
            <FlexButton disabled={!act} className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'sharableLink',
            )}>
              <ShareIcon className={teamMemberControlMenuIconStyle}/>
              <span>{t('Control.ShareableLink')}</span>
            </FlexButton>
          ),
        ],
        [
          () => {
            const text = t('Control.PokemonInfo');

            return (
              <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => showPokemon(pokemon)}>
                <GenericPokeballIcon alt={text} dimension="size-5" noShrink className="scale-120"/>
                <span>{text}</span>
              </FlexButton>
            );
          },
          () => (
            <FlexButton
              className={teamMemberControlMenuOptionStyle}
              onClick={() => teamMemberSendRatingRequest({ratingControl, ...props})}
            >
              <TeamMemberRatingIcon/>
              <span>{t('Control.Rating')}</span>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'detailedStats',
            )}>
              <TeamMemberDetailedStatsIcon/>
              <PremiumIcon isPremium={isPremium}/>
              <span>{t('Control.DetailedStats')}</span>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'growthChart',
            )}>
              <PresentationChartLineIcon className={teamMemberControlMenuIconStyle}/>
              <PremiumIcon isPremium={isPremium}/>
              <span>{t('Control.StrengthGrowth')}</span>
            </FlexButton>
          ),
          () => (
            <FlexButton
              className={clsx('group', teamMemberControlMenuOptionStyle)}
              onClick={() => onPopupButtonClick('mealCoverage')}
            >
              <MealCoverageIcon alt={t('Control.MealCoverage')} className={teamMemberControlMenuIconStyle}/>
              <PremiumIcon isPremium={isPremium}/>
              <span>{t('Control.MealCoverage')}</span>
            </FlexButton>
          ),
        ],
        [
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'memberConfig',
            )}>
              <TeamMemberEditIcon/>
              <span>{t('Control.Edit')}</span>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={onDuplicateClick}>
              <TeamMemberCopyIcon/>
              <span>{t('Control.Duplicate')}</span>
            </FlexButton>
          ),
        ],
      ]}
      origin="topLeft"
    />
  );
};
