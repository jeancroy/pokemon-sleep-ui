import React from 'react';

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import PencilIcon from '@heroicons/react/24/outline/PencilIcon';
import PresentationChartLineIcon from '@heroicons/react/24/outline/PresentationChartLineIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {DropDown} from '@/components/dropdown/main';
import {FlexButton} from '@/components/layout/flex/button';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {RatingPopupControl} from '@/components/shared/pokemon/rating/type';
import {
  teamMemberControlButtonStyle,
  teamMemberControlMenuIconStyle,
  teamMemberControlMenuOptionStyle,
} from '@/components/shared/team/member/control/const';
import {TeamMemberDetailedStatsIcon} from '@/components/shared/team/member/control/icon/detailedStats';
import {TeamMemberRatingIcon} from '@/components/shared/team/member/control/icon/rating';
import {teamMemberSendRatingRequest} from '@/components/shared/team/member/control/utils';
import {TeamMemberPopupType} from '@/components/shared/team/member/popup/type';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {toPokeInBox} from '@/components/shared/team/member/utils';
import {UserActionStatusIcon} from '@/components/shared/userData/statusIcon';
import {PremiumIcon} from '@/components/static/premium/icon';
import {useUserDataActor} from '@/hooks/userData/actor/main';


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
  const {member} = props;

  const {act, status} = useUserDataActor({statusToast: true});
  const t = useTranslations('UI.InPage.Team.Analysis');

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
              <div>{t('Control.ExportToPokebox')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton disabled={!act} className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'sharableLink',
            )}>
              <ShareIcon className={teamMemberControlMenuIconStyle}/>
              <div>{t('Control.ShareableLink')}</div>
            </FlexButton>
          ),
        ],
        [
          () => (
            <FlexButton
              className={teamMemberControlMenuOptionStyle}
              onClick={() => teamMemberSendRatingRequest({ratingControl, ...props})}
            >
              <TeamMemberRatingIcon/>
              <div>{t('Control.Rating')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'detailedStats',
            )}>
              <TeamMemberDetailedStatsIcon/>
              {!isPremium && <PremiumIcon/>}
              <div>{t('Control.DetailedStats')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'growthChart',
            )}>
              <PresentationChartLineIcon className={teamMemberControlMenuIconStyle}/>
              {!isPremium && <PremiumIcon/>}
              <div>{t('Control.StrengthGrowth')}</div>
            </FlexButton>
          ),
          () => (
            <FlexButton
              className={clsx('group', teamMemberControlMenuOptionStyle)}
              onClick={() => onPopupButtonClick('mealCoverage')}
            >
              <MealCoverageIcon alt={t('Control.MealCoverage')} className={teamMemberControlMenuIconStyle}/>
              {!isPremium && <PremiumIcon/>}
              <div>{t('Control.MealCoverage')}</div>
            </FlexButton>
          ),
        ],
        [
          () => (
            <FlexButton className={teamMemberControlMenuOptionStyle} onClick={() => onPopupButtonClick(
              'memberConfig',
            )}>
              <PencilIcon className={teamMemberControlMenuIconStyle}/>
              <div>{t('Control.Edit')}</div>
            </FlexButton>
          ),
        ],
      ]}
      origin="topRight"
    />
  );
};
