

export class VladimirController{

    vladimir:Entity
    activated:boolean = false
    startPos:Vector3 = new Vector3(192/2, 2.5, 128/2 - 35)
    finalPos:Vector3 = new Vector3(192/2, 2.5, 128/2 - 19)
    finalScale:Vector3 = new Vector3(12, 12, 12)

    raiseSystem:VladimirSystem

    constructor(){        
  
        this.vladimir = new Entity()
        this.vladimir.addComponent(new Transform({
            position: new Vector3(192/2, -30, 128/2 - 19),
            scale: new Vector3(0,0,0)
        }))
        this.vladimir.addComponent(new GLTFShape('models/VladimirCauchemar.glb'))
        engine.addEntity(this.vladimir)
        
        this.raiseSystem = new VladimirSystem(this)
    }

    start(){
        if(!this.activated){
            this.stop()
            this.activated = true
        }
        this.vladimir.getComponent(Transform).scale.copyFrom(this.finalScale)
       // this.vladimir.getComponent(Transform).position.copyFrom(this.finalPos)
        engine.addEntity(this.vladimir)

        engine.addSystem(this.raiseSystem)
        this.raiseSystem.active = true
        
    }

    stop(){
        this.vladimir.getComponent(Transform).scale.setAll(0)
        if(this.vladimir.isAddedToEngine){
            engine.removeEntity(this.vladimir)
        } 
        this.raiseSystem.active = false
    }
    open(fraction:number){
     
        const transform =  this.vladimir.getComponent(Transform)            
        transform.position = Vector3.Lerp(this.startPos, this.finalPos, fraction)
        
         
      }


}

class VladimirSystem {

    elapsed:number = 0
    duration:number = 3
    active:boolean = true
    vladControlRef:VladimirController
  
    constructor(vladControl:VladimirController){
      this.vladControlRef = vladControl
    }
  
    update(dt:number){
      if(this.active){
        this.elapsed += dt
  
        if(this.elapsed < this.duration){
          this.vladControlRef.open(this.elapsed/this.duration)
        }
        else{
          this.vladControlRef.open(1)
          this.active = false
          this.elapsed = 0
        }
      }
     
    }
  
  }