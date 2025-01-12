import {MissionType} from '@/types/game/mission';


type I18nMetadata = {
  Title: string,
};

type PageWithIndividual = {
  Index: I18nMetadata,
  Page: I18nMetadata,
};

type GameObjectIdToString = {[id in string]: string};

type RatingBasisI18n = {
  Name: string,
  Explainer: string,
};

declare global {
  declare interface IntlMessages {
    Locale: string,
    UI: {
      Subscription: {
        AdBlockActive: string,
        Popup: string,
        PremiumOnly: string,
        Activation: {
          AdsFree: string,
          Premium: string,
        },
      },
      Root: {
        Help: string,
      },
      Auth: {
        EmailSent: string,
      },
      Common: {
        Candy: string,
        Day: string,
        Default: string,
        Diamond: string,
        DreamShards: string,
        Hour: string,
        Map: string,
        MainSkill: string,
        MaxCarry: string,
        MealCoverage: string,
        Pokebox: string,
        Rank: string,
        ResearchExp: string,
        Rewards: string,
        Shiny: string,
        SnorlaxFavorite: string,
        SnorlaxRank: string,
        Stamina: string,
        Strength: string,
      },
      Component: {
        Collapsible: {
          CollapseAll: string,
          ExpandAll: string,
        },
        MealCoverageCombo: {
          IngredientCoverage: string,
          IngredientExclusion: string,
          CoveredStrength: string,
        },
        MealFilter: {
          IngredientInclusion: string,
          IngredientExclusion: string,
          MinRecipeBonus: string,
        },
        PokemonFilter: {
          EvolutionCount: string,
          FinalEvolution: string,
        },
        PokemonDetailedProduction: {
          Tab: {
            DailyBreakdown: string,
            EnergyCurve: string,
            AtEnergy: string,
            Cooking: string,
          },
          Cooking: {
            IngredientMultiplier: string,
            ExtraTasty: {
              Name: string,
              Average: string,
              ByMeal: string,
            },
          },
        },
        TimePeriodSchedule: {
          Start: string,
          End: string,
          Close: string,
        },
        Team: {
          SetupControl: {
            Period: string,
            QuickAction: {
              Sync: {
                Name: string,
                Syncing: string,
              },
            },
            ConfigSource: {
              Name: string,
              Default: string,
              Override: string,
            },
            StatsType: {
              Total: string,
              Berry: string,
              Ingredient: string,
              Cooking: string,
              Skill: string,
              Frequency: string,
              Energy: string,
              Inventory: string,
            },
          },
          Member: {
            Control: {
              ExportToPokebox: string,
              PokeboxLinking: string,
              PokemonInfo: string,
              ShareableLink: string,
              Rating: string,
              DetailedStats: string,
              StrengthGrowth: string,
              MealCoverage: string,
              Edit: string,
              Duplicate: string,
            },
            Message: {
              ShareableLink: string,
              StrengthGrowth: string,
            },
          },
        },
        EventList: {
          Section: {
            Upcoming: string,
            Current: string,
            Ended: string,
          },
        },
      },
      Evolution: {
        SleepTime: string,
        Gender: {
          Male: string,
          Female: string,
          Unknown: string,
        },
      },
      Game: {
        Feature: {
          LevelUp: string,
          CookRecipe: string,
          PotExpand: string,
        },
      },
      MainSkill: {
        EffectType: {
          Strength: string,
          Shards: string,
          Stamina: string,
          Help: string,
          Cooking: string,
          Random: string,
          Unknown: string,
        },
        Target: {
          Self: string,
          Random: string,
          Team: string,
        },
      },
      Metadata: {
        Site: {
          Name: string,
          Description: string,
          Keywords: {
            PokemonSleep: string,
            Pokemon: string,
            PokemonSleepGuide: string,
          },
        },
        NotFound: I18nMetadata,
        Home: I18nMetadata,
        Pokedex: {
          Main: PageWithIndividual,
          Tier: I18nMetadata,
        },
        SleepStyle: {
          Index: I18nMetadata,
          Sleepdex: {
            Index: I18nMetadata,
            Record: I18nMetadata,
            Lookup: I18nMetadata,
          },
          Map: PageWithIndividual,
          UniqueMap: PageWithIndividual,
          Special: I18nMetadata,
        },
        Analysis: I18nMetadata,
        Rating: I18nMetadata,
        Production: I18nMetadata,
        Cooking: {
          Index: I18nMetadata,
          Make: I18nMetadata,
          Prepare: I18nMetadata,
        },
        Meal: PageWithIndividual,
        Ingredient: PageWithIndividual,
        Berry: PageWithIndividual,
        Team: {
          Analysis: I18nMetadata,
          Box: I18nMetadata,
          Index: I18nMetadata,
          Maker: I18nMetadata,
        },
        Info: {
          Index: I18nMetadata,
          Event: PageWithIndividual,
          Pot: I18nMetadata,
          Nature: I18nMetadata,
          MainSkill: PageWithIndividual,
          SubSkill: I18nMetadata,
          ProducingParams: I18nMetadata,
          Progress: I18nMetadata,
          RecipeLevel: I18nMetadata,
          ResearchRank: I18nMetadata,
        },
        Item: {
          Index: I18nMetadata,
          Evolution: I18nMetadata,
          Incense: PageWithIndividual,
        },
        PokemonExp: I18nMetadata,
        Stamina: I18nMetadata,
        Encounter: I18nMetadata,
        About: I18nMetadata,
        Docs: {
          Index: I18nMetadata,
          New: I18nMetadata,
          Edit: I18nMetadata,
          View: I18nMetadata,
        },
      },
      Multiplier: {
        Strength: {
          Name: string,
          Type: {
            Berry: string,
            Cooking: string,
            Skill: string,
          },
        },
        DrowsyPower: string,
      },
      InPage: {
        Home: {
          Welcome: string,
        },
        Pokedex: {
          Tier: {
            Details: string,
            Tips: string,
          },
        },
        Analysis: {
          FirstAppearance: string,
          LastSleepStyle: string,
        },
        Rating: {
          FriendshipLevel: string,
          AdvancedOptions: string,
        },
        Cooking: {
          Energy: string,
          Ingredient: {
            Name: string,
            Filler: string,
            Missing: string,
            Required: string,
          },
          MealType: string,
          PotCapacity: string,
          Preparer: {
            IncludeFiller: string,
          },
          RecipeLevel: string,
          ToggleUnmakeable: string,
          Total: string,
          TargetMealCount: string,
          Sort: {
            RecipeBaseStrength: string,
            IngredientCount: string,
          },
        },
        Map: {
          Unique: string,
          Pokemon: string,
          SleepStyle: string,
          SleepStylesUnlocked: string,
          UnlockConditions: string,
          Toggle: {
            SleepdexRegisterMode: string,
            CompletionStatus: string,
            Registered: string,
            NoNewSleepStyle: string,
          },
        },
        Team: {
          Box: {
            DisplayType: {
              Frequency: string,
              Info: string,
              Pokemon: string,
              MaxCarry: string,
              ProductionBerry: string,
              ProductionIngredient: string,
              ProductionTotal: string,
              Rating: string,
              Skills: string,
            },
            Favorite: string,
            Preview: {
              Level: string,
              FinalEvolution: string,
            },
          },
          Maker: {
            Basis: string,
            Behavior: {
              ToggleInsufficientIngredients: string,
            },
            CompCountWarning: string,
            Control: {
              ExportToTeamAnalysis: string,
              ExportTeamName: string,
            },
            Source: {
              Pokebox: string,
              Vanilla: string,
            },
            State: {
              IngredientRequirements: {
                Pass: string,
                Fail: string,
              },
              Status: {
                Standby: string,
                Initializing: string,
                GeneratingTeams: string,
                Calculating: string,
                Completed: string,
                Error: string,
                Canceled: string,
              },
            },
          },
        },
        Info: {
          Event: {
            Mission: string,
          },
          Pot: {
            Capacity: string,
            Expand: string,
            UnlockedRecipes: string,
          },
          Progress: {
            SleepStylesUnlocked: string,
            MapUnlock: string,
            MaxMapBonusPercent: string,
            MaxPotCapacity: string,
            FeatureUnlock: string,
            Rewards: string,
          },
          RecipeLevel: {
            Input: {
              CurrentLevel: string,
            },
            Table: {
              Level: string,
              Bonus: string,
              ToNext: string,
              TotalRequired: string,
              Accumulated: string,
              Strength: string,
            },
          },
          ResearchRank: {
            Table: {
              Rank: string,
              ToNext: string,
              Accumulated: string,
              PokemonMaxLevel: {
                Short: string,
                Long: string,
              },
            },
          },
        },
        PokemonExp: {
          OtherPokemon: string,
          ExpToNext: string,
          OwnedCandies: string,
          NormalCandy: string,
          HandyCandy: string,
          Multiplier: {
            DreamShardDepletion: string,
            ExpBoost: string,
          },
          KeyLevel: string,
        },
        Docs: {
          Title: string,
        },
        ProducingParams: {
          Notice: string,
        },
      },
      Image: {
        Portrait: string,
        Eating: string,
      },
      Ocr: {
        Status: {
          Error: string,
          Ready: string,
          Thresholding: string,
          LoadingOcr: string,
          Recognizing: string,
          Completed: string,
        },
        Tolerance: {
          Title: string,
          Tips: string,
        },
      },
      Pokemon: {
        Stats: {
          Strength: {
            Berry: string,
            Ingredient: string,
            Skill: string,
            Total: string,
          },
          Count: {
            Berry: string,
            Ingredient: string,
          },
          Ingredient: {
            Rate: string,
            MealCoverage: string,
          },
          MainSkill: {
            Level: string,
            DailyCount: string,
            TriggerRate: string,
          },
          Frequency: {
            Common: string,
            Base: string,
            Berry: string,
            Ingredient: string,
            Equivalent: string,
          },
          TimeToFullPack: {
            Primary: string,
            Secondary: string,
          },
          ExtraTasty: {
            Rate: string,
            Multiplier: string,
          },
        },
        Info: {
          Name: string,
          PokemonType: string,
          SleepType: string,
          Specialty: string,
          Berry: string,
          Ingredient: string,
          MainSkill: string,
          Evolution: string,
          Production: string,
          SleepStyle: string,
          Stats: {
            Name: string,
            Friendship: string,
            Recruit: string,
            TransferReward: string,
          },
          Flags: {
            EventOnly: string,
          },
        },
        Individual: {
          Id: string,
          DateRegistered: string,
          Level: string,
          SubSkill: string,
          NatureEffect: string,
        },
        MainSkillLevel: {
          Base: string,
          Max: string,
        },
      },
      Producing: {
        State: {
          Base: string,
          Awake: string,
          Asleep: {
            Primary: {
              Vacant: string,
              Filled: string,
            },
            Secondary: {
              Vacant: string,
              Filled: string,
            },
          },
        },
        Preset: {
          UnfilledOnly: string,
        },
        Total: string,
        Period: {
          Daily: string,
          Weekly: string,
        },
        Probability: {
          NoSkillAfterWakeup: string,
        },
        ProduceType: {
          Berry: string,
          Ingredient: string,
          MainSkill: string,
        },
        VanillaPreset: {
          Mode: string,
          Shared: string,
          BySpecialty: string,
        },
      },
      Rating: {
        Basis: {
          TotalStrength: RatingBasisI18n,
          IngredientStrength: RatingBasisI18n,
          MealCoverage: RatingBasisI18n,
          MainSkillTriggerCount: RatingBasisI18n,
        },
        WeightedStatsBasis: {
          Percentile: string,
          Percentage: string,
          RelativeStrength: string,
        },
        Category: {
          Title: string,
          CrossSpecies: string,
          IntraSpecies: string,
          IntraSpeciesSameIngredient: string,
        },
      },
      SleepStyle: {
        SPO: string,
        DrowsyPowerRequirement: string,
        IncenseOnly: string,
        Unreleased: string,
        Message: {
          UnlockRankDiffers: string,
          ChooseMapFirst: string,
        },
      },
      Stamina: {
        Title: string,
        SleepSchedule: string,
        Chart: {
          Stamina: string,
          Efficiency: string,
        },
        Strategy: {
          Optimistic: string,
          Conservative: string,
        },
        SkillRecovery: {
          Name: string,
          Amount: string,
          DailyCount: string,
        },
        CookingRecovery: {
          Name: string,
        },
        EventType: {
          SkillRecovery: string,
          CookingRecovery: string,
          EfficiencyBlock: string,
          Sleep: string,
          Wakeup: string,
          EndOfPeriod: string,
        },
        State: {
          Average: string,
          Awake: string,
          Asleep: {
            Neutral: string,
            Primary: string,
            Secondary: string,
          },
        },
      },
      UserConfig: {
        AlwaysFullPack: string,
        BerryPokemonFullPack: string,
        GoodCampTicket: string,
        Cooking: {
          Title: string,
        },
        Message: {
          ConfigNotStored: string,
        },
        Multiplier: {
          Overall: string,
          Strength: {
            Behavior: {
              Custom: string,
              Default: string,
            },
          },
        },
        Section: {
          AppInfo: string,
          MapBonus: string,
          Multiplier: string,
          Cooking: string,
          Language: string,
          Stamina: string,
        },
      },
      UserControl: {
        Login: string,
        Logout: string,
      },
      WeekOfDay: {
        Monday: string,
        Tuesday: string,
        Wednesday: string,
        Thursday: string,
        Friday: string,
        Saturday: string,
        Sunday: string,
      },
    },
    Game: {
      Berry: GameObjectIdToString,
      EventDetail: GameObjectIdToString,
      Field: GameObjectIdToString,
      Food: GameObjectIdToString,
      Item: GameObjectIdToString,
      MainSkill: {
        Name: GameObjectIdToString,
        Description: GameObjectIdToString,
      },
      MealType: GameObjectIdToString,
      Nature: GameObjectIdToString,
      NatureEffect: GameObjectIdToString,
      PokemonCandy: GameObjectIdToString,
      PokemonIncense: GameObjectIdToString,
      PokemonType: GameObjectIdToString,
      PokemonName: GameObjectIdToString,
      RankTitle: GameObjectIdToString,
      SleepFace: GameObjectIdToString,
      SleepType: GameObjectIdToString,
      Specialty: GameObjectIdToString,
      SubSkill: {
        Name: GameObjectIdToString,
        Description: GameObjectIdToString,
      },
      WeeklyMission: {[type in MissionType]: string},
    },
  }
}
