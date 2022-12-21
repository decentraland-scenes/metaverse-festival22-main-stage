export const _sceneCenter = new Entity('_scene')

_sceneCenter.addComponent(new Transform({
  position: new Vector3(96, 0, 64),
  rotation: Quaternion.Euler(0, 0, 0),
  scale: new Vector3(1, 1, 1),
}))
engine.addEntity(_sceneCenter)
