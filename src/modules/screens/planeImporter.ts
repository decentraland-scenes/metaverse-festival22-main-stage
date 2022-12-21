import { ScreenData, } from "./screenData"
import { planeTransforms, } from "./planes"
import { REGISTRY } from 'src/festival-mgmt-dropin/registry'

const sceneBase = new Entity()
sceneBase.addComponent(new Transform())
sceneBase.addComponent(new GLTFShape('models/scene_base.glb'))
engine.addEntity(sceneBase)

const sceneOffset = new Vector3( 96, 0, 64)

const myVideoClip1 = new VideoClip('https://player.vimeo.com/external/637531989.m3u8?s=0a75c635933b3588464fcbee094839bf08f9c252')
export const myVideoTexture = new VideoTexture(myVideoClip1)


let testMat = new Material()
testMat.albedoTexture = myVideoTexture
testMat.emissiveTexture = myVideoTexture
testMat.emissiveColor = Color3.Gray()
testMat.emissiveIntensity = 1
//testMat.alphaTexture = mask
testMat.transparencyMode = 2
testMat.alphaTest = 0.1
testMat.roughness = 1
testMat.metallic = 0
testMat.specularIntensity = 0

let glowMat = new Material()
glowMat.albedoTexture = myVideoTexture
glowMat.emissiveTexture = myVideoTexture
glowMat.emissiveColor = Color3.White()
glowMat.emissiveIntensity = 5
glowMat.alphaTexture = myVideoTexture
glowMat.transparencyMode = 2
glowMat.alphaTest = 0.1
glowMat.roughness = 1
glowMat.metallic = 0
glowMat.specularIntensity = 0

myVideoTexture.play()


    
export function initPlanes(screenData:ScreenData[]){

    for(let i=0; i< screenData.length; i++){
        let plane = new Entity()
        plane.addComponent(screenData[i].transform)
        plane.getComponent(Transform).position.addInPlace(sceneOffset)
        plane.addComponent( new PlaneShape()).uvs = screenData[i].uv

        switch(screenData[i].materialID)
        {
            case "glow_mat":{
                plane.addComponent( REGISTRY.videoMaterial)
                break
            }
            default: {
                plane.addComponent( REGISTRY.videoMaterial)
                break
            }
        }
        
        engine.addEntity(plane)
    }
}    

//initPlanes(planeTransforms) - call from game.ts init()