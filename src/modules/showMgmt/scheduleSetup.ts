
import * as showMgmt from 'src/festival-mgmt-dropin/show-management/index'
//import { AkiraSubs } from 'src/subtitle-files/mergeAkira'
import { erikakrall } from 'src/subtitle-files/erikakrall'
import { handshaking } from 'src/subtitle-files/handshaking'
import { breland } from 'src/subtitle-files/breland'
import { spottie } from 'src/subtitle-files/spottie'
import { amadis } from 'src/subtitle-files/amadis'
import { vladimir } from 'src/subtitle-files/vladimir'
import { maija } from 'src/subtitle-files/maija'
import { akira } from 'src/subtitle-files/akira'
import { sozi } from 'src/subtitle-files/sozi'
import { pip2am } from 'src/subtitle-files/pip2am' 
import { atarashi } from 'src/subtitle-files/atarashi'
import { bjork } from 'src/subtitle-files/bjork'
import { losers } from 'src/subtitle-files/losers'
import { liangold } from 'src/subtitle-files/liangold'
import { snh48 } from 'src/subtitle-files/snh48'
import { stickmen } from 'src/subtitle-files/stickmen'
import { aigrobot } from 'src/subtitle-files/aigrobot'
import { chillpill } from 'src/subtitle-files/chillpill'

// import { CodySubs } from 'src/subtitle-files/mergeCody'
// import { FuzeSubs } from 'src/subtitle-files/mergeFuze'
// import { HarrisonSubs } from 'src/subtitle-files/mergeHarrison'
// import { SpottieSubs } from 'src/subtitle-files/mergeSpottie'
// import { ParisSubs } from 'src/subtitle-files/Paris'
import { DemoShowSubs } from './subtitle-files/DemoShowSubs'
import { IntermissionSubs } from './subtitle-files/IntermissionSubs'
import { ClaimConfig } from 'src/claiming-dropin/claiming/loot-config'
import { ShowType } from 'src/festival-mgmt-dropin/show-management/index'


// Video to display as background while no show is playing
const DEFAULT_VIDEO = 'https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252'

// Video schedule     
 
const defaultShow:showMgmt.ShowType = {
  id: -1, //can 
  title: 'Intermission',
  artist: 'Intermission',
  link: DEFAULT_VIDEO,
  subs: IntermissionSubs, 
  startTime: -1,
  length: 17, 
  loop: true
}
  
//showing how a show can be mid play, and show will skip to it correct starting point
const testStartTime = new Date(Date.now() + (-5 *1000)).getTime() / 1000
 
const testStartTime2 = new Date(Date.now() + (40 *1000)).getTime() / 1000   

const testStartTime3 = new Date(Date.now() + (80 *1000)).getTime() / 1000   
 
//const startTimeStr = "2022-05-09T16:39:00-04:00"
//log("the.time.is",new Date(testStartTime).toLocaleString())

//NOTES!!! parchutes defines what to be airdropped at beginning of show
//will be random 0-2:00 when dropped, keey your eyes peeled
const CLAIM_CAMP = ClaimConfig.campaign
const AIRDROP_ON_SHOW_START = true //change to false if subtitle wants to handle it syntax : AIRDROP {"refId":"DAY2_KEY2_DEFAULT","randomDelayMax":120}

