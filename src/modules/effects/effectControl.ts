import { RainController } from "./rain";
import { TotemLightController } from "./totemLights";
import { TopScreensController } from "./screenRotate";
import { KickDrumController } from "./kickdrums";
import { SpinnerController } from "./spinners";
import { FlatLightController } from "./flatLights";
import { MushroomAvatarController } from "./mushroomPeople";
import { GrassController } from "./grass";
import { AnimatorSys  } from '../animators'
import { VladimirController } from "./vladimirSystem";


engine.addSystem(new AnimatorSys())

export let rainControl = new RainController()
export let totemLightControl = new TotemLightController()
export let flatLightControl = new FlatLightController()
export let topScreenControl = new TopScreensController()
export let kickDrumControl = new KickDrumController()
export let spinnerControl = new SpinnerController()
export let mushControl = new MushroomAvatarController()
export let grassControl = new GrassController()
export let vladimirControl = new VladimirController()

//rainControl.startRain(600)
//totemLightControl.start()

//flatLightControl.start()
//flatLightControl.startAlwaysOn()

// kickDrumControl.stopAll()
 //kickDrumControl.pump(120)
// kickDrumControl.startLeftThrusters()

//spinnerControl.start(400)


// Event when player enters scene
onEnterSceneObservable.add((player) => {  

    // mushControl.getMushroom().addComponentOrReplace(
    //   new AttachToAvatar({
    //   avatarId: player.userId,
    //   anchorPointId: AttachToAvatarAnchorPointId.Position,
      
    //   }))  
    }
  )
  
  // Event when player leaves scene
  onLeaveSceneObservable.add((player) => {
    log("player left scene: ", player.userId)
  })

const input = Input.instance

// button down event
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => {

  mushControl.enable().then(()=>{
    mushControl.start()
  })
   
   // grassControl.start()
  })
  
input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, (e) => {
    mushControl.stop()
   // grassControl.stop()
  })
  