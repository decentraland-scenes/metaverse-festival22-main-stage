import { _sceneCenter } from "./sceneCenter"

@Component("ThrusterAnimated")
export class ThrusterAnimated { 
  speedRotation:number = 1
  axis:Vector3 = Vector3.Up()
  pulseFreq:number = 1
  originalDepth:number
  baseScale:number = 2
  amplitude:number = 2


  constructor(_axis:Vector3, _speed:number, _depth:number, _baseScale:number, _amplitude:number){
      this.speedRotation = _speed
      this.axis = _axis
      this.originalDepth = _depth
      this.baseScale = _baseScale
      this.amplitude = _amplitude
  }
}

export class KickDrumController {

	cartLeft:Entity
	cartRight:Entity
    baseLeft:Entity
    baseRight:Entity
    beamsLeft:ThrusterNormal[]
    beamsRight:ThrusterNormal[]
	cartShape:GLTFShape
	baseShape:GLTFShape
    thrusterSys:ThrusterSystem

	constructor(){
        
        this.cartShape = new GLTFShape("models/effects/kickdrum_cart.glb")
        this.baseShape = new GLTFShape("models/effects/kickdrum_bases.glb")

        this.beamsLeft = []
        this.beamsRight = []

		this.cartLeft = new Entity()
		this.cartLeft.addComponent(new Transform({
		    position: new Vector3(-65, 37.26, -11.434)
		//	position: new Vector3(10,5, -10)
			}
		))
        this.cartLeft.addComponent(this.cartShape)
		this.cartLeft.setParent(_sceneCenter)

		this.cartRight = new Entity()
		this.cartRight.addComponent(new Transform({
			//position: new Vector3(65, 37.26, 18)
            position: new Vector3(65, 37.26, -11.434)
			}
		))
        this.cartRight.addComponent(this.cartShape)
		this.cartRight.setParent(_sceneCenter)

		this.baseLeft = new Entity()
		this.baseLeft.addComponent(new Transform({
			position: new Vector3(0,0,0)
			}
		))
        this.baseLeft.addComponent(this.baseShape)
		this.baseLeft.setParent(this.cartLeft)

		this.baseRight = new Entity()
		this.baseRight.addComponent(new Transform({
			position: new Vector3(0, 0, 0),
            scale: new Vector3(-1, 1 , 1)
			}
		))
        this.baseRight.addComponent(this.baseShape)
		this.baseRight.setParent(this.cartRight)

        let beam1 = new ThrusterNormal( { 
            position: new Vector3(29.519,8.5, -5.0),
            rotation: Quaternion.Euler(-112.5, 203,0),
            scale: new Vector3(3,1,3) 
        })
        let beam2 = new ThrusterNormal( { 
            position: new Vector3(20.5, 4.6, -2.0),
            rotation: Quaternion.Euler(-112.5, 208,0),
            scale: new Vector3(1.5, 1, 1.5) 
         })

        let beam3 = new ThrusterNormal( { 
            position: new Vector3(13.8,1.3, 2.0),
            rotation: Quaternion.Euler(-112.5, 210,0),
            scale: new Vector3(1.5,1,1.5)  
         })     
           
        beam1.setParent(this.baseLeft)        
        beam2.setParent(this.baseLeft)        
        beam3.setParent(this.baseLeft)              
              
        this.beamsLeft.push(beam1, beam2, beam3)

        let beam1R = new ThrusterNormal( { 
            position: new Vector3(29.519,8.5, -5.0),
            rotation: Quaternion.Euler(-112.5, 203,0),
            scale: new Vector3(3,1,3)
        })
        let beam2R = new ThrusterNormal( { 
            position: new Vector3(20.5, 4.6, -2.0),
            rotation: Quaternion.Euler(-112.5, 208,0),
            scale: new Vector3(1.5, 1, 1.5) 
         })

        let beam3R = new ThrusterNormal( { 
            position: new Vector3(13.8,1.3, 2.0),
            rotation: Quaternion.Euler(-112.5, 210,0),
            scale: new Vector3(1.5,1,1.5)    
        })     
           
        beam1R.setParent(this.baseRight)        
        beam2R.setParent(this.baseRight)        
        beam3R.setParent(this.baseRight)              
              
        this.beamsRight.push(beam1R, beam2R, beam3R)

        this.thrusterSys = new ThrusterSystem(this)
        engine.addSystem(this.thrusterSys)

        this.stopAll()

		
	}
    startLeftThrusters(){
        for(let thruster of this.beamsLeft){
            thruster.start()
        }
    }  
    startRightThrusters(){
        for(let thruster of this.beamsRight){
            thruster.start()
        }
    }     
        

