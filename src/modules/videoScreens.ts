import { REGISTRY } from 'src/festival-mgmt-dropin/registry'
import { _scene } from 'src/game'

/// Add video screens
let  mainStageVideoMask = new Texture("images/screen_mask.png")

export const videoMat = new Material()


export function initShowDisplay(){
  //add to registry so show manager can manage it and it can be shared around scene
  REGISTRY.videoMaterial = videoMat
}

videoMat.castShadows = false
videoMat.metallic = 0
videoMat.roughness = 1
videoMat.emissiveIntensity = 1
videoMat.emissiveColor = Color3.Gray()
videoMat.alphaTexture = mainStageVideoMask
videoMat.transparencyMode = 2




// S1
export const S1 = new Entity()
export const video = S1
const planeS1 = new PlaneShape()
planeS1.uvs = [


  0.218,1,
  0.782,1 ,
  0.782,0,
  0.218,0,

  0.218,1,
  0.782,1 ,
  0.782,0,
  0.218,0,
]
S1.addComponent(planeS1)

S1.addComponent(
  new Transform({
    position: new Vector3(8, 2.766, 5.2),
    scale: new Vector3(8.32, 8.32, 1),
  })
)
S1.addComponent(videoMat)

engine.addEntity(S1)


/*
// S2
export const S2 = new Entity()
const planeS2 = new PlaneShape()
planeS2.uvs = [ 
  0.218,1,
  0.782,1 ,
  0.782,0,
  0.218,0,

  0.218,1,
  0.782,1 ,
  0.782,0,
  0.218,0,
]
S2.addComponent(planeS2)

S2.addComponent(
  new Transform({
    position: new Vector3(8, 2.7, 1.72),
    scale: new Vector3(5.6, 5.6, 1),
  })
)
S2.addComponent(videoMat)

engine.addEntity(S2)*/