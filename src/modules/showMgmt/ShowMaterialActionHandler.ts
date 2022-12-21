import { ShowActionManager } from "src/festival-mgmt-dropin/show-management/showMgmt/manageShowActions"
import {  ActionParams, ShowActionSupportArgs } from "src/festival-mgmt-dropin/show-management/showMgmt/actionHandlers/showActionHandler"
import { ShowActionHandlerSupport } from "src/festival-mgmt-dropin/show-management/showMgmt/actionHandlers/ShowActionHandlerSupport"
import { actionStartsWith } from "src/festival-mgmt-dropin/show-management/showMgmt/actionHandlers/utils"
import * as ui from '@dcl/ui-scene-utils'


export type ActionMaterialSetupType={
    text?:string
    campaignId?:number
    keyId?:number
    randomDelayMax?:number
}

/**
 * 
action will be used as follows
MATERIAL_SETUP {"showId":"1","keyId":"1"}
 */
export class ShowMaterialActionHandler extends ShowActionHandlerSupport<ActionMaterialSetupType>{
  public static DEFAULT_NAME = 'MATERIAL_SETUP'
  constructor(args?:ShowActionSupportArgs<ActionMaterialSetupType>){
    super(ShowMaterialActionHandler.DEFAULT_NAME,args)
  }

  matches(action: string, showActionMgr: ShowActionManager): boolean {
    //log('CUSTOM matches SAY fired',action)
    return this.name !== undefined && actionStartsWith(action,this.name,0," ")
  }
  
  decodeAction(action: string, showActionMgr: ShowActionManager): ActionParams<ActionMaterialSetupType> {
    const results = super.decodeAction(action,showActionMgr)
    
    //if most customization required....

    return results
  }
  process(action: ActionParams<ActionMaterialSetupType>, showActionMgr: ShowActionManager): void {
    const METHOD_NAME = "process"
    
    this.logger.debug(METHOD_NAME,"ENTRY",action)
    //TODO look them up in new campaign id
    ui.displayAnnouncement("CHANGE MATERIAL LOGIC!! " + action.params.campaignId + " " +action.params.keyId)
     
  }
}
 