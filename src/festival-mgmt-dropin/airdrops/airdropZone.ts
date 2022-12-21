//import { isPreviewMode } from "@decentraland/EnvironmentAPI"
import { hud } from "@dcl/builder-hud"
//import { CONFIG, initConfig } from "src/config"

export let dropzone:Entity

export async function createDropZone(CONFIG:{DROPZONE_HELPER_VISIBLE:boolean,DROPZONE_POSITION:Vector3,DROPZONE_SIZE:Vector3}){
    dropzone = new Entity("airdrop zone")
 
    if(CONFIG.DROPZONE_HELPER_VISIBLE){
        dropzone.addComponent(new BoxShape()).withCollisions = false
        dropzone.addComponent(new Material())
        dropzone.getComponent(Material).albedoColor = new Color4(0,1,0,.5)
        dropzone.addComponent(new OnPointerDown(()=>{},
        {
            hoverText:"this is the drop zone for parachute drops\n"+
            "position must be saved to CONFIG.DROPZONE_POSITION + DROPZONE_SIZE" +
            "\nonly visible in preview.\ndisable entirely with CONFIG.DROPZONE_HELPER_VISIBLE=false"
        }))
    }

    dropzone.addComponent(new Transform({position: CONFIG.DROPZONE_POSITION, scale: CONFIG.DROPZONE_SIZE}))
    engine.addEntity(dropzone)
    hud.attachToEntity(dropzone)
}
