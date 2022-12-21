
@Component("ChainTransform")
export class ChainTransform { 
  start:Transform
  end:Transform
  fraction:number = 0
  speed:number = 1
  oscillate:boolean = false
  active:boolean = false


  constructor(_start:TransformConstructorArgs, _end:TransformConstructorArgs, _speed:number, _oscillate?:boolean){
      this.start = new Transform(_start)            
      this.end = new Transform(_end)
      this.speed = _speed

      if(_oscillate){
          this.oscillate = _oscillate
      }
  }
}


export class ChainReactor {
    objects:Entity[] 
    loopTime:number = 0
    currentTime:number = 0
    activeID:number = -1
    animFraction:number = 0
    freq:number = 60/600
    randomize:boolean = false
    enabled:boolean = false

    constructor(bpm?:number){
        this.objects = []

        if(bpm){
            this.freq = 60/bpm
        }
    }

    addObjectToChain(_obj:Entity){
        if(_obj.hasComponent(ChainTransform)){
            this.objects.push(_obj)
            this.loopTime += _obj.getComponent(ChainTransform).speed            
        }
        if(this.objects.length > 0){
            this.activeID = 0            
        }
    }

    setBPM(bpm:number){
        if (bpm > 0){
            this.freq = 60/bpm
        }
    }

    setRandom(randomize:boolean){
        this.randomize = randomize
    }

    updateChain(dt:number){
    
        if(this.enabled){
       
            if(this.currentTime <= this.freq){
                this.currentTime += dt
            }
            else{            
                this.activateNext()  
                this.currentTime = 0         
            }

            for(let obj of this.objects){

                const transform = obj.getComponent(Transform)
                const chainInfo = obj.getComponent(ChainTransform)

                if(chainInfo.active){                 
        
                    chainInfo.fraction += chainInfo.speed*dt             
        
                    if(chainInfo.fraction <= 1){
                        
                        transform.position = Vector3.Lerp(chainInfo.start.position, chainInfo.end.position, Math.sin(chainInfo.fraction*3))
                        transform.scale = Vector3.Lerp(chainInfo.start.scale, chainInfo.end.scale, Math.sin(chainInfo.fraction*3  ))
                        transform.rotation = Quaternion.Slerp(chainInfo.start.rotation, chainInfo.end.rotation, Math.sin(chainInfo.fraction*3 ))
                    }
                    else{
                        chainInfo.fraction = 0  
                        chainInfo.active = false 
                        transform.position = Vector3.Lerp(chainInfo.start.position, chainInfo.end.position, chainInfo.fraction)
                        transform.scale = Vector3.Lerp(chainInfo.start.scale, chainInfo.end.scale, chainInfo.fraction)
                        transform.rotation = Quaternion.Slerp(chainInfo.start.rotation, chainInfo.end.rotation, chainInfo.fraction) 
                    }   
                    
                }
            }
    }
        
        

    }

    activateNext(){
        if(!this.randomize){
            this.activeID += 1
            if(this.activeID > this.objects.length-1){
                this.activeID = 0
    
            }
            this.objects[this.activeID].getComponent(ChainTransform).active = true
        }else{
            this.activeID = Math.floor(Math.random()*this.objects.length)
            if(this.activeID > this.objects.length-1){
                this.activeID = 0
    
            }
            this.objects[this.activeID].getComponent(ChainTransform).active = true
        }
        
    }

    start(){
        this.enabled = true
    }
    stop(){
        this.enabled = false
    }


}

export class ChainSystem{

    chain:ChainReactor

    constructor(_chain:ChainReactor){
        this.chain = _chain

    }

    update(dt:number){
        this.chain.updateChain(dt)
        
    }
}