
import { ChainReactor, ChainTransform, ChainSystem } from './chainReaction'
import { Oscillate } from '../animators'
import { _sceneCenter } from './sceneCenter'



export class FlatLight extends Entity {

    lightBeam:Entity
    staticFrame:Entity
    oscillate:Oscillate
    upRotation:Quaternion
    downRotation:Quaternion
    endScale:Vector3

    constructor(pos:Vector3, staticRotation:Quaternion, upRotation:Quaternion, downRotation:Quaternion, delay:number){
        super()
        this.staticFrame = new Entity()
        this.staticFrame.addComponent(new Transform({
            position: new Vector3(pos.x, pos.y, pos.z),
            rotation: staticRotation           
        }))
        this.staticFrame.addComponent(new GLTFShape('models/effects/flat_light_static.glb'))
        //engine.addEntity(this.staticFrame)
        this.staticFrame.setParent(_sceneCenter)

        this.upRotation = upRotation
        this.downRotation = downRotation
        
        this.addComponent(new Transform({
            rotation: new Quaternion(upRotation.x, upRotation.y, upRotation.z, upRotation.w)
        }))               
        this.addComponent(new GLTFShape('models/effects/flat_light_base.glb'))

        this.oscillate = new Oscillate(
            upRotation,
            downRotation,
             0.001,
            delay
        )
        //this.addComponent(this.oscillate)

        //engine.addEntity(this)
        this.setParent(this.staticFrame)
        
        this.endScale = new Vector3(1,0.25,2)
      

        this.lightBeam = new Entity()
        this.lightBeam.addComponent(new Transform({
            scale: new Vector3(0,0,0)
        }))
        
        this.lightBeam.setParent(this)
        this.lightBeam.addComponent(new GLTFShape('models/effects/flat_light_beam.glb'))

       
        
    }

    stop(){        
        this.lightBeam.getComponent(Transform).scale.setAll(0)        
    }

    start(){
        this.lightBeam.getComponent(Transform).scale.copyFrom(this.endScale) 
    }

    startOscillation(){
        this.addComponent(this.oscillate)
    }
    stopOscillation(){
        if(this.hasComponent(Oscillate)){
            this.removeComponent(this.oscillate)
        }
        
    }

    startAlwaysOn(wave:boolean){
       this.stopOscillation()
       this.start()

        if(wave){
            this.startOscillation()
        }
        else{
            this.stopOscillation()
        }
    }

    setFixedUp(){
        this.stopOscillation()
        this.startAlwaysOn(false)
        this.getComponent(Transform).rotation.set(this.upRotation.x, this.upRotation.y, this.upRotation.z, this.upRotation.w)
    }
    setFixedDown(){
        this.stopOscillation()
        this.startAlwaysOn(false)
        this.getComponent(Transform).rotation.set(this.downRotation.x, this.downRotation.y, this.downRotation.z, this.downRotation.w)
    }

   
}





export class FlatLightController {

    lightPosLeft:Transform[] = []
    lightPosRight:Transform[] = []

    lightsLeft:FlatLight[]
    lightsRight:FlatLight[]
    

    constructor(){
        this.lightPosLeft = []
        this.lightPosRight = []

        this.lightsLeft = []
        this.lightsRight = []
        
        

        //Right side
        this.lightPosRight.push(new Transform({ position: new Vector3(-38.58055877685547,31.0, -26.039873123168945), rotation: Quaternion.Euler(150, 0, 0)}))
        this.lightPosRight.push(new Transform({ position: new Vector3(-47.455623626708984,31.0, -16.776391983032227), rotation:Quaternion.Euler(160, 0, 0)}))
        this.lightPosRight.push(new Transform({ position: new Vector3(-52.41453552246094,31.0, -6.440193176269531), rotation: Quaternion.Euler(170, 0, 0)}))
        this.lightPosRight.push(new Transform({ position: new Vector3(-54.998260498046875,31.0, 5.66956901550293), rotation: Quaternion.Euler(180, 0, 0)}))

        //Right side
        this.lightPosLeft.push(new Transform({ position: new Vector3(38.58055877685547,31.0, -26.039873123168945), rotation: Quaternion.Euler(150, 0, 0)}))
        this.lightPosLeft.push(new Transform({ position: new Vector3(47.455623626708984,31.0, -16.776391983032227), rotation:Quaternion.Euler(160, 0, 0)}))
        this.lightPosLeft.push(new Transform({ position: new Vector3(52.41453552246094,31.0, -6.440193176269531), rotation: Quaternion.Euler(170, 0, 0)}))
        this.lightPosLeft.push(new Transform({ position: new Vector3(54.998260498046875,31.0, 5.66956901550293), rotation: Quaternion.Euler(180, 0., 0)}))
            
       
          
              

        // this.lightChain = new ChainReactor(120)
        // this.lightChain.setBPM(1000)
        // this.lightChain.setRandom(true)
        // this.lightChainSystem =  new ChainSystem(this.lightChain)

        this.addAllSmallLights()

        // engine.addSystem( this.lightChainSystem )

       // this.stop()  
    }

