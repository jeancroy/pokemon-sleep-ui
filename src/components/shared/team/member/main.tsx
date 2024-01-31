import React from 'react';

import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {HorizontalSplitter} from '@/components/shared/common/splitter';
import {PokemonImage} from '@/components/shared/pokemon/image/main';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {MainSkillIcon} from '@/components/shared/pokemon/mainSkill/icon/main';
import {PokemonNameSimple} from '@/components/shared/pokemon/name/simple';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {useRatingPopup} from '@/components/shared/pokemon/rating/hook';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {TeamMemberControl} from '@/components/shared/team/member/control/main';
import {useTeamMemberPopup} from '@/components/shared/team/member/popup/hook';
import {TeamMemberPopup} from '@/components/shared/team/member/popup/main';
import {TeamMemberProduction} from '@/components/shared/team/member/production';
import {TeamMemberProps} from '@/components/shared/team/member/type';
import {specialtyIdMap} from '@/const/game/pokemon';
import {usePremiumRequiredToast} from '@/hooks/toast/main';
import {useUserActivation} from '@/hooks/userData/activation';


export const TeamMember = (props: TeamMemberProps) => {
  const {
    pokemon,
    member,
    subSkillMap,
  } = props;

  const t = useTranslations('Game');
  const pokemonPopup = useTeamMemberPopup();
  const ratingControl = useRatingPopup();
  const {data: session} = useSession();
  const {isPremium} = useUserActivation(session);
  const {showPremiumRequiredToast} = usePremiumRequiredToast();

  const {skill} = pokemon;
  const {level, nature, subSkill} = member;

  return (
    <Flex className="items-center gap-2 sm:flex-row lg:flex-col">
      <TeamMemberPopup
        state={pokemonPopup}
        ratingControl={ratingControl}
        {...props}
      />
      <Flex className="gap-2">
        <PokemonNameSimple pokemon={pokemon} override={member.name}/>
        <Flex center className="relative">
          <div className="relative size-28">
            <PokemonImage pokemonId={pokemon.id} image={{type: 'default', image: 'portrait'}} isShiny={false}/>
            <InfoIcon className="absolute bottom-0 right-0">
              {level}
            </InfoIcon>
          </div>
          <div className="absolute bottom-0 right-0">
            <TeamMemberControl
              ratingControl={ratingControl}
              onPopupButtonClick={(type, requirePremium) => {
                if (requirePremium && !isPremium) {
                  showPremiumRequiredToast();
                  return;
                }

                pokemonPopup.show(type);
              }}
              isPremium={isPremium}
              {...props}
            />
          </div>
        </Flex>
        <Flex className="items-center justify-between lg:flex-row">
          <Flex direction="row" className={clsx(
            'items-center gap-1.5 self-start truncate px-2 py-1 text-sm',
            pokemon.specialty === specialtyIdMap.skill && 'info-highlight',
          )}>
            <MainSkillIcon id={skill} dimension="size-5"/>
            <div className="truncate">{t(`MainSkill.Name.${skill}`)}</div>
          </Flex>
          <Flex noFullWidth className={clsx(
            'items-end self-end px-2 py-1 text-sm',
            pokemon.specialty === specialtyIdMap.ingredient && 'info-highlight',
          )}>
            <PokemonIngredientIcons
              ingredients={[Object.values(member.ingredients).map((production) => production)]}
              dimension="size-5"
              className="gap-1"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex center className="gap-1">
        <PokemonNatureIndicator nature={nature}/>
        <PokemonSubSkillIndicator
          level={level}
          subSkill={subSkill}
          subSkillMap={subSkillMap}
          className="justify-center"
        />
        <HorizontalSplitter className="w-full"/>
        <TeamMemberProduction {...props}/>
      </Flex>
    </Flex>
  );
};
