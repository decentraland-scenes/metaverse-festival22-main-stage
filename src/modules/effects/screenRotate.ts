import { ScreenData } from "../screens/screenData"
import { _sceneCenter } from "./sceneCenter"
import { positions } from "./rainPositions"
import { videoMatGlow } from "./videoMaterialsCustom"

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

export let planeTransforms:ScreenData[] = [{
 transform: new Transform({ 
	position: new Vector3(0.5312776565551758, 49.99187088012695, 68.64688873291016),
	scale: new Vector3(16.55503273010254, 73.83309936523438, 20.005420684814453), 
	rotation: new Quaternion(-0.6623548269271851, 0.0, -0.0, -0.7491902709007263)}), 
 uv: [ 0.4473896026611328, 0.8253178894519806,  0.4473896026611328, 0.9932603761553764,  0.9083725214004517, 0.9932603091001511,  0.9083725214004517, 0.8253178894519806,  0.5526103973388672, 0.8253178894519806,  0.5526103973388672, 0.9932603761553764,  0.09162747859954834, 0.9932603091001511,  0.09162747859954834, 0.8253178894519806, 	],
 materialID:"glow_mat"
},
{
 transform: new Transform({ 
	position: new Vector3(0.5312776565551758, 38.495784759521484, 20.51137351989746),
	scale: new Vector3(16.55503273010254, 26.8869571685791, 20.005420684814453), 
	rotation: new Quaternion(-0.500206470489502, 0.0, -0.0, -0.8659061789512634)}), 
 uv: [ 0.3002793788909912, 0.8253178894519806,  0.3002793788909912, 0.9932603761553764,  0.4473896026611328, 0.9932603761553764,  0.4473896026611328, 0.8253178894519806,  0.6997206211090088, 0.8253178894519806,  0.6997206211090088, 0.9932603761553764,  0.5526103973388672, 0.9932603761553764,  0.5526103973388672, 0.8253178894519806, 	],
 materialID:"glow_mat"
},
{
 transform: new Transform({ 
	position: new Vector3(0.5312776565551758, 15.866321563720703, 4.565174102783203),
	scale: new Vector3(16.55503273010254, 33.02005386352539, 20.00541877746582), 
	rotation: new Quaternion(-0.139622300863266, 0.0, -0.0, -0.9902048110961914)}), 
 uv: [ 0.09493020176887512, 0.8253178894519806,  0.09493020176887512, 0.9932604283094406,  0.3002793788909912, 0.9932603761553764,  0.3002793788909912, 0.8253178894519806,  0.9050697982311249, 0.8253178894519806,  0.9050697982311249, 0.9932604283094406,  0.6997206211090088, 0.9932603761553764,  0.6997206211090088, 0.8253178894519806, 	],
 materialID:"glow_mat"
},
]



export class TopScreensController {

	topScreens:Entity[]
	numberOfWings:number = 5
	angleStep:number = -45
	startAngle:number = 90
	root:Entity
	localPivots:Entity[]
	rotateSystem:RotateAndResetSystem

	constructor(){
		this.topScreens = []
		this.localPivots = []
		this.root = new Entity()
		this.root.addComponent(new Transform({
			position: new Vector3(0, 49.084, -46.535)
			}
		))
		this.root.setParent(_sceneCenter)

		this.initPlanes(planeTransforms)
		this.rotateSystem = new RotateAndResetSystem(false)
		engine.addSystem(this.rotateSystem)
		this.stopRotation()
	}
	
	initPlanes(screenData:ScreenData[]){

		for (let p =0; p < this.numberOfWings; p++){

			let pivot = new Entity()
			pivot.addComponent(new Transform({
				rotation: Quaternion.Euler(0,0, this.startAngle + p * this.angleStep),
				scale: new Vector3(1,1,1)
			}))
			pivot.addComponent(new RotateAndReset( 112.5, -112.5, this.startAngle + p * this.angleStep))
			pivot.setParent(this.root)


			for(let i=0; i< screenData.length; i++){				

				let plane = new Entity()
				plane.addComponent(screenData[i].transform)			
				plane.addComponent( new PlaneShape()).uvs = screenData[i].uv
		
				switch(screenData[i].materialID)
				{
					case "glow_mat":{
						plane.addComponent( videoMatGlow)
						break
					}
					default: {
						plane.addComponent( videoMatGlow)
						break
					}
				}
				
				plane.setParent(pivot)
				//engine.addEntity(plane)
			}
		}
	}

	rotate(speed:number){
		this.rotateSystem.speed = speed
		this.rotateSystem.active = true
	}
	stopRotation(){
		this.rotateSystem.active = false
		
	}
}

class RotateAndResetSystem {

	groupRotate = engine.getComponentGroup(RotateAndReset, Transform)
	speed = 20
	active:boolean = false
	maxScale:number = 1

	constructor(_active:boolean){
		this.active = _active
	}

	update(dt:number){

		if(this.active){

			for(let entity of this.groupRotate.entities){
				const cInfo = entity.getComponent(RotateAndReset)
				const transform = entity.getComponent(Transform)
	
				cInfo.currentAngle -= this.speed*dt
	
				if (cInfo.currentAngle <= cInfo.cutoffAngle +15) {				
					
					transform.scale.x =  (cInfo.currentAngle - cInfo.cutoffAngle)/15 * this.maxScale
				}
	
				if (cInfo.currentAngle <= cInfo.cutoffAngle) {
					
					cInfo.currentAngle += (cInfo.startAngle - cInfo.cutoffAngle)
					transform.rotation = Quaternion.Euler(0,0,cInfo.currentAngle )
					transform.scale.x = 0
				}
				if (cInfo.currentAngle >= cInfo.startAngle -15) {				
					
					transform.scale.x =  ( cInfo.startAngle - cInfo.currentAngle)/15 * this.maxScale
				}
	
				transform.rotate(Vector3.Forward(), -this.speed*dt )
			}
		}
		

	}
}