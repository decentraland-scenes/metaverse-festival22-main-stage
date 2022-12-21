  import { REGISTRY } from 'src/festival-mgmt-dropin/registry'
import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import { getShowTypeFromLocalBySubtitleId, showData } from "./scheduleSetup"
import * as showMgmt from 'src/festival-mgmt-dropin/show-management/index'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'
import { CONFIG } from 'src/config'
import { ActionMaterialSetupType, ShowMaterialActionHandler } from './ShowMaterialActionHandler'
import { actionRandomizer, ActionRandomizerSystem } from 'src/festival-mgmt-dropin/modules/actionRandomizer' 
import { videoMatGlow, videoMatUmbrella } from '../effects/videoMaterialsCustom' 
import {
  main_stage_lights_top,
  main_stage_lights_bottom,
  main_stage_tower,
  main_stage_lights_fire,
  dragon,
  vladimirSign,
  stickmenSign,
  erikakrallSign,
  handshakingSign,
  brelandSign,
  spottieSign,
  amadisSign,
  maijaSign,
  akiraSign,
  soziSign,
  pip2amSign,
  atarashiSign,
  bjorkSign,
  losersSign,
  liangoldSign,
  snh48Sign,
  chillpillSign,
  main_stage_buddha 
} from 'showEntities'
import { 
  rainControl, 
  kickDrumControl,
  spinnerControl,
  totemLightControl,
  topScreenControl,
  flatLightControl,
  mushControl,
  grassControl,
  vladimirControl
 } from '../effects/effectControl'
import { dropCrate } from 'src/festival-mgmt-dropin/airdrops/crate'
import { ShowType } from 'src/festival-mgmt-dropin/show-management/index'
import { updateDancing } from '../createDanceAreas'
import { KickDrumController } from '../effects/kickdrums'


export function initShowSetup(){
  //add to registry so show manager can manage it and it can be shared around scene
 // REGISTRY.SHOW_MGR=SHOW_MGR
}