export const SHOW_REGISTRY = {
  demoShow1:{ 
    id: 1,
    title: 'Demo Show',
    artist: 'Demo Show',
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    subs: DemoShowSubs, 
    artistId: "omar",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime, 
    length: 28
  },
  demoShow2:{ 
    id: 2, 
    title: 'Demo Show2',
    artist: 'Demo Show2',
    link: `videos/tunnelVisuals.mp4`,
    subs: DemoShowSubs,
    artistId: "omar2",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 28,
  },
  vladimirShow:{ 
    id: 9,
    title: 'Vladimir Cauchemar',
    artist: 'Vladimir Cauchemar',
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252E`,
    subtitleId:"vladimir",
    subs: vladimir,
    artistId: "vladimir",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY1_KEY3_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY1_KEY1_KRAKEN.refId} 
  },
  erikakrallShow: {
    id: 10,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Eriika Krall',
    artist: 'Eriika Krall',
    subtitleId:"erikakrall",
    subs: erikakrall,
    artistId: "erikakrall",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 300,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY1_KEY2_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY1_KEY1_KRAKEN.refId} 
  },
  handshakingShow: {
    id: 11,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Handshaking',
    artist: 'Handshaking',
    subtitleId:"handshaking",
    subs: handshaking,
    artistId: "handshaking",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY1_KEY1_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY1_KEY1_KRAKEN.refId} 
  },
  brelandShow: {
    id: 12,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Breland',
    artist: 'Breland',
    subtitleId:"breland",
    subs: breland,
    artistId: "breland",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY2_KEY4_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY2_KEY1_KRAKEN.refId} 
  },
  spottieShow: {
    id: 13,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Spottie WiFi',
    artist: 'Spottie WiFi',
    subtitleId:"spottie",
    subs: spottie,
    artistId: "spottie",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY2_KEY3_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY2_KEY1_KRAKEN.refId} 
  },
  amadisShow: {
    id: 14,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Amadis & The Ambassadors',
    artist: 'Amadis & The Ambassadors',
    subtitleId:"amadis",
    subs: amadis,
    artistId: "amadis",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY2_KEY2_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY2_KEY1_KRAKEN.refId} 
  },
  maijaShow: {
    id: 15,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Maija Kauhanen',
    artist: 'Maija',
    subtitleId:"maija",
    subs: maija,
    artistId: "maija",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY2_KEY1_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY2_KEY1_KRAKEN.refId} 
  },
  akiraShow: {
    id: 16,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Akira The Don',
    artist: 'Akira The Don',
    subtitleId:"akira",
    subs: akira,
    artistId: "akira",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY3_KEY4_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_KRAKEN.refId} 
  },
  soziShow: {
    id: 17,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Sozi',
    artist: 'Sozi',
    subtitleId:"sozi",
    subs: sozi,
    artistId: "sozi",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY3_KEY3_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_KRAKEN.refId} 
  },
  pip2amShow: {
    id: 18,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Pip + 2am',
    artist: 'Pip + 2am',
    subtitleId:"pip2am",
    subs: pip2am,
    artistId: "pip2am",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY3_KEY2_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_KRAKEN.refId} 
  },
  atarashiShow: {
    id: 19,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Atarashi Gakko ',
    artist: 'Atarashi Gakko',
    subtitleId:"atarashi",
    subs: atarashi,
    artistId: "atarashi",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_KRAKEN.refId} 
  },
  bjorkShow: {
    id: 20,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'BJÖRK',
    artist: 'BJÖRK',
    subtitleId:"bjork",
    subs: bjork,
    artistId: "bjork",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY4_KEY4_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY4_KEY1_KRAKEN.refId} 
  },
  losersShow: {
    id: 21,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Losers',
    artist: 'Losers',
    subtitleId:"losers",
    subs: losers,
    artistId: "losers",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY4_KEY3_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY4_KEY1_KRAKEN.refId} 
  },
  liangoldShow: {
    id: 22,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Lian Gold',
    artist: 'Lian Gold',
    subtitleId:"liangold",
    subs: liangold,
    artistId: "liangold",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY4_KEY2_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY4_KEY1_KRAKEN.refId} 
  },
  snh48Show: {
    id: 23,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'SNH48',
    artist: 'SNH48',
    subtitleId:"snh48",
    subs: snh48,
    artistId: "snh48",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY4_KEY1_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY4_KEY1_KRAKEN.refId} 
  },
  stickmenShow: {
    id: 25,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'The Stickmen Project',
    artist: 'The Stickmen Project',
    subtitleId:"stickmen",
    subs: stickmen,
    artistId: "stickmen",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY1_KEY4_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY1_KEY1_KRAKEN.refId} 
  },
  aigrobotShow: {//per iara moved to Hex Show
    id: 24,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Immersive Kind & AIGG',
    artist: 'Immersive Kind & AIGG',
    subtitleId:"aigrobot",
    subs: aigrobot,
    artistId: "aigrobot",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    //parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_KRAKEN.refId} 
  },

  chillpillShow: {//per iara moved to Hex Show
    id: 26,
    link: `https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252`,
    title: 'Chill Pill',
    artist: 'Chill Pill',
    subtitleId:"chillpill",
    subs: chillpill,
    artistId: "chillpill",//aka subtitle id that you must share with person managing remove server 
    startTime: testStartTime,
    length: 30,
    //parchutes:{ triggerOnShowStart: AIRDROP_ON_SHOW_START, default:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_DEFAULT.refId, sponsor:CLAIM_CAMP.MAINSTAGE_DAY3_KEY1_KRAKEN.refId} 
  },





  defaultShow: defaultShow
}


export const shows: showMgmt.ShowType[] = [
  SHOW_REGISTRY.demoShow1,
  SHOW_REGISTRY.demoShow2,
  SHOW_REGISTRY.vladimirShow,
  SHOW_REGISTRY.erikakrallShow,
  SHOW_REGISTRY.handshakingShow,
  SHOW_REGISTRY.brelandShow,
  SHOW_REGISTRY.spottieShow,
  SHOW_REGISTRY.amadisShow,
  SHOW_REGISTRY.maijaShow,
  SHOW_REGISTRY.akiraShow,
  SHOW_REGISTRY.soziShow,
  SHOW_REGISTRY.pip2amShow,
  SHOW_REGISTRY.atarashiShow,
  SHOW_REGISTRY.bjorkShow,
  SHOW_REGISTRY.losersShow,
  SHOW_REGISTRY.liangoldShow,
  SHOW_REGISTRY.snh48Show,
  SHOW_REGISTRY.aigrobotShow,
  SHOW_REGISTRY.stickmenShow,
  SHOW_REGISTRY.chillpillShow,
  
  defaultShow
]


export function findShowById(id:number){
  for(const p in SHOW_REGISTRY){
    const itm = (SHOW_REGISTRY as any)[p]
    if(itm.id == id){
      log("findShowById.FOUND  SHOW ",id,itm)
      return itm
    }
  }
  log("findShowById.FAILED TO FIND SHOW ",id)

}

//MAKE SURE YOU REGISTER SUBTITLES HERE
export const subtitlesList = [
  //id must be unique (ideally named that is human readable) and sent to person managing video system so it knows what value to send in. stored as the subtitleId/artistId
  {id:"vladimir",sub:vladimir},
  {id:"erikakrall",sub:erikakrall},
  {id:"handshaking",sub:handshaking},
  {id:"breland",sub:breland},
  {id:"spottie",sub:spottie},
  {id:"amadis",sub:amadis},
  {id:"maija",sub:maija},
  {id:"akira",sub:akira},
  {id:"sozi",sub:sozi},
  {id:"pip2am",sub:pip2am},
  {id:"atarashi",sub:atarashi},
  {id:"bjork",sub:bjork},
  {id:"losers",sub:losers},
  {id:"liangold",sub:liangold},
  {id:"snh48",sub:snh48},
  {id:"stickmen",sub:stickmen },
  {id:"aigrobot",sub:aigrobot},
  {id:"aigrobot",sub:chillpill},

]

export function getShowTypeFromLocalBySubtitleId(id:string):ShowType|undefined{
  //try fall back incase it was registered here for local work
  for(const p in SHOW_REGISTRY){
    const itm = (SHOW_REGISTRY as any)[p]
    if(itm.artistId == id){
      log("getShowTypeFromLocalBySubtitleId found  in SHOW_REGISTRY by ",id ,". returning show ",itm)
      return itm
    }
  }
  log("getShowTypeFromLocalBySubtitleId.FAILED TO FIND SHOW ",id)
  log("WARN getShowTypeFromLocalBySubtitleId did not find subtitle by ",id ,". returning empty show")
  return undefined
}
export function getSubtitleById(id:string):string{
  
  for(const p in subtitlesList){
    if(subtitlesList[p].id == id){
      log("getSubtitleById found subtitle in subtitlesList by ",id ,". returning subtitle ")
      return subtitlesList[p].sub
    }
  }
  //try fall back incase it was registered here for local work
  for(const p in SHOW_REGISTRY){
    const itm = (SHOW_REGISTRY as any)[p]
    if(itm.artistId == id){
      log("getSubtitleById found subtitle in SHOW_REGISTRY by ",id ,". returning subtitle ")
      return itm
    }
  }
  log("findShowById.FAILED TO FIND SHOW ",id)
  log("WARN getSubtitleById did not find subtitle by ",id ,". returning empty subtitle")
  return ""
} 



export const showData: showMgmt.ShowDataType = {
  defaultShow: defaultShow,
  shows: shows
}