    stopLeftThrusters(){
        for(let thruster of this.beamsLeft){
            thruster.stop()
        }
    }  
    stopRightThrusters(){
        for(let thruster of this.beamsRight){
            thruster.stop()
        }
    }  
    

    startSideThrusters(){
        this.startLeftThrusters()
        this.startRightThrusters()
    }

    stopSideThrusters(){
        this.stopLeftThrusters()
        this.stopRightThrusters()
    }

    startAll(){
        this.startSideThrusters()        
    }

    stopAll(){
        this.stopSideThrusters()        
        //this.stopPump()
    }

    pump(_bpm:number){
        this.thrusterSys.pump(_bpm)
    }
    stopPump(){
        this.thrusterSys.stopPump()
        
    }
    setColor(_color:Color3){
        for(let thruster of this.beamsLeft){
            thruster.thrusterBeam.setColor(_color)
        }
        for(let thruster of this.beamsRight){
            thruster.thrusterBeam.setColor(_color)
        }
        
    }
	
}



export class ThrusterNormal extends Entity {
    thrusterBeam:ThrusterBeam
    baseTransform:Transform
    activeTransform:Transform


    constructor(_baseTransform:TransformConstructorArgs){
        super()
        
        this.baseTransform = (new Transform(_baseTransform))
        this.addComponent( this.baseTransform)
        this.activeTransform = new Transform({
            position: new Vector3(_baseTransform.position.x, _baseTransform.position.y, _baseTransform.position.z),
            rotation: new Quaternion(_baseTransform.rotation.x, _baseTransform.rotation.y, _baseTransform.rotation.z, _baseTransform.rotation.w)
        })

        //this.addComponent(new GLTFShape('models/effects/kickdrum_sphere.glb'))

        this.thrusterBeam = new ThrusterBeam( new Vector3(0,0,0), Quaternion.Euler(0,0,0), new Vector3(2,1,2,), 2, 3)

        engine.addEntity(this)
        this.thrusterBeam.setParent(this)

        this.hide()
        
    }

    start(){       
        this.thrusterBeam.start()   
        this.addComponentOrReplace(this.activeTransform)     
    }
    stop(){
        this.thrusterBeam.stop()     
        this.addComponentOrReplace(this.baseTransform)     
    }
    hide(){
        this.getComponent(Transform).scale.setAll(0)
    }
    
}


export class ThrusterBeam extends Entity {

    thursterComp:ThrusterAnimated
    originalScale:Vector3 = new Vector3(1,1,1)    
    material:Material

