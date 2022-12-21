import { REGISTRY } from 'src/festival-mgmt-dropin/registry'
import * as ui from '@dcl/ui-scene-utils'
import { CONFIG } from "src/config"
import { STAGE_IDS } from 'src/stageIds'


let currentShowDebugInfo = new Entity()
let currentShowDebugInfoText = new TextShape('')
let debug2dUI = new ui.CornerLabel('',-250,20)  
const debug2DBG = new UIContainerRect(ui.canvas)

function formatTime(val:any){
  if(val){
    const date = new Date(val*1000)
    return date.toLocaleString()
  }
}
function formatTimeDiff(timea:any,timeb:any){
  if(timea && timeb){
    return ((timeb-timea)/60).toFixed(2) + "-min"
  }
  return "?-1?"
}

export function loadShowDebugUI(){

  currentShowDebugInfo.addComponent(new Billboard(true,true,false))
  //currentShow.setParent(S1)
  
  currentShowDebugInfo.addComponent(currentShowDebugInfoText)
  currentShowDebugInfo.addComponent(
    new Transform({
      position: CONFIG.DEBUG_3D_PANEL_POSITION,
      rotation: Quaternion.Euler(0, 180, 0), 
      scale: new Vector3(2, 3, 2), 
    })
  )


  let currentShowDebugInfoBG = new Entity()
  //currentShowDebugInfo.addComponent(new Billboard(true,true,false))
  //currentShow.setParent(S1)
  currentShowDebugInfoBG.addComponent(new PlaneShape())
  currentShowDebugInfoBG.addComponent(
    new Transform({
      position: new Vector3(0, 0, .1),
      rotation: Quaternion.Euler(0, 180, 0), 
      scale: new Vector3(7.5, 1, 1), 
    })
  )
  //currentShowDebugInfoBG.addComponent(RESOUR)
  currentShowDebugInfoBG.setParent(currentShowDebugInfo)

  currentShowDebugInfoText.value = 'XX'
  currentShowDebugInfoText.visible = true
  currentShowDebugInfoText.fontSize = 2  
  // currentShowText.font = new Font(Fonts.SanFrancisco_Heavy)
  currentShowDebugInfoText.textWrapping = true
  currentShowDebugInfoText.width = 9
  currentShowDebugInfoText.color = Color3.Black()
  currentShowDebugInfoText.outlineColor = Color3.White()
  currentShowDebugInfoText.outlineWidth = 0.01

  
  //const debug2d = new ui.CornerLabel
  
  debug2DBG.visible = false
  debug2DBG.positionY = -15
  debug2DBG.width = "570"
  debug2DBG.height = "100"
  debug2DBG.vAlign = 'bottom'
  debug2DBG.hAlign = 'right'
  debug2DBG.color = Color4.Gray()
  debug2DBG.opacity = 0.5
  
  debug2dUI.uiText.fontSize = 16
  //debug2dUI.uiText.b
  debug2dUI.hide()


  
}

export function updateDebugStageInfo(stage:any){
  const SHOW_MGR = REGISTRY.SHOW_MGR
  if(SHOW_MGR === undefined){
    log("updateDebugStageInfo ERROR, SHOW_MGR is null!!!")
    return;
  }

  if(!currentShowDebugInfo.alive && CONFIG.IN_PREVIEW){
    if(CONFIG.DEBUG_3D_PANEL_ENABLED) engine.addEntity(currentShowDebugInfo)
    if(CONFIG.DEBUG_2D_PANEL_ENABLED && !debug2dUI.uiText.visible){
      debug2DBG.visible = true
      debug2dUI.show()
    }
  }
  if(!CONFIG.IN_PREVIEW){
    return;
  }
  if(stage){  
    let text = "STAGE DEBUG INFO("+ CONFIG.STAGE_ID +"); DetectPlayer:"+CONFIG.ENABLED_DETECT_SCENE_ACTIVE_UTIL+";SceneActive:"+CONFIG.CAN_PLAY_VIDEO + ";vid.playing:"+SHOW_MGR.isPlaying()
      + "\n"+stage.title + ";live: "+stage.live + ";day:" + stage.day +";artist:" + stage.artistId
    const validDayAndArtistId = stage.day !== undefined && stage.artistId !== undefined
    const validDays = stage.days !== undefined && stage.day < stage.days.length
    const validDayArtists = stage.days[stage.day] !== undefined && stage.artistId < stage.days[stage.day].length
    if(
      validDayAndArtistId
        && validDays
        && validDayArtists
        && stage.days[stage.day][stage.artistId] !== undefined
        ){ 
          const artist = stage.days[stage.day][stage.artistId]
          text += "\nArtist:" +  artist.artist + ";" + artist.subtitleId 
              + ";start:" + artist.startTime + "("+formatTime(artist.startTime)+")\n" + "countDown:("+formatTimeDiff(Date.now()/1000,artist.startTime)+")"
    }else{
      log("updateDebugStageInfo. cannot get artist data updateDebugStageInfo",validDayAndArtistId,validDays,validDayArtists) 
    }
    currentShowDebugInfoText.value = text

    if(CONFIG.DEBUG_2D_PANEL_ENABLED) debug2dUI.set(text)
  }else if(CONFIG.STAGE_ID == STAGE_IDS.NOT_A_STAGE){
    if(CONFIG.DEBUG_2D_PANEL_ENABLED) {
      const text = "CONFIG.STAGE_ID set to STAGE_IDS.NOT_A_STAGE. Nothing to report"
      currentShowDebugInfoText.value = text

      debug2dUI.set(text)
    }
  }else{
    
      const erroText=   "ERROR: stage is missing for CONFIG.STAGE_ID " + CONFIG.STAGE_ID 
        +"\ncheck stage "+CONFIG.STAGE_ID +" is registered in config file "
      currentShowDebugInfoText.value =erroText
    if(CONFIG.DEBUG_2D_PANEL_ENABLED) {
      debug2dUI.set(erroText)
    }
  }
}