export function loadSceneShowSetup(){


//creating a logger for this file
const logger:showMgmt.Logger = showMgmt.LoggerFactory.getLogger("MyScene.ShowSetup.ts")
//set logger for a specific logger
logger.setLevel(showMgmt.LogLevel.DEBUG)

//will set default logging level for all loggers
showMgmt.LoggingConfiguration.getInstance().defaultLevel = showMgmt.LogLevel.DEBUG

//set logger for a specific action handler logger
const logHandlerAnimation = showMgmt.LoggerFactory.getLogger("ShowActionHandler."+showMgmt.ShowAnimationActionHandler.DEFAULT_NAME)
if(logHandlerAnimation) logHandlerAnimation.setLevel(showMgmt.LogLevel.TRACE)

const SHOW_MGR = REGISTRY.SHOW_MGR
SHOW_MGR.showSchedule.setData( showData )


//STARTING REGISTERING HANDLERS

//example of how to extend the action by setting processExt callback
const pauseHandler:showMgmt.ShowPauseAllActionHandler 
  = SHOW_MGR.actionMgr.getRegisteredHandler<showMgmt.ShowPauseAllActionHandler>(showMgmt.ShowPauseAllActionHandler.DEFAULT_NAME)

pauseHandler.addOnProcessListener( (action: showMgmt.ActionParams<string>, showActionMgr: showMgmt.ShowActionManager): boolean => {
  const METHOD_NAME = "addOnProcessListener"
  pauseHandler.logger.debug(METHOD_NAME,"called",action)

  //pause actions goes here
  //some actions "stop" is a play or hide or show or stop

  return true
})
 
//example of how to extend the action by setting processExt callback
const stopHandler:showMgmt.ShowStopAllActionHandler 
  = SHOW_MGR.actionMgr.getRegisteredHandler<showMgmt.ShowStopAllActionHandler>(showMgmt.ShowStopAllActionHandler.DEFAULT_NAME)

stopHandler.addOnProcessListener( (action: showMgmt.ActionParams<string>, showActionMgr: showMgmt.ShowActionManager): boolean => {
  const METHOD_NAME = "stopHandler.addOnProcessListener" 
  logger.debug(METHOD_NAME,"called",action)
  stopHandler.logger.debug(METHOD_NAME,"called",action)

  //stop actions goes here
  //some actions "stop" is a play or hide or show or stop

  return true
})

//EXAMPLE OF LISTENING FOR VIDEO PLAY TO UPDATE MATERIALS
REGISTRY.SHOW_MGR.addPlayVideoListeners( (event:showMgmt.PlayShowEvent)=>{
  const METHOD_NAME = "SHOW_MGR.addPlayVideoListeners"
  logger.debug(METHOD_NAME," fired",event) 
  
  // main video

  //REGISTRY.SHOW_MGR.currentlyPlaying.subtitleId == "someid"
  //if( event.showData.subtitleId  === "someid" ){

    
  //if null remove, check local config as remote server does not know about parachutes (yet...)
  let parachuteShowData:ShowType = event.showData
  if(event.showData !== undefined && event.showData.parchutes===undefined){
    const localShowData = getShowTypeFromLocalBySubtitleId(event.showData.subtitleId)
    if(localShowData !== undefined){
      logger.debug(METHOD_NAME," event.showData.parchutes remote data was null so using local data instead",parachuteShowData,parachuteShowData) 
      parachuteShowData = localShowData
    }
  }
  
  
  if(parachuteShowData !== undefined && parachuteShowData.parchutes !== undefined && parachuteShowData.parchutes.triggerOnShowStart){
    logger.debug(METHOD_NAME," event.showData.parchutes crate.drop ENABLED triggering on play of show",parachuteShowData,parachuteShowData) 
    const randomDelayMax:number|undefined = undefined//undefined , in seconds
    dropCrate( parachuteShowData.parchutes.default,"","",randomDelayMax )
    dropCrate( parachuteShowData.parchutes.sponsor,"","",randomDelayMax )
  }else{
    logger.debug(METHOD_NAME," event.showData.parchutes crate.drop NOT enabled for show",parachuteShowData,parachuteShowData) 
  } 
  //}
  if(event.videoTexture ){ 

    videoMatGlow.albedoTexture = event.videoTexture
    videoMatGlow.emissiveTexture = event.videoTexture
    videoMatGlow.alphaTexture = event.videoTexture 

    videoMatUmbrella.albedoTexture  = event.videoTexture
    videoMatUmbrella.emissiveTexture  = event.videoTexture
  }

} )

REGISTRY.SHOW_MGR.addStopShowListeners( (event:showMgmt.StopShowEvent)=>{
  //stop dancing here

  log('stop dancing', event)
  updateDancing(false)
})
REGISTRY.SHOW_MGR.addPlayVideoListeners( (event:showMgmt.PlayShowEvent)=>{
  //start dancing here
  //BUT DETECT IF its itermission or not, maybe use this logic

  log("playing video auto dance", event)
 // if(event.showData.id >= 0 && event.showData.id < 500){//intermission gets -1
    updateDancing(true)
// }
})

//define custom parameter object type
type ActionTypeDuration={  
  duration?:number
}
//action will be used as follows
//RAIN {"duration":"1"}
REGISTRY.SHOW_MGR.actionMgr.registerHandler(
  new  showMgmt.ShowActionHandlerSupport<ActionTypeDuration>( 
    "RAIN",
    {
      matches(action: string,showActionMgr:showMgmt.ShowActionManager):boolean{ 
        return showMgmt.actionStartsWith(action,"RAIN",0," ")
      },

      process(action: showMgmt.ActionParams<ActionTypeDuration>, showActionMgr: showMgmt.ShowActionManager): boolean {
        const duration = action.params.duration ? action.params.duration : 60        
        rainControl.startRain(duration) 

        return true
      }
    } )
)

//define custom parameter object type
type ActionTypeSpeed={  
  speed?:number
}
//action will be used as follows 
//SPINNER {"speed":100}
REGISTRY.SHOW_MGR.actionMgr.registerHandler(
  new  showMgmt.ShowActionHandlerSupport<ActionTypeSpeed>( 
    "SPINNER",
    {
      matches(action: string,showActionMgr:showMgmt.ShowActionManager):boolean{ 
        return showMgmt.actionStartsWith(action,"SPINNER",0," ")
      },
      process(action: showMgmt.ActionParams<ActionTypeSpeed>, showActionMgr: showMgmt.ShowActionManager): boolean {
        const speed = action.params.speed ? action.params.speed : 400         
        spinnerControl.start(speed) 

        return true
      }
    } )
)

//action will be used as follows 
//TOP_SCREEN_ROTATE {"speed":20}
REGISTRY.SHOW_MGR.actionMgr.registerHandler(
  new  showMgmt.ShowActionHandlerSupport<ActionTypeSpeed>( 
    "TOP_SCREEN_ROTATE",
    {
      matches(action: string,showActionMgr:showMgmt.ShowActionManager):boolean{ 
        return showMgmt.actionStartsWith(action,"TOP_SCREEN_ROTATE",0," ")
      },
      process(action: showMgmt.ActionParams<ActionTypeSpeed>, showActionMgr: showMgmt.ShowActionManager): boolean {
        const speed = action.params.speed ? action.params.speed : 400         
        topScreenControl.rotate(speed) 

        return true
      }
    } )
)

//register a custom action handler to do things
const materialHandler = new  ShowMaterialActionHandler()
SHOW_MGR.actionMgr.registerHandler( materialHandler ) 
//further exetend listerns to the material handler
//this lets you regstier multiple things to the process command should you choose
materialHandler.addOnProcessListener( (action: showMgmt.ActionParams<ActionMaterialSetupType>, showActionMgr: showMgmt.ShowActionManager): boolean => {
  const METHOD_NAME = "materialHandler.addOnProcessListener" 
  logger.debug(METHOD_NAME,"called",action)
  materialHandler.logger.debug(METHOD_NAME,"called",action)

  
  return true
})


//STARTING EXTEND RUN ACTION

// //EXAMPLE OF OLD SWITCH FOR COMMANDS
// REGISTRY.SHOW_MGR.actionMgr.extRunAction = (action:string)=>{

//   let applied = false
//   switch(action){
//     case 'MATERIAL_SETUP_1':
//       logger.debug("SHOW_MGR.actionMgr.extRunAction","OLD_WAY fired") 
//       applied = true
//     break;
//   }
//   return applied
// }

//REDEFINING WHAT RANDOMIZER CALLS
ActionRandomizerSystem.createAndAddToEngine()
ActionRandomizerSystem._instance.pauseAllActionName = "RANDOMIZER_PAUSE"
ActionRandomizerSystem._instance.stopAllActionName = "RANDOMIZER_STOP"


REGISTRY.SHOW_MGR.actionMgr.extRunAction = (action:string)=>{
  log("REGISTRY.SHOW_MGR.actionMgr.extRunAction",action)
  let applied = false
  switch(action){
    // case 'MATERIAL_SETUP_1':
    //   logger.debug("SHOW_MGR.actionMgr.extRunAction","OLD_WAY fired") 
    //   applied = true
    // break;
    
    case 'STOP_ALL':
      REGISTRY.SHOW_MGR.runAction('PAUSE_ALL')
      REGISTRY.SHOW_MGR.runAction('SIGN_OFF')
      rainControl.stop()
      mushControl.stop() 
        
      // if (RandomizerSystem._instance) {
      //   RandomizerSystem._instance.active = false
      // }
      // if (laser_beam.getComponent(GLTFShape).visible) {
      //   runAction('LB_Hide')
      // }
      // if (hand_icon.getComponent(GLTFShape).visible) {
      //   runAction('Hands_Hide')
      // }
      break;
    case 'PAUSE_ALL':
      main_stage_lights_top.playAnimation('Top_Lights_Off_Neutral')
      main_stage_lights_bottom.playAnimation('Bottom_Lights_Off_Neutral')
      main_stage_tower.playAnimation('Tower_Lights_Off_Neutral')
      main_stage_lights_fire.playAnimation('Fire_Lights_Neutral_Off')
      //dragon.hide()
      spinnerControl.stop()
      kickDrumControl.stopAll()
      kickDrumControl.stopPump()
      //mushControl.stop()
      totemLightControl.stop()   
      flatLightControl.stop()
      grassControl.stop()
      topScreenControl.stopRotation()  
      // if (laser_beam.getComponent(GLTFShape).visible) {
      //   lights_center.stopAllAnimations()
      //   // laser_beam.playAnimation('LB_Neutral', false, 0, BPM / 120)
      // }
      // firework_04.hide()
      break;
    
      // case 'PAUSEALL':
      //   main_stage_lights_top.playAnimation('Top_Lights_Off_Neutral')
      //   main_stage_lights_bottom.playAnimation('Bottom_Lights_Off_Neutral')
      //   main_stage_tower.playAnimation('Tower_Lights_Off_Neutral')
      //   main_stage_lights_fire.playAnimation('Fire_Lights_Neutral_Off')
      //   spinnerControl.stop()
      //   kickDrumControl.stopAll()
      //   kickDrumControl.stopPump()
      //   totemLightControl.stop()   
      //   flatLightControl.stop()
      //   topScreenControl.stopRotation()  

      //   break;
      case 'RANDOMIZER_PAUSE':
        //pause stuff randomizer cares about here
        break;
      case 'RANDOMIZER_STOP':
        //stop stuff randomizer cares about here
          break;
          
      // MUSHROOM UMBRELLAS
      case 'UMBRELLAS_ON':
        mushControl.enable().then(()=>{
          mushControl.start()
        })       
      break;
      case 'UMBRELLAS_OFF':
        mushControl.stop()        
      break;

      case 'RAIN_OFF':
        rainControl.stop()        
      break;

      // KICKDRUM LIGHTS ( 3 left , 3 right)
      case 'KICKDRUM_ALWAYS_ON':
        kickDrumControl.startAll()        
      break;
      case 'KICKDRUM_PUMP':
        kickDrumControl.pump(SHOW_MGR.actionMgr.bpm)        
      break;
      case 'KICKDRUM_OFF':
        kickDrumControl.stopAll() 
        kickDrumControl.stopPump()       
      break;
      case 'KICKDRUM_RED':
        kickDrumControl.setColor(Color3.FromHexString("#ff0000"))    
      break;

      //SPINNER LIGHT TRAILS
      case 'SPINNER_OFF':
        spinnerControl.stop()        
      break;

      //TOTEM TOWER LIGHTS
      case 'TOTEM_LIGHTS_ALWAYS_ON':
        totemLightControl.startAlwaysOn()        
      break;
      case 'TOTEM_LIGHTS_FLASH':
        totemLightControl.start()        
      break;
      case 'TOTEM_LIGHTS_OFF':
        totemLightControl.stop()        
      break;

      //BOX LIGHTS (FLATLIGHTS)
      case 'BOX_LIGHTS_ON':
        flatLightControl.startAlwaysOn(true)        
      break;     
      case 'BOX_LIGHTS_WAVE':
        flatLightControl.startAlwaysOn(true)        
      break;  
      case 'BOX_LIGHTS_WAVE_STOP':
        flatLightControl.startAlwaysOn(false)        
      break; 
      case 'BOX_LIGHTS_FIXED_DOWN':
        flatLightControl.startFixedDown()        
      break;
      case 'BOX_LIGHTS_FIXED_UP':
        flatLightControl.startFixedUp()        
      break;
      case 'BOX_LIGHTS_OFF':
        flatLightControl.stop()        
      break;

      //TOP SCREEN WINGS ROTATION
      case 'TOP_SCREEN_STOP':
        topScreenControl.stopRotation()        
      break;
     
      //GRASS WAVE
      case 'GRASS_ON':
        grassControl.start()        
      break;        
      case 'GRASS_OFF':
        grassControl.stop()        
      break;

      // VLADIMIR 3D AVATAR APPEARANCE
      case 'VLADIMIR_AVATAR_ON':

      vladimirControl.start()
        //vladimir.appear()
        //vladimir.playAnimation("Animation")     
      break;
      case 'VLADIMIR_AVATAR_OFF':
        vladimirControl.stop()         
      break;

      case 'LTOP_ON':
        main_stage_lights_top.playAnimation('Top_Lights_On', true, 1990)
        utils.setTimeout(1990, () => {
          main_stage_lights_top.playAnimation('Top_Lights_01', false)
        })
      break;

      case 'LTOP_OFF':
        main_stage_lights_top.playAnimation('Top_Lights_Off', true, 1990)
        utils.setTimeout(1990, () => {
          main_stage_lights_top.playAnimation('Top_Lights_Off_Neutral', false)
        })
      break;

      case 'LTOP_01':main_stage_lights_top.playAnimation('Top_Lights_01', false, 0)
      break;
      case 'LTOP_02':main_stage_lights_top.playAnimation('Top_Lights_02', false, 0)
      break;
      case 'LTOP_03':main_stage_lights_top.playAnimation('Top_Lights_03', false, 0)
      break;
      case 'LTOP_04':main_stage_lights_top.playAnimation('Top_Lights_04', false, 0)
      break;
      case 'LTOP_05':main_stage_lights_top.playAnimation('Top_Lights_05', false, 0)
      break;
      case 'LTOP_06':main_stage_lights_top.playAnimation('Top_Lights_06', false, 0)
      break;

      case 'LBOT_ON':
        main_stage_lights_bottom.playAnimation('Bottom_Lights_On', true, 1990)
        utils.setTimeout(1990, () => {
          main_stage_lights_bottom.playAnimation('Bottom_Lights_01', false)
        })
      break;
      case 'LBOT_OFF':
        main_stage_lights_bottom.playAnimation('Bottom_Lights_Off', true, 1990)
        utils.setTimeout(1990, () => {
          main_stage_lights_bottom.playAnimation('Bottom_Lights_Off_Neutral', false)
        })
      break;
      case 'LBOT_01':main_stage_lights_bottom.playAnimation('Bottom_Lights_01', false)
      break;
      case 'LBOT_02':main_stage_lights_bottom.playAnimation('Bottom_Lights_02', false)
      break;
      case 'LBOT_03':main_stage_lights_bottom.playAnimation('Bottom_Lights_03', false)
      break;
      case 'LBOT_04':main_stage_lights_bottom.playAnimation('Bottom_Lights_04', false)
      break;
      case 'LBOT_05':main_stage_lights_bottom.playAnimation('Bottom_Lights_05', false)
      break;
      case 'LBOT_06':main_stage_lights_bottom.playAnimation('Bottom_Lights_06', false)
      break;



      case 'TOWER_ON':
        main_stage_tower.playAnimation('Tower_Lights_On', true, 1990)
        utils.setTimeout(1990, () => {
          main_stage_tower.playAnimation('Tower_Lights_01', false)
        })
      break;
      case 'TOWER_OFF':
        main_stage_tower.playAnimation('Tower_Lights_Off_Neutral', true, 0)
      break;
      case 'TOWER_01':main_stage_tower.playAnimation('Tower_Lights_01', false, 0)
      break;
      case 'TOWER_02':main_stage_tower.playAnimation('Tower_Lights_02', false, 0)
      break;
      case 'TOWER_03':main_stage_tower.playAnimation('Tower_Lights_03', false, 0)
      break;
      case 'TOWER_04':main_stage_tower.playAnimation('Tower_Lights_04', false, 0)
      break;
      case 'TOWER_05':main_stage_tower.playAnimation('Tower_Lights_05', false, 0)
      break;
      case 'TOWER_06':main_stage_tower.playAnimation('Tower_Lights_06', false, 0)
      break;


      case 'FIRE_OFF':
        main_stage_lights_fire.playAnimation('Fire_Lights_Neutral_Off', false, 0)
      break;
      case 'FIRE_01':main_stage_lights_fire.playAnimation('Fire_Lights_01', false, 0)
      break;
      case 'FIRE_02':main_stage_lights_fire.playAnimation('Fire_Lights_02', false, 0)
      break;
      case 'FIRE_03':main_stage_lights_fire.playAnimation('Fire_Lights_03', false, 0)
      break;

      case 'LTOP_RDM':
        actionRandomizer(
          [`LTOP_01`, `LTOP_02`, `LTOP_03`, `LTOP_04`, `LTOP_05`, `LTOP_06`],//action list
          1 //beats
        )
        applied = true
      break;
      case 'LBOT_RDM':
        actionRandomizer(
          [`LBOT_01`, `LBOT_02`, `LBOT_03`, `LBOT_04`, `LBOT_05`, `LBOT_06`],//action list
          1 //beats
        )
        applied = true
      break;
      case 'TOWER_RDM':
        actionRandomizer(
          [`TOWER_01`, `TOWER_02`, `TOWER_03`, `TOWER_04`, `TOWER_05`, `TOWER_06`],//action list
          1 //beats
        )
        applied = true
      break;
      case 'FIRE_RDM':
        actionRandomizer(
          [`FIRE_01`, `FIRE_02`, `FIRE_03`],//action list
          1 //beats
        )
        applied = true
      break;
      case 'ENV_RDM':
        actionRandomizer(
          [`LTOP_RDM`],//action list
          1 //beats
        )
        actionRandomizer(
          [`LBOT_RDM`],//action list
          1 //beats
        )
        actionRandomizer(
          [ `TOWER_RDM`],//action list
          1 //beats
        )
        actionRandomizer(
          [`FIRE_RDM`],//action list
          1 //beats
        )

        applied = true
      break;
      case 'SIGN_VLADIMIR':
        vladimirSign.appear()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_STICKMEN':
        vladimirSign.hide()
        stickmenSign.appear()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_ERIKAKRALL':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.appear()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_HANDSHAKING':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.appear()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_BRELAND':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.appear()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_SPOTTIE':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.appear()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_AMADIS':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.appear()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_MAIJA':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.appear()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_AKIRA':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.appear()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_SOZI':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.appear()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_PIP2AM':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.appear()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_ATARASHI':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.appear()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
      break;
      case 'SIGN_BJORK':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.appear()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
        chillpillSign.hide()
      break;
      case 'SIGN_LOSERS':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.appear()
        liangoldSign.hide()
        snh48Sign.hide()
        chillpillSign.hide()
      break;
      case 'SIGN_LIANGOLD':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.appear()
        snh48Sign.hide()
        chillpillSign.hide()
      break;
      case 'SIGN_SNH48':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.appear()
      break;
      case 'SIGN_OFF':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
        chillpillSign.hide()
      break;
      case 'SIGN_CHILLPILL':
        vladimirSign.hide()
        stickmenSign.hide()
        erikakrallSign.hide()
        handshakingSign.hide()
        brelandSign.hide()
        spottieSign.hide()
        amadisSign.hide()
        maijaSign.hide()
        akiraSign.hide()
        soziSign.hide()
        pip2amSign.hide()
        atarashiSign.hide()
        bjorkSign.hide()
        losersSign.hide()
        liangoldSign.hide()
        snh48Sign.hide()
        chillpillSign.appear()
      break;      


     	break;

	  // BUDDHA	
	  case 'Goggles_Idle':
		BuddhaAnimation(buddhaState.goggles, 
			() => {main_stage_buddha.playAnimation('Buddha_Idle_Goggles_On', false, 0)}
				)
		break 
	  case 'Goggles_Beam1':
		BuddhaAnimation(buddhaState.goggles, 
			() => {main_stage_buddha.playAnimation('Buddha_Goggles_Beam_01', false, 0)}
			 )
		 break 
		case 'Goggles_Beam2':
			BuddhaAnimation(buddhaState.goggles, 
				() => {main_stage_buddha.playAnimation('Buddha_Goggles_Beam_01', false, 0)}
				 )
			break 
		case 'Neutral_Idle':
			BuddhaAnimation(buddhaState.neutral, 
				() => {main_stage_buddha.playAnimation('Buddha_Idle_Goggles_Off_Eyes_Green', false, 0)}
					)
			break 
		case 'Neutral_Beam1':
			BuddhaAnimation(buddhaState.neutral, 
				() => {main_stage_buddha.playAnimation('Buddha_Eyes_Green_Beam_01', false, 0)}
				 )
			break
		case 'Neutral_Beam2':
			BuddhaAnimation(buddhaState.neutral, 
				() => {main_stage_buddha.playAnimation('Buddha_Eyes_Green_Beam_02', false, 0)}
					)
			break 	
		case 'Orange_Idle':
			BuddhaAnimation(buddhaState.orange, 
				() => {main_stage_buddha.playAnimation('Buddha_Idle_Goggles_Off_Eyes_Orange', false, 0)}
					)
			break  	
		case 'Orange_Beam1':
			BuddhaAnimation(buddhaState.orange, 
				() => {main_stage_buddha.playAnimation('Buddha_Eyes_Orange_Beam_01', false, 0)}
					)
			break
		case 'Orange_Beam2':
			BuddhaAnimation(buddhaState.orange, 
				() => {main_stage_buddha.playAnimation('Buddha_Eyes_Orange_Beam_02', false, 0)}
					)
			break 	
		case 'Pink_Idle':
			BuddhaAnimation(buddhaState.pink, 
				() => {main_stage_buddha.playAnimation('Buddha_Idle_Goggles_Off_Eyes_Pink', false, 0)}
					)
			break 
		case 'Pink_Beam1':
			BuddhaAnimation(buddhaState.pink, 
				() => {main_stage_buddha.playAnimation('Buddha_Eyes_Pink_Beam_01', false, 0)}
					)
			break
		case 'Pink_Beam2':
			BuddhaAnimation(buddhaState.pink, 
				() => {main_stage_buddha.playAnimation('Buddha_Eyes_Pink_Beam_02', false, 0)}
					)
			break 
		case 'Pink_Mouth':
			BuddhaAnimation(buddhaState.pink, 
				() => {
					main_stage_buddha.playAnimation('Buddha_Mouth_Goggles_Off_Eyes_Pink', true, 4000)
					utils.setTimeout(4000, () => {
						budhaBackToIdle()
						})
				})
			break 	
		case 'Orange_Mouth':
			BuddhaAnimation(buddhaState.orange, 
				() => {
					main_stage_buddha.playAnimation('Buddha_Mouth_Goggles_Off_Eyes_Orange', true, 4000)
					utils.setTimeout(4000, () => {
						budhaBackToIdle()
						})
				})
			break 	
		case 'Neutral_Mouth':
			BuddhaAnimation(buddhaState.neutral, 
				() => {
					main_stage_buddha.playAnimation('Buddha_Mouth_Goggles_Off_Eyes_Green', true, 4000)
					utils.setTimeout(4000, () => {
						budhaBackToIdle()
						})
				})
			break 	
		case 'Goggles_Mouth':
			BuddhaAnimation(buddhaState.goggles, 
				() => {
					main_stage_buddha.playAnimation('Buddha_Mouth_Goggles_On', true, 4000)
					utils.setTimeout(4000, () => {
						budhaBackToIdle()
						})
				})
			break 	
      // case 'BUD_ON':
      //   main_stage_tower.playAnimation('Tower_Lights_On', true, 0)
      //   utils.setTimeout(1990, () => {
      //     main_stage_tower.playAnimation('Tower_Lights_01', false, 0)
      //   })
      // break;

  }
  return applied
}

//STARTING DEBUGGER

isPreviewMode().then(preview=>{
  const enableFlag = preview || CONFIG.FORCE_PREVIEW_ENABLED
  if(enableFlag) {
    SHOW_MGR.enableDebugUI(enableFlag)
    showMgmt.registerWithDebugUI( SHOW_MGR.manageShowDebugUI,SHOW_MGR, undefined  ) 
  }
})   

}//END loadSceneShowSetup


