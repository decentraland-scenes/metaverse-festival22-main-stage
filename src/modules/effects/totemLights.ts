
import { ChainReactor, ChainTransform, ChainSystem } from './chainReaction'
import { Oscillate } from '../animators'
import { _sceneCenter } from './sceneCenter'



export class TotemLight extends Entity {

    lightBeam:Entity

    constructor(transform:TransformConstructorArgs){
        super()

        this.addComponent(new Transform(transform))       
        this.getComponent(Transform).position.addInPlace(new Vector3(0,0,0)) 
        this.addComponent(new GLTFShape('models/effects/totem_light_base.glb'))
        engine.addEntity(this)
        this.setParent(_sceneCenter)
        
        this.lightBeam = new Entity()
        this.lightBeam.addComponent(new Transform({
            scale: new Vector3(0,0,0)
        }))
        
        this.lightBeam.setParent(this)
        this.lightBeam.addComponent(new GLTFShape('models/effects/totem_light_beam.glb'))

        this.lightBeam.addComponent(new ChainTransform(
            {scale: new Vector3(0,0,0)},
            {scale: new Vector3(1,0.5,1)},
            4,
            true
        ))
    }

    stop(){
        this.lightBeam.getComponent(ChainTransform).active = false
        this.lightBeam.getComponent(Transform).scale.setAll(0)
         
        
    }

    start(){
        this.lightBeam.getComponent(ChainTransform).active = true
    }

    startAlwaysOn(){
        this.lightBeam.getComponent(Transform).scale.copyFrom(this.lightBeam.getComponent(ChainTransform).end.scale)
    }

   
}





export class TotemLightController {

    lightPosLeft:Vector3[] = []
    lightPosRight:Vector3[] = []

    lightsLeft:TotemLight[]
    lightsRight:TotemLight[]

    lightChain:ChainReactor

    lightChainSystem:ChainSystem

    constructor(){
        this.lightPosLeft = []
        this.lightPosRight = []

        this.lightsLeft = []
        this.lightsRight = []
        
        //Left side
        this.lightPosLeft.push(new Vector3(25.21, 10.7216  , -20.0   ))
        this.lightPosLeft.push(new Vector3(25.21, 16.8584  ,  -21.0   ))
        this.lightPosLeft.push(new Vector3(25.21, 22.955 ,  -21.5    ))
        this.lightPosLeft.push(new Vector3(25.21, 28.5  ,  -22.3   ))
        
        
        
        //Right side
        this.lightPosRight.push(new Vector3(-25.21, 10.7216  , -21.3739   ))
        this.lightPosRight.push(new Vector3(-25.21, 16.8584  ,  -21.3739   ))
        this.lightPosRight.push(new Vector3(-25.21, 22.955 ,  -21.3739    ))
        this.lightPosRight.push(new Vector3(-25.21, 29.1972  ,  -21.3739    ))           

        this.lightChain = new ChainReactor(120)
        this.lightChain.setBPM(1000)
        this.lightChain.setRandom(true)
        this.lightChainSystem =  new ChainSystem(this.lightChain)

        this.addAllSmallLights()

        engine.addSystem( this.lightChainSystem )

       // this.stop()  
    }

    addLeftSide(){
        for(let i=0; i < this.lightPosLeft.length; i++){
    
            let rotation = Quaternion.Euler(-5, 170-10*((i%2)*2-1), 0)
            let smallLight = new TotemLight({
                position: this.lightPosLeft[i],
                rotation: rotation,
            })
           
    
            smallLight.addComponent(new Oscillate(
                Quaternion.Euler(-5, 170 + 10*((i%2)*2-1),0),
                rotation,
                Math.random()*1,
                0
            ))
    
            this.lightChain.addObjectToChain(smallLight.lightBeam)
            this.lightsLeft.push(smallLight) 
        }
    }
    addRightSide(){
        for(let i=0; i < this.lightPosRight.length; i++){
    
            let rotation = Quaternion.Euler(-5, 190 - 10*((i%2)*2-1), 0)
            let smallLight = new TotemLight({
                position: this.lightPosRight[i],
                rotation: rotation
            })           
    
            smallLight.addComponent(new Oscillate(
                Quaternion.Euler(-5, 190 + 10*((i%2)*2-1), 0),
                rotation,
                Math.random()*1,
                0
            ))
    
            this.lightChain.addObjectToChain(smallLight.lightBeam)
            this.lightsRight.push(smallLight) 
        }
    }
    
    addAllSmallLights(){
       this.addLeftSide()
        this.addRightSide()
    }

    start(){
        this.lightChain.start()

        for(let light of this.lightsLeft){
            light.start()
        }
        
        for(let light of this.lightsRight){
            light.start()
        }
    }

    stop(){
        this.lightChain.stop()
        for(let light of this.lightsLeft){
            light.stop()
        }

        for(let light of this.lightsRight){
            light.stop()
        }
    }

    startAlwaysOn(){
        this.stop()
        //this.lightChain.start()
        for(let i=0; i < this.lightsLeft.length; i++){
           // if(i%3 == 0){
                this.lightsLeft[i].startAlwaysOn()
          // }    
            
        }
        for(let i=0; i < this.lightsRight.length; i++){
            //if(i%3 == 0){
                this.lightsRight[i].startAlwaysOn()
           // }    
            
        }
        
    }
}

