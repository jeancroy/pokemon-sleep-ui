import React from 'react';

import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {GenericIcon} from '@/components/shared/icon/common/main';
import {MainSkillIcon} from '@/components/shared/icon/mainSkill/main';
import {MealCoverageIcon} from '@/components/shared/icon/mealCoverage';
import {ColoredStrengthIcon} from '@/components/shared/icon/strengthColored';
import {IngredientIcons} from '@/components/shared/ingredient/icons/main';
import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {PokemonFrequency} from '@/components/shared/pokemon/frequency/main';
import {PokemonTimeToFullPackSingle} from '@/components/shared/pokemon/inventory/fullPack/single';
import {PokemonIngredientRate} from '@/components/shared/pokemon/production/params/ingredient';
import {PokemonMainSkillTriggerRate} from '@/components/shared/pokemon/production/params/skillRate';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {getPokemonSorter} from '@/components/shared/pokemon/sorter/calc/main';
import {sortTypeToI18nId} from '@/components/shared/pokemon/sorter/const';
import {isPokedexSortExclusion} from '@/components/shared/pokemon/sorter/utils';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {imageSmallIconSizes} from '@/styles/image';
import {PokedexLinkProps} from '@/ui/pokedex/index/type';
import {getPokemonProductionSingle} from '@/utils/game/producing/main/entry/single';
import {getProductionIndividualParams} from '@/utils/game/producing/params';
import {formatFloat, formatFloat3} from '@/utils/number/format/regular';