enum buddhaState  {
	'neutral',
	'goggles',
	'orange',
	'pink'
}

let currentBuddhaState: buddhaState = buddhaState.neutral


function BuddhaAnimation(newState: buddhaState, callback: ()=> void ){

	let transitionDelay: number


	if(currentBuddhaState !== newState ){

		// run transition animation
		if(currentBuddhaState === buddhaState.neutral
			&& newState === buddhaState.goggles
			){
			main_stage_buddha.playAnimation('Buddha_Goggles_On', true, 4000)
			transitionDelay = 4000
		} else if(currentBuddhaState === buddhaState.goggles
			&& newState === buddhaState.neutral) {
			main_stage_buddha.playAnimation('Buddha_Goggles_Off', true, 4000)
			transitionDelay = 4000
		}  else if(currentBuddhaState === buddhaState.neutral
			&& newState === buddhaState.orange) {
			main_stage_buddha.playAnimation('Buddha_Eyes_Green_To_Orange', true, 1500)
			transitionDelay = 1500
		}  else if(currentBuddhaState === buddhaState.orange
			&& newState === buddhaState.neutral) {
			main_stage_buddha.playAnimation('Buddha_Eyes_Orange_To_Green', true, 1500)
			transitionDelay = 1500
		}  else if(currentBuddhaState === buddhaState.neutral
			&& newState === buddhaState.pink) {
			main_stage_buddha.playAnimation('Buddha_Eyes_Green_To_Pink', true, 1500)
			transitionDelay = 1500
		}  else if(currentBuddhaState === buddhaState.pink
			&& newState === buddhaState.neutral) {
			main_stage_buddha.playAnimation('Buddha_Eyes_Pink_To_Green', true, 1500)
			transitionDelay = 1500
		}

		// run the actual animation you wanted
		utils.setTimeout(transitionDelay, () => {
			currentBuddhaState = newState
			callback()	
		})
		

	} else {
		callback()
	}

}

function budhaBackToIdle(){

	switch(currentBuddhaState){
		case buddhaState.neutral:
			main_stage_buddha.playAnimation('Buddha_Idle_Goggles_Off_Eyes_Green', false)
			break
		case buddhaState.goggles:
			main_stage_buddha.playAnimation('Buddha_Idle_Goggles_On', false)
			break 
		case buddhaState.orange:
			main_stage_buddha.playAnimation('Buddha_Idle_Goggles_Off_Eyes_Orange', false)
			break
		case buddhaState.pink:
			main_stage_buddha.playAnimation('Buddha_Idle_Goggles_Off_Eyes_Pink', false)
			break	
	}

}
