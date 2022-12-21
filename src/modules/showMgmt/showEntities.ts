import { REGISTRY } from 'src/festival-mgmt-dropin/registry'
import * as showMgmt from 'src/festival-mgmt-dropin/show-management/index'
//import { SHOW_MGR } from './showSetup'


//START ADDING syncable objects

// Lights TOP
export const main_stage_lights_top = new showMgmt.ShowEntityModel( 
  "main_stage_lights_top",
  new GLTFShape('models/main_stage_lights_top.glb'),
  //new BoxShape(),
  {
    startInvisible: false,
    idleAnim:"Top_Lights_Off_Neutral",
  transform:new Transform( 
    {
      position: new Vector3(192/2, 0, 128/2),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    }
   )}
)

// Lights BOTTOM
export const main_stage_lights_bottom = new showMgmt.ShowEntityModel( 
  "main_stage_lights_bottom",
  new GLTFShape('models/main_stage_lights_bottom.glb'),
  //new BoxShape(),
  {
    startInvisible: false,
    idleAnim:"Bottom_Lights_Off_Neutral",
  transform:new Transform( 
    {
      position: new Vector3(192/2, 0, 128/2),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    }
   )}
)

//Lights_Tower
export const main_stage_tower = new showMgmt.ShowEntityModel( 
  "main_stage_tower",
  new GLTFShape('models/main_stage_tower.glb'),
  //new BoxShape(),
  { 
    startInvisible: false,
    idleAnim:"Tower_Lights_Off_Neutral",
  transform:new Transform( 
    {
      position: new Vector3(192/2, 0, 128/2),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    }
   )}
)

//Fire
export const main_stage_lights_fire = new showMgmt.ShowEntityModel( 
  "main_stage_lights_fire",
  new GLTFShape('models/main_stage_lights_fire.glb'),
  //new BoxShape(),
  {
    startInvisible: false,
    idleAnim:"Fire_Lights_Neutral_Off",
  transform:new Transform( 
    {
      position: new Vector3(192/2, 0, 128/2),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    }
   )}
)

// Buddha
export const main_stage_buddha = new showMgmt.ShowEntityModel( 
  "main_stage_buddha",
  new GLTFShape('models/main_stage_buddha.glb'),
  //new BoxShape(),
  {
    startInvisible: false,
    idleAnim:"Buddha_Idle_Goggles_On",
  transform:new Transform( 
    {
      position: new Vector3(192/2, 0, 128/2),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    }
   )}

)
//Dragon
export const dragon = new showMgmt.ShowEntityModel( 
  "dragon",
  new GLTFShape('models/dragon.glb'),
  //new BoxShape(),
  {
    startInvisible: true,
    idleAnim:"Dragon_Flight",
  transform:new Transform( 
    {
      position: new Vector3(192/2, 0, 128/2),
      rotation: Quaternion.Euler(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    }
   )}
)

// Artist Signs
export const vladimirSign = new showMgmt.ShowEntityModel( "vladimirSign",new GLTFShape('models/artist_names/vladimir.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const stickmenSign = new showMgmt.ShowEntityModel( "stickmenSign",new GLTFShape('models/artist_names/stickmen.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const erikakrallSign = new showMgmt.ShowEntityModel( "erikakrallSign",new GLTFShape('models/artist_names/erikakrall.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const handshakingSign = new showMgmt.ShowEntityModel( "handshakingSign",new GLTFShape('models/artist_names/handshaking.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const brelandSign = new showMgmt.ShowEntityModel( "brelandSign",new GLTFShape('models/artist_names/breland.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const spottieSign = new showMgmt.ShowEntityModel( "spottieSign",new GLTFShape('models/artist_names/spottie.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const amadisSign = new showMgmt.ShowEntityModel( "amadisSign",new GLTFShape('models/artist_names/amadis.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const maijaSign = new showMgmt.ShowEntityModel( "maijaSign",new GLTFShape('models/artist_names/maija.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const akiraSign = new showMgmt.ShowEntityModel( "akiraSign",new GLTFShape('models/artist_names/akira.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const soziSign = new showMgmt.ShowEntityModel( "soziSign",new GLTFShape('models/artist_names/sozi.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const pip2amSign = new showMgmt.ShowEntityModel( "pip2amSign",new GLTFShape('models/artist_names/pip2am.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const atarashiSign = new showMgmt.ShowEntityModel( "atarashiSign",new GLTFShape('models/artist_names/atarashi.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const bjorkSign = new showMgmt.ShowEntityModel( "bjorkSign",new GLTFShape('models/artist_names/bjork.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const losersSign = new showMgmt.ShowEntityModel( "losersSign",new GLTFShape('models/artist_names/losers.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const liangoldSign = new showMgmt.ShowEntityModel( "liangoldSign",new GLTFShape('models/artist_names/liangold.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const snh48Sign = new showMgmt.ShowEntityModel( "snh48Sign",new GLTFShape('models/artist_names/snh48.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})
export const chillpillSign = new showMgmt.ShowEntityModel( "chillpillSign",new GLTFShape('models/artist_names/chillpill.glb'),{ startInvisible: true, transform:new Transform({position: new Vector3(192/2, 0, 128/2),scale: new Vector3(1, 1, 1),} )})






export function registerShowEntities(){

    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("main_stage_lights_top",main_stage_lights_top) 
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("main_stage_lights_bottom",main_stage_lights_bottom) 
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("main_stage_tower",main_stage_tower) 
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("main_stage_lights_fire",main_stage_lights_fire) 
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("main_stage_buddha",main_stage_buddha) 
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("dragon",dragon) 

    //REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("vladimir_avatar",vladimir)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("stickmenSign",stickmenSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("vladimirSign",vladimirSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("erikakrallSign",erikakrallSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("handshakingSign",handshakingSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("brelandSign",brelandSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("spottieSign",spottieSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("amadisSign",amadisSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("maijaSign",maijaSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("akiraSign",akiraSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("soziSign",soziSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("pip2amSign",pip2amSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("atarashiSign",atarashiSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("bjorkSign",bjorkSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("losersSign",losersSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("liangoldSign",liangoldSign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("snh48Sign",snh48Sign)
    REGISTRY.SHOW_MGR.actionMgr.registerShowEntity("chillpillSign",chillpillSign)


    
    
    REGISTRY.SHOW_MGR.actionMgr.getRegisteredHandler(showMgmt.ShowPauseAllActionHandler.DEFAULT_NAME).addOnProcessListener(
    (action: showMgmt.ActionParams<string>,showActionMgr:showMgmt.ShowActionManager)=>{
        //do stuff
        //log("triggered addOnProcessListener") 
    }
    )
}
