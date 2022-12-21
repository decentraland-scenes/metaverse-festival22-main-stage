
import { _sceneCenter } from "./sceneCenter"


@Component("Spinner")
export class Spinner {  
    startAngle:number = 180
	leftSided:boolean = false
	currentAngle:number = 0
    speed:number = 360
    constructor(_starAngle:number,  _currentAngle:number, _speed:number, _isLeftSided:boolean){
        this.startAngle = _starAngle        
		this.currentAngle = _currentAngle
        this.leftSided = _isLeftSided
        this.speed = _speed
    }
}


export class SpinnerController {

	spinnerSmall:Entity
	spinnerBig:Entity
	numberOfWings:number = 5
	angleStep:number = -45
	startAngle:number = 112.5
	root:Entity
	localPivots:Entity[]
	rotateSystem:SpinnerSystem	

	constructor(){
		
		this.localPivots = []
		this.root = new Entity()
		this.root.addComponent(new Transform({
			position: new Vector3(0, 41.571, -42),
			}
		))
		this.root.setParent(_sceneCenter)

		this.initSpinners()
		this.rotateSystem = new SpinnerSystem(false)
		engine.addSystem(this.rotateSystem)
		//this.stop()

		
	}
	
	initSpinners(){		

			this.spinnerSmall = new Entity()
			this.spinnerSmall.addComponent(new Transform({
                position: new Vector3(0, 0, 0),
				rotation: Quaternion.Euler(0,0, this.angleStep),
				scale: new Vector3(0,0,0)
			}))
            this.spinnerSmall.addComponent(new GLTFShape('models/effects/spinner_small.glb'))
			this.spinnerSmall.addComponent(new Spinner( 112.5, this.angleStep, 360, false))
			this.spinnerSmall.setParent(this.root)		

			this.spinnerBig = new Entity()
			this.spinnerBig.addComponent(new Transform({
                position: new Vector3(0, 0, 23.571),
				rotation: Quaternion.Euler(0,0, this.angleStep),
				scale: new Vector3(0,0,0)
			}))
            this.spinnerBig.addComponent(new GLTFShape('models/effects/spinner_big.glb'))
			this.spinnerBig.addComponent(new Spinner( 112.5, this.angleStep, 400, true))
			this.spinnerBig.setParent(this.root)				
			
		
	}

	start(_speed:number){
		this.setSpeed(_speed)
		this.spinnerSmall.getComponent(Transform).scale.setAll(1)
		this.spinnerBig.getComponent(Transform).scale.setAll(1)
		// if(!this.root.isAddedToEngine()){
		// 	engine.addEntity(this.root)
		 	this.rotateSystem.start()

		// }
	}

	stop(){
		this.rotateSystem.stop()
		// engine.removeEntity(this.root)
		this.spinnerSmall.getComponent(Transform).scale.setAll(0)
		this.spinnerBig.getComponent(Transform).scale.setAll(0)
	}	

	setSpeed(_speed:number){
		const bigInfo = this.spinnerBig.getComponent(Spinner)
		const smallInfo = this.spinnerSmall.getComponent(Spinner)

		bigInfo.speed = _speed
		smallInfo.speed = _speed*0.9
	}
		

	
}

class SpinnerSystem {

	groupRotate = engine.getComponentGroup(Spinner, Transform)
	
	active:boolean = false

	constructor(_active:boolean){
		this.active = _active
	}

	update(dt:number){

		if(this.active){

			for(let entity of this.groupRotate.entities){
				const cInfo = entity.getComponent(Spinner)
				const transform = entity.getComponent(Transform)
	
                if(cInfo.leftSided){
                    cInfo.currentAngle -= cInfo.speed*dt	
                    transform.rotate(Vector3.Forward(), -cInfo.speed * dt )
                }
                else{
                    cInfo.currentAngle +=cInfo.speed*dt	
				    transform.rotate(Vector3.Forward(), + cInfo.speed * dt )
                }
				
			}
		}
		

	}

	start(){
		this.active = true
	}
	stop(){
		this.active = false
	}
}