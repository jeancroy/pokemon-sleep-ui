import React from 'react';

import {useTranslations} from 'next-intl';

import {InfoIcon} from '@/components/icons/info';
import {Flex} from '@/components/layout/flex/common';
import {NextImage} from '@/components/shared/common/image/main';
import {
  PokemonItemStatsFromPokeboxCommonProps,
} from '@/components/shared/pokemon/icon/itemStats/base/fromPokebox/type';
import {PokemonItemStatsList} from '@/components/shared/pokemon/icon/itemStats/base/list';
import {PokemonIngredientIcons} from '@/components/shared/pokemon/ingredients/icons';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonProducingRateSingleAtItem} from '@/components/shared/pokemon/production/single/item';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {imageIconSizes} from '@/styles/image';
import {getEffectiveIngredientProductions} from '@/utils/game/ingredient/production';
import {getPokemonProducingRateSingle} from '@/utils/game/producing/main/single';
import {
  getPokemonProducingParams,
  getProducingRateImplicitParamsFromPokeInbox,
  getProducingRateSingleParams,
} from '@/utils/game/producing/params';
import {getTotalStrengthOfPokemonProducingRate} from '@/utils/game/producing/reducer/sum';
import {migrate} from '@/utils/migrate/main';
import {pokeInBoxMigrators} from '@/utils/migrate/pokebox/migrators';
import {isNotNullish} from '@/utils/type';


type Props = PokemonItemStatsFromPokeboxCommonProps & {
  reCalcDeps: React.DependencyList,
};

export const PokemonItemStatsFromPokeboxList = ({
  targetSpecialty,
  getIcon,
  pokedex,
  pokemonProducingParamsMap,
  berryDataMap,
  calculatedConfigBundle,
  pokeInBoxList,
  filter,
  reCalcDeps,
  ...props
}: Props) => {
  const {
    getItemRate,
    mainSkillMap,
    subSkillMap,
  } = props;

  const t = useTranslations('Game');

  const producingStats = React.useMemo(() => (
    pokeInBoxList
      .map((pokeInBox) => {
        const pokemonInfo = pokedex[pokeInBox.pokemon];

        if (!pokemonInfo || !filter.internal({pokeInBox, pokemonInfo})) {
          return null;
        }

        return {
          pokeInBox: migrate({
            original: pokeInBox,
            override: null,
            migrators: pokeInBoxMigrators,
            migrateParams: {},
          }),
          pokemonInfo,
        };
      })
      .filter(isNotNullish)
      .map(({pokeInBox, pokemonInfo: pokemon}) => {
        const ingredients = getEffectiveIngredientProductions(pokeInBox);
        const singleParams = getProducingRateSingleParams({
          ...props,
          ...pokeInBox,
        });
        const pokemonRate = getPokemonProducingRateSingle({
          ...props,
          level: pokeInBox.level,
          pokemon,
          pokemonProducingParams: getPokemonProducingParams({
            pokemonId: pokemon.id,
            pokemonProducingParamsMap,
          }),
          ...singleParams,
          ...getProducingRateImplicitParamsFromPokeInbox({pokeInBox}),
          ...calculatedConfigBundle,
          berryData: berryDataMap[pokemon.berry.id],
          ingredients,
          skillData: mainSkillMap[pokemon.skill],
        }).atStage.final;

        return {
          pokemon,
          pokeInBox,
          pokemonRate,
          uniqueKey: pokeInBox.uuid,
          ingredients,
          dailyTotalEnergy: getTotalStrengthOfPokemonProducingRate(pokemonRate),
        };
      })
  ), [pokeInBoxList, ...reCalcDeps]);

  return (
    <PokemonItemStatsList
      getItemRate={getItemRate}
      producingStats={producingStats}
      className="rounded-lg bg-slate-100/80 p-2 dark:bg-slate-950/60"
      toItem={({
        pokemon,
        pokeInBox,
        ingredients,
        itemRate,
      }) => {
        const {id} = pokemon;
        const {
          level,
          name,
          nature,
          subSkill,
        } = pokeInBox;
        const pokemonDefaultName = t(`PokemonName.${id}`);

        return (
          <Flex center className="relative gap-1">
            <Flex noFullWidth className="absolute left-1.5 top-1.5 opacity-50">
              <div className="relative size-14">
                <NextImage
                  src={`/images/pokemon/icons/${id}.png`}
                  alt={pokemonDefaultName}
                  sizes={imageIconSizes}
                />
              </div>
            </Flex>
            <Flex className="place-items-end gap-1 text-sm">
              <Flex direction="row" className="justify-end gap-1.5 truncate">
                <InfoIcon>
                  {level}
                </InfoIcon>
                <div>
                  {name ?? pokemonDefaultName}
                </div>
              </Flex>
              <PokemonIngredientIcons ingredients={[ingredients]} noLink/>
              <PokemonProducingRateSingleAtItem
                rate={itemRate}
                getIcon={(dimension) => getIcon(pokemon, dimension)}
                hideFrequency
              />
            </Flex>
            <PokemonNatureIndicator nature={nature}/>
            <PokemonSubSkillIndicator subSkill={subSkill} subSkillMap={subSkillMap}/>
          </Flex>
        );
      }}
    />
  );
};
