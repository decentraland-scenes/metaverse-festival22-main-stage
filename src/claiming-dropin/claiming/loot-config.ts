//cannot import this or will cause cylic depedency
//import { CONFIG, initConfig } from "src/config"

//import { CONFIG } from "src/config"
import { STAGE_IDS } from "src/stageIds"

//initConfig()


export function initClaimConfig(){

}

const PROD_PARCHUTE_CAMP_KEY = "PROVIDE_PRODUCTION_KEY_HERE"
const PROD_PARCHUTE_CAMP_KEY_KRAKEN = "PROVIDE_PRODUCTION_KEY_HERE"


function toStringURLArray(wearableInstArr: WearableEnumInst[]): string[] {
  const urnArr: string[] = []
  for (const p in wearableInstArr) {
    const urn = wearableInstArr[p].urn
    if (urn !== undefined) {
      urnArr.push(urn)
    }
  }
  return urnArr
}

export type WearableEnumConstructorArg = {
  address?: string
  urn?: string
  name?: string
  itemId?: string
}
export class WearableEnumInst {
  name?: string
  address?: string
  urn?: string
  itemId?: string

  constructor(args: WearableEnumConstructorArg) {
    if (args && args.name) this.name = args.name
    if (args && args.address) this.address = args.address
    if (args && args.itemId) this.itemId = args.itemId
    if (args && args.urn) this.urn = args.urn
    if (this.address && this.itemId && this.urn) {
      if (this.urn.indexOf(this.address + ":" + this.itemId)) {
        log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
      }
    } else if (this.address && this.urn) {
      if (this.urn.indexOf(this.address)) {
        log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
      }
    }
  }
}
export class WearableEnum {
  //0 is bucket hat
  //2 is raincoat

