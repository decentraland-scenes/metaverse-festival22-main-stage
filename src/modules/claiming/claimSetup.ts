import { CONFIG, initConfig } from "src/config"
import { STAGE_IDS } from "src/stageIds"
import { sharedClaimBgTexture } from "src/claiming-dropin/claiming/claimResources"
import { createDispeners } from "src/claiming-dropin/claiming/dispensers"
import { ClaimConfig, initClaimConfig } from "src/claiming-dropin/claiming/loot-config"
import { campaignData, initCampaignData, initDispenserScheduler, startDispenserScheduler } from "src/claiming-dropin/claiming/schedule/scheduleSetup"
import { customResolveSourceImageSize } from "src/claiming-dropin/claiming/utils"

 
initConfig()

//SETUP DISPENERS AND SCHEDULE

//make changes/add more if you want here, otherwise will use what is in there
//MAKE SURE YOUR KEY IS IN THERE
function extendCampaignData(){ 
  
  //fetch or otherwise modify if needed here
   

}
 
export function initDispenserPositions(){

  
  //here just can do reference lookup
  const cratesToLoad = [
    ClaimConfig.campaign.MAINSTAGE_CRATE_KRAKEN_TEST,
    ClaimConfig.campaign.MAINSTAGE_CRATE_TEST,

    ClaimConfig.campaign.MAINSTAGE_DAY1_KEY1_KRAKEN,
    ClaimConfig.campaign.MAINSTAGE_DAY1_KEY1_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY1_KEY2_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY1_KEY3_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY1_KEY4_DEFAULT,

    ClaimConfig.campaign.MAINSTAGE_DAY2_KEY1_KRAKEN,
    ClaimConfig.campaign.MAINSTAGE_DAY2_KEY1_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY2_KEY2_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY2_KEY3_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY2_KEY4_DEFAULT,

    ClaimConfig.campaign.MAINSTAGE_DAY3_KEY1_KRAKEN,
    ClaimConfig.campaign.MAINSTAGE_DAY3_KEY1_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY3_KEY2_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY3_KEY3_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY3_KEY4_DEFAULT,

    ClaimConfig.campaign.MAINSTAGE_DAY4_KEY1_KRAKEN,
    ClaimConfig.campaign.MAINSTAGE_DAY4_KEY1_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY4_KEY2_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY4_KEY3_DEFAULT,
    ClaimConfig.campaign.MAINSTAGE_DAY4_KEY4_DEFAULT
  ]
  //loading crates
  for(const p in cratesToLoad){
    const camp = cratesToLoad[p]
    
    log("initDispenserPositions","adding ",camp.refId)

    CONFIG.DISPENSER_POSITIONS.push(
      {   
          name:camp.refId, //clickable object
          model: 'parachute' ,  //put model path when we have one
          claimConfig: camp,
          claimData:{claimServer: ClaimConfig.rewardsServer , campaign:camp.campaign,campaign_key:camp.campaignKeys.key1},
          dispenserUI:{
              boothModel:'src/claiming-dropin/models/poap/Wearable_Dispenser_WelcomeArea.glb',boothModelButton:'src/claiming-dropin/models/poap/Wearable_Button_WelcomeArea.glb'
              ,hoverText:"Claim Wearable" }, 
          wearableUrnsToCheck: camp.wearableUrnsToCheck,
          claimUIConfig: {bgTexture:sharedClaimBgTexture,claimServer:ClaimConfig.rewardsServer,resolveSourceImageSize:customResolveSourceImageSize},
          transform: {position: new Vector3(4,0,1) ,rotation:Quaternion.Euler(0,0,0) }
      }
    ) 
  }
  
}


export function initSceneClaiming(){

  initClaimConfig()
  initCampaignData() 
  extendCampaignData()
  const dispenserScheduler = initDispenserScheduler()
  createDispeners(CONFIG.DISPENSER_POSITIONS, dispenserScheduler.campaignSchedule)
  startDispenserScheduler()

}
