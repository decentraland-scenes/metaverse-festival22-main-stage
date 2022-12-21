import { isPreviewMode } from '@decentraland/EnvironmentAPI'
import { bootStrapClaimingDropins } from './claiming-dropin/bootstrapClaiming'
import { CONFIG, initConfig } from './config'
import { bootStrapFestivalDropins } from './festival-mgmt-dropin/bootstrapFestival'
import { initRegistry, REGISTRY } from './festival-mgmt-dropin/registry'
import { initDispenserPositions, initSceneClaiming } from './modules/claiming/claimSetup'
//import { initDispenserPositions, initSceneClaiming } from './modules/claiming/claimSetup'
import { initPlanes } from './modules/screens/planeImporter'
import { planeTransforms } from './modules/screens/planes'
import { registerShowEntities } from './modules/showMgmt/showEntities'
import { loadSceneShowSetup } from './modules/showMgmt/showSetup'


export const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(1, 1, 1),
})
_scene.addComponentOrReplace(transform)



export let parent = new Entity()
parent.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(parent)
  
// Rocks & Base Ground
const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape('models/main_stage_base.glb')
gltfShape.withCollisions = false
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({   
  position: new Vector3(192/2, 0, 128/2), 
  rotation: new Quaternion(0, 0, 0, 1), 
  scale: new Vector3(1, 1, 1),
})
entity.addComponentOrReplace(transform2)

// Screens

export let main_stage_screen = new Entity()
main_stage_screen.addComponent(new GLTFShape('models/main_stage_screen.glb'))
main_stage_screen.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_screen)
main_stage_screen.setParent(parent)

// Totem Pillars

export let main_stage_pillars = new Entity()
main_stage_pillars.addComponent(new GLTFShape('models/main_stage_pillars.glb'))
main_stage_pillars.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_pillars)
main_stage_pillars.setParent(parent)

// Arch

export let main_stage_arch = new Entity()
main_stage_arch.addComponent(new GLTFShape('models/main_stage_arch.glb'))
main_stage_arch.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_arch)
main_stage_arch.setParent(parent)


// Elevator

export let main_stage_elevator = new Entity()
main_stage_elevator.addComponent(new GLTFShape('models/main_stage_elevator.glb'))
main_stage_elevator.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_elevator)
main_stage_elevator.setParent(parent)

// // Buddha

// export let main_stage_buddha = new Entity()
// main_stage_buddha.addComponent(new GLTFShape('models/main_stage_buddha.glb'))
// main_stage_buddha.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   })
// )
// engine.addEntity(main_stage_buddha)
// main_stage_buddha.setParent(parent)

// Lights_Beat

// export let main_stage_lights_beat = new Entity()
// main_stage_lights_beat.addComponent(new GLTFShape('models/main_stage_lights_beat.glb'))
// main_stage_lights_beat.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   })
// )
// engine.addEntity(main_stage_lights_beat)
// main_stage_lights_beat.setParent(parent)

// Light Boxes

// export let main_stage_lights_boxes = new Entity()
// main_stage_lights_boxes.addComponent(new GLTFShape('models/main_stage_lights_boxes.glb'))
// main_stage_lights_boxes.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   })
// )
// engine.addEntity(main_stage_lights_boxes)
// main_stage_lights_boxes.setParent(parent)

// Light Fire Structure

export let main_stage_lights_fire_structure = new Entity()
main_stage_lights_fire_structure.addComponent(new GLTFShape('models/main_stage_lights_fire_structure.glb'))
main_stage_lights_fire_structure.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_lights_fire_structure)
main_stage_lights_fire_structure.setParent(parent)

//Tree_01 

export let tree_01 = new Entity()
tree_01.addComponent(new GLTFShape('models/tree_01.glb'))
tree_01.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_01)
tree_01.setParent(parent)

export let tree_02 = new Entity()
tree_02.addComponent(new GLTFShape('models/tree_02.glb'))
tree_02.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_02)
tree_02.setParent(parent)

export let tree_03 = new Entity()
tree_03.addComponent(new GLTFShape('models/tree_03.glb'))
tree_03.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_03)
tree_03.setParent(parent)

export let tree_04 = new Entity()
tree_04.addComponent(new GLTFShape('models/tree_04.glb'))
tree_04.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_04)
tree_04.setParent(parent)

export let tree_05 = new Entity()
tree_05.addComponent(new GLTFShape('models/tree_05.glb'))
tree_05.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_05)
tree_05.setParent(parent)

export let tree_06 = new Entity()
tree_06.addComponent(new GLTFShape('models/tree_06.glb'))
tree_06.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_06)
tree_06.setParent(parent)

export let tree_07 = new Entity()
tree_07.addComponent(new GLTFShape('models/tree_07.glb'))
tree_07.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_07)
tree_07.setParent(parent)

export let tree_08 = new Entity()
tree_08.addComponent(new GLTFShape('models/tree_08.glb'))
tree_08.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_08)
tree_08.setParent(parent)

export let tree_09 = new Entity()
tree_09.addComponent(new GLTFShape('models/tree_09.glb'))
tree_09.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_09)
tree_09.setParent(parent)

export let tree_10 = new Entity()
tree_10.addComponent(new GLTFShape('models/tree_10.glb'))
tree_10.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(tree_10)
tree_10.setParent(parent)

