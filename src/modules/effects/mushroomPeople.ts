import { getPlayersInScene } from "@decentraland/Players"
import { videoMatUmbrella } from "./videoMaterialsCustom" 
import * as ui from '@dcl/ui-scene-utils'




@Component("RotateAndReset")
export class RotateAndReset {  
    startAngle:number = 90
	cutoffAngle:number = -90
	currentAngle:number = 0
    constructor(_starAngle:number, _cutoffAngle:number, _currentAngle:number){
        this.startAngle = _starAngle
        this.cutoffAngle = _cutoffAngle
		this.currentAngle = _currentAngle
    }
}

class MushroomAvatar extends Entity {
  material:Material  
  bottom:Entity
  cap:Entity

  constructor(_material:Material){
    super()
    this.material = _material

    
    this.addComponent(new Transform({
      position: new Vector3(0,0,0),
      scale: new Vector3(1.0, 1.0, 1.0)
    }))      
    engine.addEntity(this)

    this.bottom = new Entity()
    this.bottom.addComponent(new Transform({
      position: new Vector3(0.16,1.6,0.65),
      scale: new Vector3(0.0, 0.0, 0.0),
      rotation: Quaternion.Euler(-40,0,0)}))
    this.bottom.addComponent(new GLTFShape('models/effects/shroom_bottom.glb'))
    this.bottom.setParent(this)

    this.cap = new Entity()
    this.cap.addComponent(new Transform({
      position: new Vector3(0,1.9812,0),
      scale: new Vector3(0.5,1, -1),
      rotation: Quaternion.Euler(0,-90,-90) 
  }))
    this.cap.addComponent(new SphereShape()).withCollisions = false   
    //this.cap.addComponent(this.material)
    this.cap.setParent(this.bottom)

    this.hide()

  }
  show(){
    this.bottom.getComponent(Transform).scale.setAll(0.7)
    this.cap.addComponent(this.material)
  }
  
  hide(){
    this.bottom.getComponent(Transform).scale.setAll(0)
    if(this.cap.hasComponent(Material)){
      this.cap.removeComponent(Material)
    }
  }
  open(fraction:number){
    const baseScale = new Vector3(0,0.7,0) 
    const endScale = new Vector3(0.7,0.7,0.7) 
    const c4 = (2 * Math.PI) / 3
    const transform =  this.bottom.getComponent(Transform)
    
    let frac = Math.pow(2, -10 * fraction) * Math.sin((fraction * 10 - 0.75) * c4) + 1 

    transform.scale = Vector3.Lerp(baseScale, endScale, frac ) 
 
    transform.position.y = 0.9 + frac*0.7 
    transform.position.z = 1.65 - frac 
     
  }
    
}


export class MushroomAvatarController {

  mushroomPool:MushroomAvatar[]
  modArea:Entity
  materials:Material[]
  current:number = 0
  max:number = 50
  openSystem:MushroomOpenSystem  
  ui:ui.SmallIcon

  constructor(){

    let imgUrl = "images/umbrella_icon.png"
 

    this.ui= new ui.SmallIcon(imgUrl,-640,-20, 64, 32, {sourceHeight: 64, sourceWidth: 128})
    this.ui.hide()

    this.mushroomPool = []
    this.materials = []
    this.modArea = new Entity()
    
    this.modArea.addComponent(
      new AvatarModifierArea({
        area: { box: new Vector3(160, 4, 96) },
        modifiers: [AvatarModifiers.HIDE_AVATARS],
      })
    )
    this.modArea.addComponent(
      new Transform({
        position: new Vector3(96, -8, 64),
      })
    )
    engine.addEntity(this.modArea)

  
    let mat1 = new Material()
    mat1.albedoTexture = videoMatUmbrella.albedoTexture
    mat1.alphaTexture = new Texture('images/umbrella_alpha.png')
    mat1.alphaTest = 0.1
    mat1.transparencyMode = 2

    this.materials.push(videoMatUmbrella)

    this.initMushrooms()

    this.openSystem = new MushroomOpenSystem(this)

  }

  getRandomMaterial():Material{


    let randIndex = Math.floor(Math.random()*this.materials.length)
    return this.materials[randIndex]
  }

  initMushrooms(){

    for(let i=0; i< this.max; i++){
      let mush = new MushroomAvatar(this.getRandomMaterial())
      this.mushroomPool.push(mush)
    }

    this.enable()
  }

  getMushroom():MushroomAvatar{

    if(this.current ++ < this.max){
      return this.mushroomPool[this.current]
    }
    else{
      this.current = 0
      return this.mushroomPool[0]
    }
    
  }

  start(){
   
    for(let i=0; i< this.mushroomPool.length; i++){
     // if(this.mushroomPool[i].hasComponent(AttachToAvatar)){
        this.mushroomPool[i].show()
     // }
    }
    engine.addSystem(this.openSystem)
    this.openSystem.active = true

    this.ui.show()
  }

  stop(){
    this.openSystem.active = false
    this.openSystem.elapsed = 0
    for(let i=0; i< this.mushroomPool.length; i++){      
        this.mushroomPool[i].hide()      
    }

    this.ui.hide()
  }

  updateOpen(fraction:number){
    
    for(let i=0; i< this.mushroomPool.length; i++){
     
         this.mushroomPool[i].open(fraction)
     }
  }
  
  async enable(){
    let players = await getPlayersInScene()
    players.forEach((player) => {
      
      this.getMushroom().addComponentOrReplace(
        new AttachToAvatar({
        avatarId: player.userId,
        anchorPointId: AttachToAvatarAnchorPointId.Position,
        })
    )
    })

    //this.modArea.getComponent(Transform).position.y = 0
  }

}

class MushroomOpenSystem {

  elapsed:number = 0
  duration:number = 0.75
  active:boolean = true
  mushControlRef:MushroomAvatarController

  constructor(mushController:MushroomAvatarController){
    this.mushControlRef = mushController
  }

  update(dt:number){
    if(this.active){
      this.elapsed += dt

      if(this.elapsed < this.duration){
        this.mushControlRef.updateOpen(this.elapsed/this.duration)
      }
      else{
        this.mushControlRef.updateOpen(1)
        this.active = false
        this.elapsed = 0
      }
    }
   
  }

}












