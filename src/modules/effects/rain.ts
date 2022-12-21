import { positions } from "./rainPositions"

const rainCenter = new Vector3(96, 0, 64)
const rainShape = new GLTFShape('models/effects/rain.glb')
const splashShape = new GLTFShape('models/effects/rain_splash.glb')
const regionHeight = 100
const splashCount = positions.length

@Component("rainParticle")
export class rainParticle {  
    lifeSpan:number = 360

    constructor(_lifeSpan:number){
        this.lifeSpan = _lifeSpan
    }
}
@Component("SplashParticle")
export class SplashParticle {   
    activeFrames:number = 5 
    elapsedFrames:number = Math.floor(Math.random()*3) 
}

export class RainController {

    rainGroup:Entity[]
    splashGroup:Entity[]
    rainSystem:RainFallSystem

    constructor(){
        this.rainGroup = []
        this.splashGroup = []
        this.addRain()
        this.rainSystem = new RainFallSystem()
        engine.addSystem(this.rainSystem)
    }

    addRain(){
        
        for (let i=0; i< 10; i++){
            let rainDrops = new Entity()  
            rainDrops.addComponent(rainShape)          
            rainDrops.addComponent(new Transform({position: new Vector3(rainCenter.x + Math.random(),  0, rainCenter.z  + Math.random()),
                scale: new Vector3(0,0,0),
            rotation: Quaternion.Euler(0,0,0)}))        
            engine.addEntity(rainDrops)

            this.rainGroup.push(rainDrops)
            
        } 
        for (let i=0; i< 25; i++){

            let splash = new Entity()  
            splash.addComponent(splashShape)          
            splash.addComponent(new Transform({position: new Vector3(10,-8,18 +i),
                scale: new Vector3(1 + Math.random(),1 + Math.random(),1 + Math.random()),
                rotation: Quaternion.Euler(0,Math.random()*360,0)}))        
            splash.addComponent( new SplashParticle())    
            engine.addEntity(splash)

            this.splashGroup.push(splash)
            
        }           
    }


    startRain(_duration:number){

        this.rainSystem.setDuration(_duration)
        //CONFETTI
        for (let i=0; i< this.rainGroup.length; i++){
            
            
            this.rainGroup[i].addComponentOrReplace(new rainParticle(_duration))
            this.rainGroup[i].getComponent(Transform).position = new Vector3(rainCenter.x ,  1+Math.random()*2 + i*regionHeight/5, rainCenter.z  )
            this.rainGroup[i].getComponent(Transform).scale = new Vector3(1,1,1)
            this.rainGroup[i].getComponent(Transform).rotation = Quaternion.Euler(0,Math.floor(Math.random()*2)*180,0)       
                 
            
        }
        this.rainSystem.start()
        
    
            
    }
    stop(){
        this.rainSystem.stop()
    }
    
}



class RainFallSystem {

    groupRainDrops = engine.getComponentGroup(rainParticle, Transform)
    groupSplash = engine.getComponentGroup(SplashParticle, Transform)
    duration = 100
    elapsed = 0
    startHeight = 40
    fallSpeed = 80
    cutoffHeight = -10

    enabled:boolean = false


    
    setDuration(_duration:number){
        this.duration = _duration
        this.elapsed = 0
    }
    start(){
        this.enabled = true
        this.elapsed = 0
    }

    stop(){
        this.enabled = false
        for(let entity of this.groupRainDrops.entities){
            entity.getComponent(Transform).position.y = -20
        }
        for(let entity of this.groupSplash.entities){
            entity.getComponent(Transform).position.y = -20       
        }
    }
    getRandSplashPosition():Vector3{

        
        return positions[Math.floor(Math.random() * splashCount)]
    }

    update(dt:number){
       
        if(this.enabled){

            this.elapsed += dt        

            for(let entity of this.groupRainDrops.entities){
                const cInfo = entity.getComponent(rainParticle)
    
               // entity.getComponent(Transform).rotate(Vector3.Forward(), dt*35)
                entity.getComponent(Transform).translate(Vector3.Down().multiplyByFloats(0, this.fallSpeed*dt, 0))
                cInfo.lifeSpan -=dt
    
                if(entity.getComponent(Transform).position.y < this.cutoffHeight){
                    if(cInfo.lifeSpan > 0){
                        entity.getComponent(Transform).position.y += regionHeight
                    }
                    else{
                        entity.getComponent(Transform).position.y = -25
                        entity.removeComponent(rainParticle)
                    }
                    
                }
            }
    
            if(this.elapsed > this.duration){
                this.stop()
               // engine.removeSystem(this)
            }

           //splashes
           for(let entity of this.groupSplash.entities){
            
                const transform = entity.getComponent(Transform)
                const splashInfo = entity.getComponent(SplashParticle)

                splashInfo.elapsedFrames ++

                if(splashInfo.elapsedFrames > splashInfo.activeFrames){
                    transform.position.copyFrom(this.getRandSplashPosition())
                    splashInfo.elapsedFrames = 0
                }
                
                

            }
           
        }
        
        
    }
}


