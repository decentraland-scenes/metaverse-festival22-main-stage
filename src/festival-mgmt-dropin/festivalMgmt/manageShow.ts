import { REGISTRY } from 'src/festival-mgmt-dropin/registry'
import * as showMgmt from 'src/festival-mgmt-dropin/show-management/index'
import * as utils from '@dcl/ecs-scene-utils'
import { hideArtistName, hideBoard, setArtistName, startNextShowCounter } from 'src/modules/showStatusDisplays'
//import { hideArtistName, hideBoard, setArtistName, startNextShowCounter } from 'src/modules/festivalMgmt/nextShowCounter'
import { SceneActiveUtil } from 'src/festival-mgmt-dropin/show-management/addonUtils/sceneActiveUtil'
import { CONFIG, initConfig } from 'src/config'

import { initShowDisplay } from 'src/modules/videoScreens'
//import { initShowSetup } from 'src/modules/showMgmt/showSetup'
import { ShowAirdopActionHandler } from './ShowAirdopActionHandler'

export function loadManageShow(){
  initConfig()
  //initShowSetup()
  initShowDisplay()

  const SHOW_MGR = REGISTRY.SHOW_MGR
  if(SHOW_MGR === undefined){
    log("loadManageShow ERROR, SHOW_MGR is null!!!")
    return;
  }
  if(REGISTRY.RUN_OF_SHOW_SYSTEM === undefined){
    log("loadManageShow ERROR, RUN_OF_SHOW_SYSTEM is null!!!")
    return;
  }
  REGISTRY.RUN_OF_SHOW_SYSTEM.checkIntervalSeconds = CONFIG.LOCAL_VIDEO_SHOW_SCHEDULER_INTEVAL
  // NOTE: STOPALL, PAUSEALL and default must always exist


  //let currentAnim = 1

  // const input = Input.instance

  // input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  //   //step to next ID
  //   currentAnim += 1

  //   log('Playing Anim L' + (currentAnim - 1))

  //   runAction('state'.concat(currentAnim.toString()))
  // })



  //START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF
  //START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF
  //START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF
  //START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF
  //START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF
  //START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF//START NEW STUFF

  const logger:showMgmt.Logger = showMgmt.LoggerFactory.getLogger("MyScene.ManageShow.ts")

  //STARTING EXTEND RUN ACTION

  REGISTRY.SHOW_MGR.actionMgr.extRunAction = (action:string)=>{

    let applied = false
    switch(action){
      case 'artist0':
        //DEFAULT VIDEO
        //debugger
        break

      case 'OLD_WAY':
        logger.debug("SHOW_MGR.actionMgr.extRunAction","OLD_WAY fired") 
        applied = true
      break;
    }
    return applied
  }



  let currentVideoTexture:VideoTexture
  REGISTRY.SHOW_MGR.addStopShowListeners( (event:showMgmt.StopShowEvent)=>{
    logger.debug("SHOW_MGR.addStopShowListeners"," fired",event)
    if (currentVideoTexture) { 
      let currentVideoTexuture = currentVideoTexture
      currentVideoTexuture.playing = false
    }
    hideArtistName()   
  } )

  const sceneActiveUtil = new SceneActiveUtil( setVideoPlaying ) 
  if(CONFIG.ENABLED_DETECT_SCENE_ACTIVE_UTIL) sceneActiveUtil.init()

  
  function setVideoPlaying(val: boolean) {
    const METHOD_NAME = "setVideoPlaying"
    log('stage',CONFIG.STAGE_ID,METHOD_NAME,"val",val);
    if (val) {
      if(!CONFIG.ENABLED_DETECT_SCENE_ACTIVE_UTIL || (sceneActiveUtil.capturedUserInput || sceneActiveUtil.playerPositionChanged)){
        //currentVideoTexture.play()
        CONFIG.CAN_PLAY_VIDEO = true 

        if(REGISTRY.SHOW_MGR !== undefined){
          
          if(!REGISTRY.SHOW_MGR.checkFirstTimeDone){
            REGISTRY.SHOW_MGR.checkStartFirstTime()
          }else if(REGISTRY.SHOW_MGR.currentlyPlaying !== undefined){
            log('stage',CONFIG.STAGE_ID,METHOD_NAME,"playing/resuming",REGISTRY.SHOW_MGR.currentlyPlaying)
             REGISTRY.SHOW_MGR.play()
          }
        }
      }else{
        log('stage',CONFIG.STAGE_ID,METHOD_NAME,"input not captured, cannot play yet")
      } 
    } else { 
      log('stage',CONFIG.STAGE_ID,METHOD_NAME,"stopping show")
      CONFIG.CAN_PLAY_VIDEO = false 
      //LET IT PAUSE MAIN SHOW??? all queues will get screwed up
      if(REGISTRY.SHOW_MGR !== undefined) REGISTRY.SHOW_MGR.pause()
    } 
  }

  REGISTRY.SHOW_MGR.addPlayVideoListeners( (event:showMgmt.PlayShowEvent)=>{
    logger.debug("SHOW_MGR.addPlayVideoListeners"," fired",event) 
    
    //hideBoard() //letting server handle board show/hide
      
    /*
    LETTING server handle it
    if(event.showData.id == -1){ 
      //   debugger 
      const showRange = SHOW_MGR.showSchedule.findShowToPlayByDate( new Date() ) 
      logger.info("SHOW_MGR.addPlayVideoListeners", "START COUNTDOWN TO NEXT SHOW",event)
      const showArr=[]
      if(showRange.nextShow && showRange.nextShow.show){
        showArr.push(showRange.nextShow.show)
      } 
      startNextShowCounter(showArr)
    }
    */ 
  
    // main video
    if(event.videoTexture){ 
      currentVideoTexture = event.videoTexture

      REGISTRY.videoMaterial.albedoTexture = event.videoTexture
      //videoMat.alphaTexture  = event.videoTexture 
      REGISTRY.videoMaterial.emissiveTexture = event.videoTexture
    }

    setArtistName(event.showData.artist)
  } )

  REGISTRY.SHOW_MGR.addVideoStatusChangeListener( new showMgmt.VideoChangeStatusListener((oldStatus: VideoStatus, newStatus: VideoStatus)=>{
    logger.debug("SHOW_MGR.addVideoStatusChangeListener"," fired",oldStatus,newStatus)
    
    //videoTime.value = newStatus.toString()

    switch(newStatus){
      case VideoStatus.LOADING:

      break;
    }

  } ))



  //example of how to extend the action by setting processExt callback
  const stopHandler:showMgmt.ShowStopAllActionHandler 
    = REGISTRY.SHOW_MGR.actionMgr.getRegisteredHandler<showMgmt.ShowStopAllActionHandler>(showMgmt.ShowStopAllActionHandler.DEFAULT_NAME)

  stopHandler.addOnProcessListener( (action: showMgmt.ActionParams<string>, showActionMgr: showMgmt.ShowActionManager): boolean => {
    const METHOD_NAME = "stopHandler.addOnProcessListener" 
    logger.debug(METHOD_NAME,"called",action)
    stopHandler.logger.debug(METHOD_NAME,"called",action)

    //stop actions goes here
    //some actions "stop" is a play or hide or show or stop

    return true
  })


  //STARTING RUN OF SHOW
  
  if(CONFIG.LOCAL_VIDEO_SHOW_SCHEDULER_ENABLED){
    engine.addSystem(REGISTRY.RUN_OF_SHOW_SYSTEM)
  }else{
    log("serverHandler.ts","CONFIG.LOCAL_VIDEO_SHOW_SCHEDULER_ENABLED set to ",CONFIG.LOCAL_VIDEO_SHOW_SCHEDULER_ENABLED,"local run of show config is disabled!")
  }
    


  SHOW_MGR.actionMgr.registerHandler( new  ShowAirdopActionHandler() ) 
}
