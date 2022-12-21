import * as showMgmt from 'src/festival-mgmt-dropin/show-management/index'


const SHOW_MGR:showMgmt.ShowManager = new showMgmt.ShowManager()
const runOfShow = new showMgmt.RunOfShowSystem(SHOW_MGR)

//intermediatry to help keep loose coupling
export class Registry{
  SHOW_MGR:showMgmt.ShowManager = SHOW_MGR
  RUN_OF_SHOW_SYSTEM:showMgmt.RunOfShowSystem = runOfShow
  videoMaterial!:Material
}

export const REGISTRY = new Registry()

export function initRegistry(){
  
}