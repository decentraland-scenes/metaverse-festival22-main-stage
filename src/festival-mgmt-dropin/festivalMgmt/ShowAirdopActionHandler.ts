import { ShowActionManager } from "src/festival-mgmt-dropin/show-management/showMgmt/manageShowActions"
import {  ActionParams, ShowActionSupportArgs } from "src/festival-mgmt-dropin/show-management/showMgmt/actionHandlers/showActionHandler"
import { ShowActionHandlerSupport } from "src/festival-mgmt-dropin/show-management/showMgmt/actionHandlers/ShowActionHandlerSupport"
import { actionStartsWith } from "src/festival-mgmt-dropin/show-management/showMgmt/actionHandlers/utils"
import * as ui from '@dcl/ui-scene-utils'
import { dropCrate } from "../airdrops/crate"
//import { campaigns, campaign_keys } from "../airdrops/loot"


export type ActionTypeDrop={
  text?:string
  refId:string
  campaignId?:string
  keyId?:string
  randomDelayMax?:number
}

/**
 * 
action will be used as follows
AIRDROP {"refId":"ref id to drop","campaignId":"1","keyId":"1","randomDelayMax":-1}
 */
export class ShowAirdopActionHandler extends ShowActionHandlerSupport<ActionTypeDrop>{
  public static DEFAULT_NAME = 'AIRDROP'
  constructor(args?:ShowActionSupportArgs<ActionTypeDrop>){
    super(ShowAirdopActionHandler.DEFAULT_NAME,args)
  }

  matches(action: string, showActionMgr: ShowActionManager): boolean {
    //log('CUSTOM matches SAY fired',action)
    return this.name !== undefined && actionStartsWith(action,this.name,0," ")
  }
  
  decodeAction(action: string, showActionMgr: ShowActionManager): ActionParams<ActionTypeDrop> {
    const results = super.decodeAction(action,showActionMgr)
    
    //if most customization required....

    return results
  }
  process(action: ActionParams<ActionTypeDrop>, showActionMgr: ShowActionManager): void {
    const METHOD_NAME = "process"
    
    this.logger.debug(METHOD_NAME,"ENTRY",action)
    //TODO look them up in new campaign id
    //ui.displayAnnouncement("DO AIR DROP!! " + action.params.refId +  + action.params.campaignId + " " +action.params.keyId)

    dropCrate(action.params.refId, action.params.campaignId , action.params.keyId ,action.params.randomDelayMax)
     /* switch(action.params.campaignId){
        case 1:
          log(METHOD_NAME,'we should drop crate for campaign here')
          
          dropCrate(campaigns.campaign1, campaign_keys.crate1,action.params.randomDelayMax)
          break;
        default:
          dropCrate(campaigns.campaign1 ,campaign_keys.crate1,action.params.randomDelayMax)
      }*/
  }
}
 