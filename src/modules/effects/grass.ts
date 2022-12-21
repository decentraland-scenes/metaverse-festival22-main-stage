

export class GrassController{

    grass:Entity
    activated:boolean = false
    constructor(){

        this.grass = new Entity()
        this.grass.addComponent(new Transform({
            position: new Vector3( 96, 0, 64),
            scale: new Vector3(0,0,0)
        }))
        this.grass.addComponent(new GLTFShape('models/effects/grass.glb'))
        engine.addEntity(this.grass)
    }

    start(){
        if(!this.activated){
            this.stop()
            this.activated = true
        }
        this.grass.getComponent(Transform).scale.setAll(1)
        engine.addEntity(this.grass)
        
    }

    stop(){
        this.grass.getComponent(Transform).scale.setAll(0)
        if(this.grass.isAddedToEngine){
            engine.removeEntity(this.grass)
        } 
    }


}

