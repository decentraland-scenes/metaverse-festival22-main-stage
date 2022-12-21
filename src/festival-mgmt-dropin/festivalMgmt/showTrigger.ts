//import { initRegistry, REGISTRY } from 'src/festival-mgmt-dropin/registry'
import * as utils from '@dcl/ecs-scene-utils'

//import { hideBoard, startNextShowCounter } from './nextShowCounter'
import { hideArtistName, hideBoard, setArtistName, startNextShowCounter } from 'src/modules/showStatusDisplays'


import {  findShowById, getSubtitleById, SHOW_REGISTRY } from 'src/modules/showMgmt/scheduleSetup'
import * as showMgmt from 'src/festival-mgmt-dropin/show-management/index'
import { adType } from 'src/modules/showMgmt/showTypes'

import { CONFIG } from 'src/config'
import { updateDebugStageInfo } from './debugUI'

 
let _REGISTRY:{SHOW_MGR:showMgmt.ShowManager}

export function initShowTrigger(R:{SHOW_MGR:showMgmt.ShowManager}){
  _REGISTRY=R
}

//// key functions

let PLAYING_DEFAULT: boolean = false
export function isPlayerDefault(){
  return PLAYING_DEFAULT
}

export function checkSceneActiveStatus(){
  log('checkSceneActiveStatus',"CONFIG.CAN_PLAY_VIDEO",CONFIG.CAN_PLAY_VIDEO)
  const SHOW_MGR = _REGISTRY.SHOW_MGR
  if(SHOW_MGR === undefined){
    log('checkSceneActiveStatus.SHOW_MGR invalid skipping',SHOW_MGR)
    return;
  }
  if(!SHOW_MGR.isPlaying()){
    if(PLAYING_DEFAULT){
      if(CONFIG.CAN_PLAY_VIDEO){
        log('checkSceneActiveStatus.starting default again',)
        SHOW_MGR.videoSystem.videoTexture.play()
      }else{
        log('checkSceneActiveStatus.cannot play default',)
      } 
    }else{ 
      if(CONFIG.CAN_PLAY_VIDEO){
        log('checkSceneActiveStatus.starting ????',SHOW_MGR.currentlyPlaying)
        SHOW_MGR.startShow(SHOW_MGR.currentlyPlaying)
      }else{
        log('checkSceneActiveStatus.cannot play ????',SHOW_MGR.currentlyPlaying)
      }
    }
  }
}
export function startShow(showData: showMgmt.ShowType, artistId: number) {
  let currentTime = Date.now() / 1000

  let startTime = showData.startTime as number
  let timeDiff = currentTime - startTime

  PLAYING_DEFAULT = false //startShow is called for non default values

  log(
    'show started for ',
    artistId,
    ' ',
    timeDiff, 
    ' seconds ago, show playing: ',
    showData
  )

  log(
    'CURRENT TIME: ',
    currentTime,
    ' SHOW START: ',
    showData.startTime,
    ' DIFF: ',
    timeDiff
  )

  // TODO: change sign with artist name

  

  if (showData.length && timeDiff >= showData.length * 60) {
    log('show ended')
    return
  } else if (startTime > currentTime) {
    utils.setTimeout((startTime - currentTime) * 1000, () => {
      playVideo(showData, artistId, 0)
    })
    //set countdown  
    //count
    startNextShowCounter([showData])
    log('show will start in ', startTime - currentTime)
  } else {
    log('starting show, ', timeDiff, ' seconds late')

    playVideo(showData, artistId, timeDiff)
  }
}

export function stopShow() {
  const SHOW_MGR = _REGISTRY.SHOW_MGR
  /*
  if (videoMat.albedoTexture) {
    let currentVideoTexuture = videoMat.albedoTexture as VideoTexture
    currentVideoTexuture.playing = false
  }

  if (myVideoSystem) {
    engine.removeSystem(myVideoSystem)
  }

  if (mySubtitleSystem) {
    runAction('STOPALL')
    engine.removeSystem(mySubtitleSystem)
  }*/

  PLAYING_DEFAULT = false

  SHOW_MGR.stopShow()
}

export function playVideo(showData: showMgmt.ShowType, artistId: number,timeDiff:number){
  //debugger
  
  if(_REGISTRY === undefined){
    log("REGISTRY NULL!!!") 
  }
  const SHOW_MGR = _REGISTRY.SHOW_MGR
  let currentTime = Date.now() / 1000
  let startTime = showData.startTime as number

  hideBoard()//somewhere else?

  const subtitleId = showData.subtitleId !== undefined ? showData.subtitleId : artistId+""

  SHOW_MGR.playVideo(
    {
        id: showData.id,
        link: showData.link,
        subs: showData.subs !== undefined ? showData.subs : getSubtitleById(subtitleId),
        subtitleId: subtitleId,
        //artistId: artistId, //TODO add
        startTime: showData.startTime,
        length: showData.length,
        artist: showData.artist,
        title: showData.artist,
        //loop?: boolean;
    },
    currentTime - startTime
  )
 
  if (counterDelay.hasComponent(utils.Delay)) {
    counterDelay.removeComponent(utils.Delay)
  }

}