    constructor(_position:Vector3, _rotation:Quaternion, _scale:Vector3, _depth:number, _beamSize:number){
        super()

        this.material = new Material()
        this.material.albedoColor = Color4.Red()
        this.material.alphaTexture = new Texture('images/gradient_alpha.png')
        this.material.emissiveIntensity = 20
        this.material.transparencyMode = 2
        //beamBlueMat.emissiveColor = Color3.FromHexString('#5be1e9')
        //orange
        this.material.emissiveColor = Color3.FromHexString('#659bf9')
        //blue
       //this.material.emissiveColor = Color3.FromHexString('#0066bb')
        //green
        //this.material.emissiveColor = Color3.FromHexString('#11bb44')
        this.material.metallic = 0
        this.material.roughness = 1
        this.material.specularIntensity = 0


        this.originalScale.copyFrom(_scale)
       // this.originalScale.copyFrom(new Vector3 ( 5, 5, 5))

        let beamBase = new Entity()
        beamBase.addComponent(new Transform({
            position: new Vector3(0.02, 5, 0.025),
            rotation: Quaternion.Euler(180,0,0),
            scale: new Vector3(1.8,8,1.1)
        }))
        beamBase.addComponent(new SphereShape())
        beamBase.addComponent(this.material)
        beamBase.setParent(this)

        let beamBase2 = new Entity()
        beamBase2.addComponent(new Transform({
            position: new Vector3(0.01,4,-0.07),
            rotation: Quaternion.Euler(180,0,0),
            scale: new Vector3(3.7,8,3.4)
        }))
        beamBase2.addComponent(new SphereShape())
        beamBase2.addComponent(this.material)
        beamBase2.setParent(this)

        let beamTail = new Entity()
        beamTail.addComponent(new Transform({
            position: new Vector3(0,12,0),
            scale: new Vector3(0.5,12,0.5),
            rotation: Quaternion.Euler(0,0,0)
        }))
        beamTail.addComponent(new CylinderShape())
        beamTail.getComponent(CylinderShape).radiusTop = 0
        beamTail.addComponent(this.material)
        beamTail.setParent(this)

        this.addComponent(new Transform({
            position: new Vector3(_position.x, _position.y, _position.z),
            rotation: new Quaternion(_rotation.x, _rotation.y, _rotation.z, _rotation.w),
            scale: new Vector3(_scale.x, _scale.y, _scale.z)
           // scale: new Vector3(1.1, 1.1, 1.1)

        }))        

        this.thursterComp = new ThrusterAnimated(Vector3.Up(), 4000, _depth, _beamSize, _beamSize/2)
        //this.addComponent( this.thursterComp )
        engine.addEntity(this)

        if(!this.hasComponent(ThrusterAnimated)){
            this.addComponent( this.thursterComp )
        }
        
    }

    start(){
        if(!this.hasComponent(ThrusterAnimated)){
            this.getComponent(Transform).scale.copyFrom(this.originalScale)
            //this.getComponent(Transform).position.z = this.thursterComp.originalDepth
            this.addComponent( this.thursterComp )
        }
        
    }
    stop(){
        if(this.hasComponent(ThrusterAnimated)){
            this.removeComponent( this.thursterComp )
            this.getComponent(Transform).scale.set(0, 0.05, 0)
            //this.getComponent(Transform).position.z = -5

        }
    }

    setColor(_color:Color3){
        
        this.material.albedoColor = _color
        this.material.emissiveColor = _color
    }


}


export class ThrusterSystem {

    thrusterGroup = engine.getComponentGroup(ThrusterAnimated, Transform) 
    kickControlRef:KickDrumController   
    isPumping:boolean = false    
    BPM:number = 120
    frequency:number = 60/this.BPM
    elapsed:number = this.frequency //so the effect triggers immediately on enabling the system
    onTime:number = this.frequency/2
    onElapsed:number = 0

    constructor(_controllerRef:KickDrumController){
        
        this.kickControlRef = _controllerRef
        

    }

    update(dt:number){

        if(this.isPumping){
            this.frequency = 60/this.BPM
            this.onTime = this.frequency/2
    
            if(this.elapsed < this.frequency){
                this.elapsed += dt
    
                if(this.onElapsed < this.onTime){
                    this.onElapsed += dt
                }
                else {
                    this.kickControlRef.stopAll()  
                }
                    
    
            }
            else{
                this.kickControlRef.startAll()
                this.elapsed -= this.frequency
                this.onElapsed  = 0
            }
        }
        

        for(let obj of this.thrusterGroup.entities){
            const info = obj.getComponent(ThrusterAnimated)
            let transform = obj.getComponent(Transform)

            transform.rotate(info.axis, info.speedRotation*dt)
            transform.scale.set(transform.scale.x, info.baseScale-(Math.random()*info.amplitude), transform.scale.z)


            
        } 
    }

    setBPM(_bpm:number){
        this.BPM = _bpm
        this.frequency = 60/this.BPM
        this.elapsed = this.frequency //so the effect triggers immediately on enabling the system
        this.onTime = this.frequency/2
    }

    pump(_bpm:number){
        this.setBPM(_bpm)
        this.isPumping = true

    }
    stopPump(){
        this.isPumping = false
    }

    
}