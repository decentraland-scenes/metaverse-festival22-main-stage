import { REGISTRY } from 'src/festival-mgmt-dropin/registry'

import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'

import { CONFIG, initConfig } from 'src/config'
//import { initShowSetup } from 'src/modules/showMgmt/showSetup'

import {
  playDefaultVideo,
  isPlayerDefault,
  startShow,
  stopShow,
  updateStageDebugInfo,
  checkSceneActiveStatus,
} from './showTrigger'


let data: any

export function loadServerHandler(){
initConfig() 
//initShowSetup()

let PING_INTERVAL = 1000
const REMOTE_VIDEO_SERVER_CONFIG = CONFIG.REMOTE_VIDEO_CONFIG//

let firstPing: boolean = true

if(CONFIG.REMOTE_VIDEO_CONFIG_ENABLED){
  let serverInterval = new Entity()
  engine.addEntity(serverInterval)
  serverInterval.addComponent(
    new utils.Interval(PING_INTERVAL, () => {
      pingServer()
    })
  )
}else{
  log("serverHandler.ts","CONFIG.REMOVE_VIDEO_CONFIG_ENABLED set to ",CONFIG.REMOTE_VIDEO_CONFIG_ENABLED,"remote video config disabled!")
}


async function pingServer() {
    //if (playerFar) return
    if (CONFIG.FAKING_LOCALLY) return
    if(!CONFIG.REMOTE_VIDEO_CONFIG_ENABLED) return
    if(CONFIG.ENABLED_DETECT_SCENE_ACTIVE_UTIL && !CONFIG.CAN_PLAY_VIDEO){
      //log("skip, cannot play, dont poll")
      return
    }
    let url = REMOTE_VIDEO_SERVER_CONFIG
    //ensure has "?" if adding query params
    if(url.indexOf("?")<0){
      url += "?"
    }
    let result = await fetch(
      url + "v=" + Date.now() / 1000
    )
    let response = await result.json()

    if (!data) {
      data = response
      log('stage',CONFIG.STAGE_ID,"pingServer","data",data)
    } else {
      checkNewMessage(response)
      firstPing = false
    }
  }
  function processMessage( type:string,message:string ){
    log("processMessage",type,message)
    const RUN_ACTION_PREFIX = "run:"
    if(message.indexOf(RUN_ACTION_PREFIX) > -1){
      //RUN AS SHOW ACTION
      const action = message.substring( message.indexOf(RUN_ACTION_PREFIX) + RUN_ACTION_PREFIX.length ).trim()
      log("processMessage.runaction",type,action)
      log('action is', action)
      if(REGISTRY !== undefined && REGISTRY.SHOW_MGR !== undefined){
        REGISTRY.SHOW_MGR.runAction( action )
      }
    }else{  
      ui.displayAnnouncement(message)
    }
  }
  function checkNewMessage(res: any) {
    const METHOD_NAME = "checkNewMessage"
    let stage = res.stages[CONFIG.STAGE_ID]
    log('stage',CONFIG.STAGE_ID,METHOD_NAME,"data.stage",stage)

    if(CONFIG.IN_PREVIEW) updateStageDebugInfo(stage)

    if(stage === undefined){
      log('stage',CONFIG.STAGE_ID,METHOD_NAME,"ERROR data.stage is undefined",stage,"for CONFIG.STAGE_ID",CONFIG.STAGE_ID)
      return;
    } 
    if(data.stages[CONFIG.STAGE_ID] === undefined && stage !== undefined){
      log('stage',CONFIG.STAGE_ID,METHOD_NAME,"data adding stage",stage,"for CONFIG.STAGE_ID",CONFIG.STAGE_ID)
      data.stages[CONFIG.STAGE_ID] = stage
    }

    let day = stage.day

    //   log('here', stage)

    // stop polling server if show over
    //   if (stage.ended) {
    //     serverInterval.removeComponent(utils.Interval)
    //     log('NO LONGER CHECKING SERVER')
    //     // show message?
    //   }

    // Global message
    if (data.global.message != res.global.message) {
      data.global.message = res.global.message
      processMessage( "global",data.global.message )
    }

    //   Stage message
    if (
      stage &&
      stage.message &&
      data.stages[CONFIG.STAGE_ID].message != stage.message
    ) {
      data.stages[CONFIG.STAGE_ID].message = stage.message
      processMessage( "stage", stage.message)
    }

    // Show handling

    
    const hasShowDataAndLive = 
        data &&
        stage &&
        stage.live &&
        data.stages[CONFIG.STAGE_ID].live
        ;

    if (
      stage &&
      (stage.artistId === -1 || stage.artistId === 500 || !stage.live) &&
      !data.stages[CONFIG.STAGE_ID].live
    ) {
      // no show
      log('stage',CONFIG.STAGE_ID,METHOD_NAME,'no show yet') 
      playDefaultVideo(stage.days[day],stage.offline, stage.ad)
    } else if (
      stage &&
      stage.live &&
      (!data.stages[CONFIG.STAGE_ID].live || firstPing)
    ) {
      // show is on, I'm not playing it

      if (
        //notNPEIndexOOB(stage,day,stage.artistId) && 
        stage.days[day][stage.artistId].startTime +
          stage.days[day][stage.artistId].length <
        Date.now() / 1000
      ) {
        // show is over 
        log('stage',CONFIG.STAGE_ID,METHOD_NAME,
          'show is over, Ended ',
          Date.now() / 1000 -
            stage.days[day][stage.artistId].startTime +
            stage.days[day][stage.artistId].length,
          ' seconds ago'
        )
        data.stages[CONFIG.STAGE_ID].live = false
        playDefaultVideo(stage.days[day],stage.offline, stage.ad)
        return
      } else {
        // new show running (already started or about to start)
        log('stage',CONFIG.STAGE_ID,METHOD_NAME,'STARTING SHOW FOR ', stage.artistId)

        data.stages[CONFIG.STAGE_ID].live = true
        data.stages[CONFIG.STAGE_ID].artistId = stage.artistId
        data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId] =
          stage.days[day][stage.artistId]
        startShow(stage.days[day][stage.artistId], stage.artistId)
      }
    } else if (
      hasShowDataAndLive &&
      stage.artistId !== data.stages[CONFIG.STAGE_ID].artistId
    ) {
      // you're playing the wrong artist

      log('stage',METHOD_NAME,CONFIG.STAGE_ID,
        'was playing wrong artist: ',
        data.stages[CONFIG.STAGE_ID].artistId,
        ' Now playing ',
        stage.artistId
      )

      data.stages[CONFIG.STAGE_ID].live = true
      data.stages[CONFIG.STAGE_ID].artistId = stage.artistId
      data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId] =
        stage.days[day][stage.artistId]

      startShow(stage.days[day][stage.artistId], stage.artistId)
    } else if (
      (stage && data && data.stages[CONFIG.STAGE_ID].live && !stage.live) ||
      stage.artistId === -1 ||
      stage.artistId === 500
    ) {
      // stop the show!
      try{
        log('stage',CONFIG.STAGE_ID,METHOD_NAME,
          'show finished ',
          Date.now() / 1000 -
            data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId]
              .startTime +
            data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId].length,
          ' seconds ago'
        )
      }catch(e){
        log("log failed.show finished.could not report ending time","day",day)
      }

      let timeLeft = -1
      if (
        data &&
        data.stages[CONFIG.STAGE_ID].days[day] &&
        data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId] ){
          timeLeft = 
                Date.now() / 1000 -
                data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId]
                  .startTime +
                data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId].length
        
      }
      // add grace period of 2 minutes if currently watching near the end
      if ( timeLeft > 0 && timeLeft < 60 ) {
        try{
          // wait till next ping
          log('stage',CONFIG.STAGE_ID,METHOD_NAME,
            'show finished but we are giving you a few extra minutes',
            timeLeft,
            ' seconds remaining'
          )
        }catch(e){
          log("log failed.show finished.giving more time","day",day)
        } 
      } else {
        log('stage',CONFIG.STAGE_ID,METHOD_NAME,'STOP THE SHOW NOW!')
        stopShow()

        data.stages[CONFIG.STAGE_ID].live = false
        playDefaultVideo(stage.days[day],stage.offline, stage.ad)
      }
    } else if (
      hasShowDataAndLive && 
      stage.artistId == data.stages[CONFIG.STAGE_ID].artistId &&
      Math.abs(
        data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId]
          .startTime - stage.days[day][stage.artistId].startTime
      ) >
        2 * 60
    ) {
      // playing right artist, time is off by a lot
      // reset the show!

      data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId].startTime =
        stage.days[day][stage.artistId].startTime
      log('stage',CONFIG.STAGE_ID,METHOD_NAME,
        'playing the right artist, but off by: ',
        Math.abs(
          data.stages[CONFIG.STAGE_ID].days[day][data.stages[CONFIG.STAGE_ID].artistId]
            .startTime - stage.days[day][stage.artistId].startTime
        ),
        ' seconds'
      )

      startShow(stage.days[day][stage.artistId], stage.artistId)
    } else {
      log('stage',CONFIG.STAGE_ID,METHOD_NAME,'NONE OF THE CONDITIONS WERE MET ', stage, ' DATA: ', data)
      //see if should be playing
      checkSceneActiveStatus()
    }

    //call again to capture video / status change
    if(CONFIG.IN_PREVIEW) updateStageDebugInfo(stage)
    //TODO
    // if server fails, resort to hardcoded metadata??
  }

  if (!CONFIG.FAKING_LOCALLY) {
    pingServer()
  }
  /*
  CONFIG.CAN_PLAY_VIDEO - will be handling this via SceneActiveUtil
  let playerFar: boolean = true

  let showTrigger = new Entity()
  showTrigger.addComponent(
    new Transform({
      position: new Vector3(8, 0, 8),
    })
  )
  engine.addEntity(showTrigger)

  showTrigger.addComponent(
    new utils.TriggerComponent(
      new utils.TriggerBoxShape(
        new Vector3(16 * 9, 16 * 9, 16 * 9),
        new Vector3(16 * 3.5, 7.5, 16 * 3.5)
      ),
      {
        onCameraEnter: () => {
          playerFar = false
          pingServer()
        },
        onCameraExit: () => {
          if (isPlayerDefault()) {
            playerFar = true
            data.stages[CONFIG.STAGE_ID].live = false
            stopShow()
          }
        },
        enableDebug: true
      }
    )
  )*/
}