export const PokedexLinkDetail = React.memo(({
  pokemon,
  pokemonProducingParams,
  display,
  level,
  subSkill,
  nature,
  berryDataMap,
  ingredientMap,
  mealMap,
  mainSkillMap,
  subSkillMap,
  recipeLevelData,
  eventStrengthMultiplierData,
  cookingRecoveryData,
  ingredients,
  snorlaxFavorite,
  calculatedConfigBundle,
}: PokedexLinkProps) => {
  const {
    berry,
    skill,
    stats,
    specialty,
    sleepType,
  } = pokemon;

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const t3 = useTranslations('UI.Common');

  if (display === 'berry') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        <div>
          {berry.quantity}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkill') {
    return (
      <Flex direction="row" className="items-end gap-0.5 text-sm">
        <MainSkillIcon id={skill} dimension="size-6"/>
        {t(`MainSkill.Name.${skill}`)}
      </Flex>
    );
  }

  if (display === 'ingredient') {
    return <IngredientIcons ingredients={[ingredients]}/>;
  }

  if (display === 'ingredientRate') {
    return <PokemonIngredientRate params={pokemonProducingParams} dimension="size-4"/>;
  }

  if (display === 'sleepType') {
    return <PokemonSleepType sleepType={sleepType}/>;
  }

  if (display === 'specialty') {
    return <PokemonSpecialty specialty={specialty}/>;
  }

  if (display === 'frequencyBase') {
    return <PokemonFrequency frequency={stats.frequency}/>;
  }

  if (display === 'mainSkillTriggerRate') {
    return <PokemonMainSkillTriggerRate params={pokemonProducingParams} dimension="size-4"/>;
  }

  const {bundle, calculatedCookingConfig} = calculatedConfigBundle;

  const individual = getProductionIndividualParams({
    input: {level, subSkill, nature},
    pokemon,
    subSkillMap,
  });

  if (display === 'ingredientCount' || display === 'timeToFullPackPrimary' || display === 'timeToFullPackSecondary') {
    const {ingredient, fullPackStats} = getPokemonProductionSingle({
      pokemon,
      pokemonProducingParams,
      berryData: berryDataMap[pokemon.berry.id],
      mealMap,
      ingredientMap,
      ingredients,
      skillData: mainSkillMap[pokemon.skill],
      snorlaxFavorite,
      bundle,
      calculatedCookingConfig,
      recipeLevelData,
      eventStrengthMultiplierData,
      cookingRecoveryData,
      individual,
    }).atStage.final;

    if (display === 'ingredientCount') {
      return (
        <Flex>
          <IngredientIcons ingredients={[ingredients]} dimension="size-3.5" noLink/>
          <IngredientIcons
            ingredients={[Object.values(ingredient)
              .sort((a, b) => b.qty.equivalent - a.qty.equivalent)
              .map(({id, qty}) => ({
                id,
                qty: qty.equivalent,
              })),
            ]}
            formatQty={formatFloat}
            classOfText="text-sm"
            dimension="size-4"
            noLink
          />
        </Flex>
      );
    }

    if (display === 'timeToFullPackPrimary') {
      return (
        <PokemonTimeToFullPackSingle
          alt={t2('Stats.TimeToFullPack.Primary')}
          fullPackStatsOfSleep={fullPackStats.bySleep.primary}
        />
      );
    }

    if (display === 'timeToFullPackSecondary') {
      return (
        <PokemonTimeToFullPackSingle
          alt={t2('Stats.TimeToFullPack.Secondary')}
          fullPackStatsOfSleep={fullPackStats.bySleep.secondary}
        />
      );
    }
  }

  // Need to calculate here because display and sort could be different
  const sorter = getPokemonSorter({
    type: display,
    pokemon,
    pokemonProducingParams,
    berryDataMap,
    ingredientMap,
    ingredients,
    mealMap,
    mainSkillMap,
    snorlaxFavorite,
    recipeLevelData,
    cookingRecoveryData,
    eventStrengthMultiplierData,
    calculatedConfigBundle,
    dateAdded: null,
    ...individual,
  });

  if (display === 'friendshipPoint') {
    return (
      <Flex direction="row" className="gap-0.5">
        <div className="relative size-5">
          <NextImage
            src="/images/generic/friendship.png"
            alt={t2('Stats.Friendship')}
            sizes={imageSmallIconSizes}
          />
        </div>
        <div>
          {sorter}
        </div>
      </Flex>
    );
  }

  if (display === 'transferReward') {
    return (
      <Flex direction="row" className="items-end gap-0.5 text-sm">
        <GenericIcon src="/images/generic/candyWhite.png" alt={t3('Candy')} noInvert/>
        <div>{stats.transfer.candy}</div>
      </Flex>
    );
  }

  if (display === 'frequencyOfBerry' || display === 'frequencyOfIngredient') {
    return <PokemonFrequency frequency={sorter}/>;
  }

  if (display === 'id') {
    return `#${sorter}`;
  }

  if (display === 'ingredientEnergy') {
    return (
      <Flex>
        <div className="text-xs">
          <IngredientIcons ingredients={[ingredients]} dimension="size-3.5" noLink/>
        </div>
        <Flex direction="row" className="items-center gap-0.5">
          <ColoredStrengthIcon alt={t3('Strength')} dimension="size-4"/>
          <span>{formatFloat(sorter)}</span>
        </Flex>
      </Flex>
    );
  }

  if (display === 'frequency') {
    return <PokemonFrequency frequency={sorter}/>;
  }

  if (display === 'berryEnergy' || display === 'berryCount') {
    return (
      <Flex direction="row" className="gap-0.5">
        <PokemonBerryIcon id={berry.id}/>
        {display === 'berryEnergy' && <ColoredStrengthIcon alt={t3('Strength')}/>}
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'totalEnergy') {
    return (
      <Flex direction="row" className="gap-0.5">
        <ColoredStrengthIcon alt={t3('Strength')}/>
        <div>
          {formatFloat(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'mainSkillDailyCount' || display === 'mainSkillDailyStrength') {
    return (
      <Flex direction="row" className="gap-0.5">
        <MainSkillIcon id={skill}/>
        {display === 'mainSkillDailyStrength' && <ColoredStrengthIcon alt={t3('Strength')}/>}
        <div>
          {display === 'mainSkillDailyStrength' ? formatFloat(sorter) : formatFloat3(sorter)}
        </div>
      </Flex>
    );
  }

  if (display === 'mealCoverage') {
    return (
      <Flex direction="row" noFullWidth className="items-center gap-1">
        <MealCoverageIcon alt={t2(sortTypeToI18nId.mealCoverage)} dimension="size-4"/>
        <span>{formatFloat(sorter * 100)}%</span>
      </Flex>
    );
  }

  if (isPokedexSortExclusion(display)) {
    return null;
  }

  console.error(`Unhandled Pokedex display type: [${display satisfies never}]`);
});
PokedexLinkDetail.displayName = 'PokedexLinkDetail';