    addLeftSide(){
        for(let i=0; i < this.lightPosLeft.length; i++){
    
            let rotation = Quaternion.Euler(230, -40 - i*4, 0)

            let smallLight = new FlatLight(
                this.lightPosLeft[i].position,
                Quaternion.Euler(0, -40 - i*4, 0),
                Quaternion.Euler(180 , 0, 0),
                Quaternion.Euler(210 , 0, 0),
                i * -0.3
            )
           
    
            // smallLight.addComponent(new Oscillate(
            //     Quaternion.Euler(180 , 0, 0),
            //     Quaternion.Euler(210 , 0, 0),
            //      0.001,
            //      i*0.2
            // ))
    
            //this.lightChain.addObjectToChain(smallLight.lightBeam)
            this.lightsLeft.push(smallLight) 
        }
    }
    addRightSide(){
        for(let i=0; i < this.lightPosRight.length; i++){
    
            let rotation = Quaternion.Euler(230, 40 + i*4, 0)
            let smallLight = new FlatLight(
                this.lightPosRight[i].position,
                Quaternion.Euler(0, 40 + i*4, 0),
                Quaternion.Euler(180 , 0, 0),
                Quaternion.Euler(210 , 0, 0),
                i * -0.3
            )           
            
            //  smallLight.addComponent(new Oscillate(
            //     Quaternion.Euler(180 , 0, 0),
            //     Quaternion.Euler(210 , 0, 0),
            //      0.001,
            //      i*0.2
            //  ))
    
           // this.lightChain.addObjectToChain(smallLight.lightBeam)
            this.lightsRight.push(smallLight) 
        }
    }
    
    addAllSmallLights(){
       this.addLeftSide()
       this.addRightSide()
    }

    start(){
        //this.lightChain.start()

        for(let light of this.lightsLeft){
            light.start()
        }
        
        for(let light of this.lightsRight){
            light.start()
        }
    }

    stop(){
        //this.lightChain.stop()
        for(let light of this.lightsLeft){
            light.stop()
        }

        for(let light of this.lightsRight){
            light.stop()
        }
    }

    startAlwaysOn(wave:boolean){
        //this.lightChain.start()

        log("NUMBER OF LEFT LIGHTS :" +  this.lightsLeft.length )
        log("NUMBER OF RIGHT LIGHTS :" +  this.lightsRight.length )

        for(let i=0; i < this.lightsLeft.length; i++){
           
            log("LEFT LIGHTS : " + i)
            this.lightsLeft[i].startAlwaysOn(wave)
            
        }
        for(let i=0; i < this.lightsRight.length; i++){
            
            log("RIGHT LIGHTS : " + i)
            this.lightsRight[i].startAlwaysOn(wave)             
            
        }
        
    }

    startFixedDown(){
        for(let i=0; i < this.lightsLeft.length; i++){           
            this.lightsLeft[i].setFixedDown()            
        }
        for(let i=0; i < this.lightsRight.length; i++){            
            this.lightsRight[i].setFixedDown()            
        }
    }
    startFixedUp(){
        for(let i=0; i < this.lightsLeft.length; i++){           
            this.lightsLeft[i].setFixedUp()            
        }
        for(let i=0; i < this.lightsRight.length; i++){            
            this.lightsRight[i].setFixedUp()             
        }
    }
}