export let details = new Entity()
details.addComponent(new GLTFShape('models/details.glb'))
details.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(details)
details.setParent(parent)

export let details_02 = new Entity()
details_02.addComponent(new GLTFShape('models/details_02.glb'))
details_02.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(details_02)
details_02.setParent(parent)







//Fire Hand

export let main_stage_fire_01 = new Entity()
main_stage_fire_01.addComponent(new GLTFShape('models/main_stage_fire_01.glb'))
main_stage_fire_01.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_fire_01)
main_stage_fire_01.setParent(parent)


// // Light tower

// export let main_tower = new Entity()
// main_tower.addComponent(new GLTFShape('models/main_tower.glb'))
// main_tower.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   })
// )
// engine.addEntity(main_tower)
// main_tower.setParent(parent)

// Rocks

export let main_stage_rocks = new Entity()
main_stage_rocks.addComponent(new GLTFShape('models/main_stage_rocks.glb'))
main_stage_rocks.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_rocks)
main_stage_rocks.setParent(parent)

// Big Trees_L

export let main_stage_big_trees = new Entity()
main_stage_big_trees.addComponent(new GLTFShape('models/main_stage_big_trees.glb'))
main_stage_big_trees.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_big_trees)
main_stage_big_trees.setParent(parent)

// Antennas

export let antenna = new Entity()
antenna.addComponent(new GLTFShape('models/antenna.glb'))
antenna.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(antenna)
antenna.setParent(parent)

// Big Trees_R

export let main_stage_big_trees_R = new Entity()
main_stage_big_trees_R.addComponent(new GLTFShape('models/main_stage_big_trees_R.glb'))
main_stage_big_trees_R.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(main_stage_big_trees_R)
main_stage_big_trees_R.setParent(parent)

//Side Structure

export let side_structure = new Entity()
side_structure.addComponent(new GLTFShape('models/side_structure.glb'))
side_structure.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(side_structure)
side_structure.setParent(parent)

//Fire Hands
export let fire_hands = new Entity()
fire_hands.addComponent(new GLTFShape('models/fire_hands.glb'))
fire_hands.addComponent(
  new Transform({
    position: new Vector3(192/2, 0, 128/2),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
engine.addEntity(fire_hands)
fire_hands.setParent(parent)



 
// //Lights Bottom

// export let main_stage_lights_bottom = new Entity()
// main_stage_lights_bottom.addComponent(new GLTFShape('models/main_stage_lights_bottom.glb'))
// main_stage_lights_bottom.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   })
// )
// engine.addEntity(main_stage_lights_bottom)
// main_stage_lights_bottom.setParent(parent)

// //Lights_Top
// export let main_stage_lights_top = new Entity()
// main_stage_lights_top.addComponent(new GLTFShape('models/main_stage_lights_top.glb'))
// main_stage_lights_top.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   }) 
// )
// engine.addEntity(main_stage_lights_top)
// main_stage_lights_top.setParent(parent)

// //Lights_Tower

// export let main_stage_tower = new Entity()
// main_stage_tower.addComponent(new GLTFShape('models/main_stage_tower.glb'))
// main_stage_tower.addComponent(
//   new Transform({
//     position: new Vector3(192/2, 0, 128/2),
//     rotation: Quaternion.Euler(0, 0, 0),
//   })
// )
// engine.addEntity(main_stage_tower)
// main_stage_tower.setParent(parent)

async function init(){ 
  initRegistry()  
  initConfig()//MUST BE FIRST
  //INIT DROP INS
  bootStrapFestivalDropins()
  bootStrapClaimingDropins()
  //INIT SCENE SPECIFIC THINGS
  initDispenserPositions()
  //initSceneClaiming() 

  loadSceneShowSetup()
  registerShowEntities()
  initPlanes(planeTransforms)

  //createDanceAreas()

  isPreviewMode().then(preview=>{
    const enableFlag = preview || CONFIG.FORCE_PREVIEW_ENABLED
    if(enableFlag) {
      // Static Structure
      /*
      const airDropTest = new Entity('airDropTest')
      engine.addEntity(airDropTest)
      airDropTest.setParent(_scene)
      airDropTest.addComponentOrReplace(new BoxShape())

      airDropTest.addComponentOrReplace(new Transform({
        position: new Vector3(96, 0, 114),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1, 1, 1),
      }))
      airDropTest.addComponent(new OnPointerDown(()=>{
        REGISTRY.SHOW_MGR.actionMgr.runAction("AIRDROP {\"refId\":\"DAY1_KEY4_DEFAULT\",\"randomDelayMax\":0}")
      },{
        hoverText:"airdrop test \n only active isPreviewMode OR CONFIG.FORCE_PREVIEW_ENABLED === true"
      }))*/

      Input.instance.subscribe("BUTTON_DOWN", ActionButton.ACTION_3, false, (e) => {
        const zMult = (Math.random() * 2) > 1 ? 1 : -1
        if(zMult>0){
          REGISTRY.SHOW_MGR.actionMgr.runAction("AIRDROP {\"refId\":\"DAY1_KEY4_DEFAULT\",\"randomDelayMax\":0}")
        }else{
          REGISTRY.SHOW_MGR.actionMgr.runAction("AIRDROP {\"refId\":\"DAY1_KEY1_KRAKEN\",\"randomDelayMax\":0}")
        }
      })
    }
  })

}

init()