let counterDelay = new Entity()
engine.addEntity(counterDelay)



export function playDefaultVideo(runOfShow?: showMgmt.ShowType[], offlineLink?:string, ad?: adType) {
  const SHOW_MGR = _REGISTRY.SHOW_MGR
  log("playDefaultVideo ENTRY",runOfShow,offlineLink,ad)
  if (PLAYING_DEFAULT) {
    checkSceneActiveStatus()
    log("playDefaultVideo.already playing",runOfShow,offlineLink,ad)
    return
  }
  
  const now = Date.now()
  //debugger
  stopShow()
  
  PLAYING_DEFAULT = true

  let subtitleId = "-1" //-1 will return no sub title data 

  //let myVideoClip: VideoClip
  let showData = SHOW_REGISTRY.defaultShow
  

  if (ad && ad.enabled) {
    showData = 
      {
        id: -1,
        link: ad.link,
        subs: getSubtitleById(subtitleId),
        startTime: now,
        length: -1,
        artist: "Advert",
        title: "Add Title",
        loop: false
    }
    if (runOfShow) {
      counterDelay.addComponentOrReplace(
        new utils.Delay(CONFIG.SHOW_COUNTER_DELAY, () => {
          startNextShowCounter(runOfShow)
        })
      )
    }
  } else {
    showData = SHOW_REGISTRY.defaultShow

    if(offlineLink!==undefined){
      showData = {
        id: -1,
        link: offlineLink,
        subs: getSubtitleById(subtitleId),
        startTime: now,
        length: -1,
        artist: "Intermission",
        title: "Intermission",
        loop: true
      }
      log("playDefaultVideo.using remote offline link",showData)
    }else{
      log("playDefaultVideo.using hardcoded offline link",showData)
    }
    

    if (runOfShow) {
      startNextShowCounter(runOfShow)
    }
  }
 

  SHOW_MGR.playVideo(
    showData,
    0
  )

  /*
  const myVideoTexture = new VideoTexture(myVideoClip)

  // main video
  videoMat.albedoTexture = myVideoTexture
  videoMat.emissiveTexture = myVideoTexture

  //vidMatMask.albedoTexture = myVideoTexture
  //vidMatMask.emissiveTexture = myVideoTexture

  if (ad && ad.enabled) {
    myVideoTexture.loop = false
  } else {
    myVideoTexture.loop = true
  }
  myVideoTexture.playing = true
  */

  SHOW_MGR.runAction('artist0')
}

export function updateStageDebugInfo(stage:any){
  updateDebugStageInfo(stage)
}
 
///// DEBUG  REMOVE!!!

//startShow(shows['test'])

const input = Input.instance

// /////// REMOVE ////////
// // DEBUG PANEL  (to remove!)
// let canvas = new UICanvas()
// let debugTimeMarker = new UIText(canvas)
// debugTimeMarker.positionX = 400
// debugTimeMarker.color = Color4.Red()

// function debugShowTime(time: number) {
//   let ms = time % 1000
//   let seconds = Math.floor(time / 1000) % 60
//   let minutes = Math.floor(time / (60 * 1000))
//   let hours = Math.floor(minutes / 60)
 
//   debugTimeMarker.value =
//     'last change at: ' + hours + ':' + minutes + ':' + seconds + '.' + ms
// }
  
// parameters:
// - show w URL from showMetadata.ts
// - index from subtitlesList in Showmetadata.ts (starts in 0)
// - seconds of offset to start
if (CONFIG.FAKING_LOCALLY) {
  
  const fn = ()=>{
    //poll till can play fires
    if(CONFIG.CAN_PLAY_VIDEO){
      //debugger
      //log(REGISTRY)
      const showToTestLocal = findShowById( CONFIG.FAKING_LOCALLY_SHOW_ID )
      //reset play time to NOW!
      //for speed at this point switching to CONFIG.FAKING_LOCALLY_LATENCY
      const latencyTest = (CONFIG as any)["FAKING_LOCALLY_LATENCY"] !== undefined ? (CONFIG as any)["FAKING_LOCALLY_LATENCY"] : 0
      log("FAKING_LOCALLY. latencyTest",latencyTest)
      showToTestLocal.startTime = Date.now()/1000 + (latencyTest*-1)
      playVideo( showToTestLocal, showToTestLocal.artistId , 0)
    }else{
      //wait a little bit and check again
      log("FAKING_LOCALLY. CAN_PLAY_VIDEO not ready yet. wait a little bit and check again")
      utils.setTimeout(1000,()=>{ 
        fn()
      })
    }
  }
  //debugger
  //small delay for other file listerners to get registered
  fn()
}