  static PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE = new WearableEnumInst({ name: "PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE", address: "0xa4a345afb8fa378cdabc68e83e1a578c810f0abb", itemId: "5", urn: 'urn:decentraland:matic:collections-v2:0xa4a345afb8fa378cdabc68e83e1a578c810f0abb:5' })
  static PANTS_ADDRESS = new WearableEnumInst({ name: "polygon pants", address: "0xa4a345afb8fa378cdabc68e83e1a578c810f0abb", itemId: "5", urn: 'urn:decentraland:matic:collections-v2:0xa4a345afb8fa378cdabc68e83e1a578c810f0abb:5' })
  static PARCEL_WEARABLE_URN = new WearableEnumInst({ name: "parcel goggles", address: "0x26676a456bca88e418f9ea4b33a707364c0b5876", itemId: "1", urn: 'urn:decentraland:matic:collections-v2:0x26676a456bca88e418f9ea4b33a707364c0b5876:1' })
  static PARCEL_WEARABLE_SUIT_URN = new WearableEnumInst({ name: "parcel suit", address: "0x26676a456bca88e418f9ea4b33a707364c0b5876", itemId: "1", urn: 'urn:decentraland:matic:collections-v2:0x26676a456bca88e418f9ea4b33a707364c0b5876:1' })

  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 Symbiotic Hat","itemId":"18","rarity":"legendary"}

  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 T-Shirt","itemId":"1","rarity":"common"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 T-Shirt Day 1","itemId":"3","rarity":"common"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 T-Shirt Day 2","itemId":"4","rarity":"common"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 T-Shirt Day 3","itemId":"5","rarity":"common"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 T-Shirt Day 4","itemId":"6","rarity":"common"}
  static MVMF_SHIRT_ALL_DAY= new WearableEnumInst({ name: "MVMF22 T-Shirt", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "1", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:1' })
  static MVMF_SHIRT_D1 = new WearableEnumInst({ name: "T-Shirt Day 1", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "3", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:3' })
  static MVMF_SHIRT_D2 = new WearableEnumInst({ name: "T-Shirt Day 2", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "4", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:4' })
  static MVMF_SHIRT_D3 = new WearableEnumInst({ name: "T-Shirt Day 3", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "5", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:5' })
  static MVMF_SHIRT_D4 = new WearableEnumInst({ name: "T-Shirt Day 4", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "6", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:6' })

  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 White Rabbit Earphones","itemId":"9","rarity":"uncommon"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 White Rabbit Legs","itemId":"11","rarity":"rare"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 White Rabbit Shoes","itemId":"12","rarity":"uncommon"}
  //{"collectionAddress":"0x956b8d57066fc3d2562de22efd63624a1ba56e35","collectionName":"Metaverse Music Festival 2022","itemName":"MVMF22 White Rabbit Coat","itemId":"8","rarity":"uncommon"}
  static MVMF_WHITE_RABBIT_D1 = new WearableEnumInst({ name: "MVMF22 White Rabbit Earphones", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "9", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:9' })
  static MVMF_WHITE_RABBIT_D2 = new WearableEnumInst({ name: "MVMF22 White Rabbit Legs", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "11", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:11' })
  static MVMF_WHITE_RABBIT_D3 = new WearableEnumInst({ name: "MVMF22 White Rabbit Shoes", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "12", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:12' })
  static MVMF_WHITE_RABBIT_D4 = new WearableEnumInst({ name: "MVMF22 White Rabbit Coat", address: "0x956b8d57066fc3d2562de22efd63624a1ba56e35", itemId: "8", urn: 'urn:decentraland:matic:collections-v2:0x956b8d57066fc3d2562de22efd63624a1ba56e35:8' })

  //https://peer-lb.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xaca87498d8eb13c1209373bf5bfcf98a55c24b3a:1/thumbnail
  static ARTNET_HAT_URN = new WearableEnumInst({ name: "Artnet Hat", address: "0xaca87498d8eb13c1209373bf5bfcf98a55c24b3a", itemId: "1", urn: 'urn:decentraland:matic:collections-v2:0xaca87498d8eb13c1209373bf5bfcf98a55c24b3a:1' })

}

const dcl_artweek={
  "refId": "dcl_artweek",
  "campaignId": "PROVIDE PRODUCTION KEY HERE",
  "campaignKey": "PROVIDE PRODUCTION KEY HERE"
}
const dcl_artweek_px = {
  "refId": "dcl_artweek_px",
  "campaignId": "PROVIDE PRODUCTION KEY HERE",
  "campaignKey": "PROVIDE PRODUCTION KEY HERE"
}

const TEST_CAMPAIGN_KEY = 'PROVIDE_TEST_KEY_HERE'

const PROVIDE_PRODUCTION_KEY_HERE = "PROVIDE_PRODUCTION_KEY_HERE"
/**
 * artnet
 * burton
 * dcl_artweek
 * dcl_artweek_px
 */

//workaround will rewrite in booststrap
const CONFIG_CLAIM_TESTING_ENABLED = false



export type ClaimConfigInstType = {
  refId: string,
  campaign: string,
  campaignKeys: Record<string,string>
  wearableUrnsToCheck: string[]
}


export const ClaimConfig = {
  //rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.io' : 'https://rewards.decentraland.org',
  rewardsServer: CONFIG_CLAIM_TESTING_ENABLED ? 'https://rewards.decentraland.io' : 'https://rewards.decentraland.org',
  campaign: {
    TEST_STAGE1: {
        refId: "teststage1",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE PRODUCTION KEY HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
          key2: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PARCEL_WEARABLE_URN
        ])
      },
    TEST_STAGE2: {
        refId: "teststage2",
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE PRODUCTION KEY HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PARCEL_WEARABLE_URN
        ])
      },
      RANDOM_RAVERS: {
        refId: "randomravers",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          raveOrGraveBoots: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
          joggers: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
          untzShirt: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
          untzJacket: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
          bridgeShirt: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

    KRAKEN: {
        refId: "kraken",
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",//put dispenser day keys here
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
    ROAD_MAIN_SHIRT_ALL_DAYS: {
        refId: "roads_main_shirt_all_days",
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.MVMF_SHIRT_ALL_DAY
        ])
      },
    ROAD_DAILY_SHIRT: {
        refId: "roads_daily_shirt",
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
              : "PROVIDE_PRODUCTION_KEY_HERE",
          key2: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
              : "PROVIDE_PRODUCTION_KEY_HERE",
          key3: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
              : "PROVIDE_PRODUCTION_KEY_HERE",
          key4: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
              : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
    ROAD_MAIN_POTS: {
        refId: "roads_pots_all_days",
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

    LIMEWIRE: {
      refId: "limewire",
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
      campaignKeys: {
        key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
              : "PROVIDE_PRODUCTION_KEY_HERE"
      },
      wearableUrnsToCheck: toStringURLArray([
        WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
      ])
    },

      WHITE_RABBIT_D1: {
        refId: "whiteRabbitD1",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.MVMF_WHITE_RABBIT_D1
        ])
      },
      WHITE_RABBIT_D2: {
        refId: "whiteRabbitD2",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.MVMF_WHITE_RABBIT_D2
        ])
      },
      WHITE_RABBIT_D3: {
        refId: "whiteRabbitD3",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.MVMF_WHITE_RABBIT_D3
        ])
      },
      WHITE_RABBIT_D4: {
        refId: "whiteRabbitD4",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE_PRODUCTION_KEY_HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.MVMF_WHITE_RABBIT_D4
        ])
      },

      MAINSTAGE_CRATE_TEST: {
        refId: "DAY0_KEY0_TEST",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE PRODUCTION KEY HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
      MAINSTAGE_CRATE_KRAKEN_TEST: {
        refId: "DAY0_KEY0_TEST_KRAKEN",//mainstage.crate.test.kraken
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE PRODUCTION KEY HERE",
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
            : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      //START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1
      //START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1
      //START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1//START DAY 1

      MAINSTAGE_DAY1_KEY1_KRAKEN: {
        refId: "DAY1_KEY1_KRAKEN",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY_KRAKEN,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY1_KEY1_DEFAULT: {
        refId: "DAY1_KEY1_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY1_KEY2_DEFAULT: {
        refId: "DAY1_KEY2_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY1_KEY3_DEFAULT: {
        refId: "DAY1_KEY3_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY1_KEY4_DEFAULT: {
        refId: "DAY1_KEY4_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
      //END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1
      //END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1
      //END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1//END DAY 1

      //START DAY 2//START DAY 2//START DAY 2//START DAY 2//START DAY 2
      MAINSTAGE_DAY2_KEY1_KRAKEN: {
        refId: "DAY2_KEY1_KRAKEN",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY_KRAKEN,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY2_KEY1_DEFAULT: {
        refId: "DAY2_KEY1_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY2_KEY2_DEFAULT: {
        refId: "DAY2_KEY2_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY2_KEY3_DEFAULT: {
        refId: "DAY2_KEY3_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY2_KEY4_DEFAULT: {
        refId: "DAY2_KEY4_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
      //END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2
      //END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2
      //END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2//END DAY 2

      //START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3
      //START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3
      //START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3
      //START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3//START DAY 3
      MAINSTAGE_DAY3_KEY1_KRAKEN: {
        refId: "DAY3_KEY1_KRAKEN",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY_KRAKEN,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY3_KEY1_DEFAULT: {
        refId: "DAY3_KEY1_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY3_KEY2_DEFAULT: {
        refId: "DAY3_KEY2_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY3_KEY3_DEFAULT: {
        refId: "DAY3_KEY3_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE PRODUCTION KEY HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY3_KEY4_DEFAULT: {
        refId: "DAY3_KEY4_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
      //END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3
      //END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3
      //END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3//END DAY 3


      //START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4
      //START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4
      //START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4//START DAY 4

      MAINSTAGE_DAY4_KEY1_KRAKEN: {
        refId: "DAY4_KEY1_KRAKEN",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY_KRAKEN,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY4_KEY1_DEFAULT: {
        refId: "DAY4_KEY1_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY4_KEY2_DEFAULT: {
        refId: "DAY4_KEY2_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY4_KEY3_DEFAULT: {
        refId: "DAY4_KEY3_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },

      MAINSTAGE_DAY4_KEY4_DEFAULT: {
        refId: "DAY4_KEY4_DEFAULT",
          campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : PROD_PARCHUTE_CAMP_KEY,
        campaignKeys: {
          key1: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
                : "PROVIDE_PRODUCTION_KEY_HERE",
        },
        wearableUrnsToCheck: toStringURLArray([
          WearableEnum.PLACEHOLDER_TODO_NEED_ACTUAL_WEARBLE_DATA_HERE
        ])
      },
      //END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4
      //END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4
      //END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4//END DAY 4
    mvfw: {
      refId: STAGE_IDS.OZZ_FEST,
        campaign: CONFIG_CLAIM_TESTING_ENABLED ? `PROVIDE TEST KEY HERE` : "PROVIDE PRODUCTION KEY HERE",
      campaignKeys: {
        mapTShirt: CONFIG_CLAIM_TESTING_ENABLED ? TEST_CAMPAIGN_KEY
          : "PROVIDE PRODUCTION KEY HERE",
      },
      wearableUrnsToCheck: toStringURLArray([
        WearableEnum.PARCEL_WEARABLE_URN
      ])
    },
  }
}

export function updateConfigToTesting(testing:boolean){
  if(testing==false){
    return;
  }
  log("updateConfigToTesting in testing rewriting all")
  ClaimConfig.rewardsServer = 'https://rewards.decentraland.io'
  for(const p in ClaimConfig.campaign){
    const obj = (ClaimConfig.campaign as any)[p]

    if(obj !== undefined){
        obj.campaign = `PROVIDE TEST KEY HERE`
      if(obj.campaignKeys !== undefined){
        for(const q in obj.campaignKeys){
          obj.campaignKeys[q] = TEST_CAMPAIGN_KEY
        }
      }
    }
  }
}
