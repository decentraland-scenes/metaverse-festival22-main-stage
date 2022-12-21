import { isPreviewMode } from '@decentraland/EnvironmentAPI'
import { DispenserPos } from "./claiming-dropin/claiming/claimTypes"
import { STAGE_IDS } from "./stageIds"

const ParcelCountX:number = 12
const ParcelCountZ:number = 8

const DEFAULT_ENV = "local" //set to local to use local values


const FORCE_PREVIEW_VAL: Record<string, boolean> = {
  local: true,//for local testing if u need different value
  stg: true,//DEV/preview
  prd: false,//PROD/live use this for launch
};
const FAKE_LOCALLY_VAL: Record<string, boolean> = {
  local: true,//for local testing if u need different value
  stg: false,//DEV/preview
  prd: false,//PROD/live use this for launch
};

const DEBUG_CLAIMING_FLAGS_VAL: Record<string, boolean> = {
  local: false,//for local testing if u need different value
  stg: false,//DEV/preview
  prd: false,//PROD/live use this for launch
};


const DEBUG_VIDEO_PANEL_FLAGS_VAL: Record<string, boolean> = {
  local: true,//for local testing if u need different value
  stg: true,//DEV/preview
  prd: false,//PROD/live use this for launch
}; 


const REMOTE_VIDEO_CONFIG: Record<string, string> = {
    "local": "PROVIDE CONFIG JSON HERE",//for local testing if u need different value
    "stg": "PROVIDE CONFIG JSON HERE",//DEV/preview
    "prd": "PROVIDE CONFIG JSON HERE",//PROD/live use this for launch
};

const ENABLED_DETECT_SCENE_ACTIVE_UTIL = true 
export class Config{
  sizeX!:number
  sizeY!:number
  sizeZ!:number

  IN_PREVIEW = false//IN_PREVIEW set dynamically below in initConfig=>isPreviewMode 
  FORCE_PREVIEW_ENABLED = FORCE_PREVIEW_VAL[DEFAULT_ENV] //will override IN_PREVIEW
  FAKING_LOCALLY = FAKE_LOCALLY_VAL[DEFAULT_ENV]
  FAKING_LOCALLY_SHOW_ID = 24 //configure local shows here ./src/modules/showMgmt/scheduleSetup.ts#L49
  FAKING_LOCALLY_LATENCY = 1//in seconds test lag to account for show starting X late due to player connection
  

  LOCAL_VIDEO_SHOW_SCHEDULER_ENABLED = false //if true, will activate https://github.com/decentraland/show-management#run-your-show
  VIDEO_DATE_TESTING_ENABLED = false
  LOCAL_VIDEO_SHOW_SCHEDULER_INTEVAL = 1//how often it checks if show should start in seconds

  REMOTE_VIDEO_CONFIG_ENABLED = true // if set to false, none of the remove video code will run
  REMOTE_VIDEO_CONFIG = "##set-in-init()"
  STAGE_ID:STAGE_IDS = STAGE_IDS.MAIN_STAGE
  STAGE_CLAIMING_ID:STAGE_IDS = STAGE_IDS.MAIN_STAGE

  SHOW_COUNTER_DELAY = 1//1000 * 60 * 2.5
  center!:Vector3
  centerGround!:Vector3
  
  initAlready:boolean = false 

  //if trigger is visibile
  DEBUG_ACTIVE_SCENE_TRIGGER_ENABLED=false //show debug trigger shape for active area
  DEBUG_3D_PANEL_ENABLED=DEBUG_VIDEO_PANEL_FLAGS_VAL[DEFAULT_ENV] 
  DEBUG_2D_PANEL_ENABLED=DEBUG_VIDEO_PANEL_FLAGS_VAL[DEFAULT_ENV]
  DEBUG_3D_PANEL_POSITION=new Vector3(8, 7.7+2, 8)
 
  //
  ENABLED_DETECT_SCENE_ACTIVE_UTIL = ENABLED_DETECT_SCENE_ACTIVE_UTIL
  //detect if video is allowed to be played
  CAN_PLAY_VIDEO = !ENABLED_DETECT_SCENE_ACTIVE_UTIL


  ///dropzone area
  DROPZONE_HELPER_VISIBLE = false //enable to see drop zone
  DROPZONE_POSITION = new Vector3(96,10,79)
  DROPZONE_DROP_HEIGHT = 60 //height from which it is dropped
  DROPZONE_SIZE = new Vector3(30,20,30)


  //START claiming/dispensers
  CLAIM_TESTING_ENABLED = DEBUG_CLAIMING_FLAGS_VAL[DEFAULT_ENV]
  CLAIM_DO_HAS_WEARABLE_CHECK = false
  CLAIM_DATE_TESTING_ENABLED = DEBUG_CLAIMING_FLAGS_VAL[DEFAULT_ENV]
  DISPENSER_POSITIONS:DispenserPos[] = [] 
  //END claiming/dispensers
 
  init(){
    if(this.initAlready) return;

    log('stage',CONFIG.STAGE_ID,"initConfig() running with " + DEFAULT_ENV)
      
    this.sizeX = ParcelCountX*16
    this.sizeZ = ParcelCountZ*16 
    this.sizeY = (Math.log((ParcelCountX*ParcelCountZ) + 1) * Math.LOG2E) * 20// log2(n+1) x 20 //Math.log2( ParcelScale + 1 ) * 20
    this.center = new Vector3(this.sizeX/2,this.sizeY/2,this.sizeZ/2)
    this.centerGround = new Vector3(this.sizeX/2,0,this.sizeZ/2)

    this.REMOTE_VIDEO_CONFIG = REMOTE_VIDEO_CONFIG[DEFAULT_ENV]

    this.initAlready = true

  }
}

export const CONFIG = new Config()

export function initConfig(){
  log('stage',CONFIG.STAGE_ID,"initConfig() with " + DEFAULT_ENV)
  CONFIG.init()

  isPreviewMode().then( (val:boolean) =>{
    log("IN_PREVIEW",CONFIG.IN_PREVIEW,val)
    CONFIG.IN_PREVIEW = val || CONFIG.FORCE_PREVIEW_ENABLED
  })
  return CONFIG
}
