import * as ui from '@dcl/ui-scene-utils'
//import { campaigns, campaign_keys, claimToken, ItemData, PlayCoinSound } from './loot'
import * as utils from '@dcl/ecs-scene-utils'
import { dropzone } from './airdropZone'
import { checkIfPlayerHasAnyWearableByUrn, ClaimTokenRequest, ClaimTokenResult, ClaimUI, HandleClaimTokenCallbacks } from 'src/claiming-dropin/claiming/loot'
import { ClaimUiType, DispenserPos, ItemData } from 'src/claiming-dropin/claiming/claimTypes'
import { lookUpDispenserDefByRefId } from 'src/claiming-dropin/claiming/utils'
import { CONFIG } from 'src/config'
import { PlayCoinSound } from 'src/claiming-dropin/booth/sounds'

type dropArea = {
  SW: Vector2
  NE: Vector2
}

let stageDropArea: dropArea = {
  SW: new Vector2(3, 3),
  NE: new Vector2(9, 9),
}

// underwater: let stageDropArea: dropArea = {
//   SW: new Vector2(45, 50),
//   NE: new Vector2(92, 62),
// }


const claimCallbacks:HandleClaimTokenCallbacks = {
  onOpenUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
      log("on open",type,claimResult)
  },
  
  onAcknowledge:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
      log("on ack",type,claimResult)
      if(claimResult && claimResult.success){
          const data: ItemData = claimResult.json.data[0]

          
      }
  },
  onCloseUI:(type:ClaimUiType,claimResult?:ClaimTokenResult)=>{
      log("on close",type,claimResult)

      //const hasClaimConfig = claimResult && claimResult.requestArgs && claimResult.requestArgs.claimConfig
      
  }
} 

export class Crate extends Entity {
  openUi: boolean = false
  campaign: string
  campaign_key: string
  campaignRefId:string
  parachute: Entity
  onFinished?: () => void
  startPos: Vector3
  endPos: Vector3 = Vector3.Zero()
  dispenserPos:DispenserPos
  constructor(
    model: string,
    parachuteModel: string,
    position: Vector3,
    campaignRefId: string,
    campaign: string,
    campaign_key: string,
    onFinished?: () => void
  ) {
    super(campaignRefId)
    engine.addEntity(this)

    this.campaignRefId = campaignRefId
    this.campaign = campaign
    this.campaign_key = campaign_key
    
    this.dispenserPos = lookUpDispenserDefByRefId(this.campaignRefId,CONFIG.DISPENSER_POSITIONS)

    log("airdrop.crate","constructor","lookUpDispenserDefByRefId","found",this.dispenserPos,this.campaignRefId,this.campaign,this.campaign_key,model)
 
    this.startPos = position

    if (onFinished) {
      this.onFinished = onFinished
    }

    this.addComponent(new GLTFShape(model))
    this.addComponent(
      new Transform({
        position: position,
      })
    )

    this.parachute = new Entity()
    this.parachute.addComponent(new GLTFShape(parachuteModel))
    this.parachute.addComponent(
      new Transform({ position: new Vector3(0, 1, 0) })
    )

    this.parachute.setParent(this)

    this.addComponent(
      new OnPointerDown(
        () => {
          if (this.openUi) return
          this.activate()
          this.vanish()
        },
        {
          hoverText: 'Claim Loot',
        }
      )
    )

    const idleSource = new AudioSource(new AudioClip('src/festival-mgmt-dropin/airdrops/sounds/star-idle.mp3'))
    this.addComponentOrReplace(idleSource)
    idleSource.loop = true
    idleSource.playing = true

    const spawnSource = new AudioSource(new AudioClip('src/festival-mgmt-dropin/airdrops/sounds/star-spawn.mp3'))
    this.parachute.addComponentOrReplace(spawnSource)
    spawnSource.loop = false
    spawnSource.playing = true
  }

  async activate() {
    this.openUi = true

    const h = this.dispenserPos

    log("airdrop.crate","activate","usingConfig",h,this.campaignRefId,this.campaign,this.campaign_key)
 
    if(h !== undefined){
      const claimUI = new ClaimUI(h.claimUIConfig,h.claimConfig)
      //let data = await claimToken(this.campaign, this.campaign_key, this)
      const hasWearable = claimUI.claimConfig?.wearableUrnsToCheck !== undefined ? await checkIfPlayerHasAnyWearableByUrn(
        //ClaimConfig.campaign.dcl_artweek_px.wearableUrnsToCheck
        claimUI.claimConfig?.wearableUrnsToCheck
        //ClaimConfig.campaign.mvfw.wearableUrnsToCheck
        ) : false
          
      if(hasWearable){
          const claimResult=new ClaimTokenResult()
          claimResult.requestArgs = {...h.claimData}
          claimResult.requestArgs.claimConfig = h.claimConfig
          
          claimUI.openYouHaveAlready(claimResult,claimCallbacks)
      }else{
          const claimReq = new ClaimTokenRequest( h.claimData )

          const claimResult = await claimReq.claimToken()

          log("claim result",claimResult.success)

          claimUI.setClaimUIConfig( h.claimUIConfig )

          claimUI.handleClaimJson( claimResult, claimCallbacks )
      }
    }else{
      log("airdrop.crate","activate","unable to find campaing to use",this.campaignRefId,this.campaign,this.campaign_key)
      ui.displayAnnouncement("Sorry.  This one is empty.")
    }
  }
  vanish(doOnFinished: boolean = true) {
    engine.removeEntity(this.parachute)
    this.addComponent(
      new utils.ScaleTransformComponent(
        Vector3.One(),
        Vector3.Zero(),
        1,
        () => {
          engine.removeEntity(this)
        },
        utils.InterpolationType.EASEINBOUNCE
      )
    )
    // engine.removeEntity(this)
    this.runOnFinished()
    PlayCoinSound()
  }
  runOnFinished() {
    if (this.onFinished) {
      this.onFinished()
    }
  }
  async drop(startPosition?: Vector3, speed?: number) {
    const METHOD_NAME = "crate.drop.dropping"
    log(METHOD_NAME,"ENTRY",this.name,startPosition,speed)
    if (startPosition) {
      this.startPos = startPosition
    }
    let ray: Ray = {
      origin: this.startPos,
      direction: new Vector3(0, -1, 0),
      distance: 30,
    }
    let physicsCast = PhysicsCast.instance

    //can only ray cast 1 at a time, and its lossy
    const directlyBelowPlayerRayCastID = this.campaignRefId !== undefined && this.campaignRefId.toLocaleLowerCase().indexOf("default") > -1 ? 1 : 2
    physicsCast.hitFirst(
      ray,
      (e) => {
        log(METHOD_NAME,this.name,'hit ground at ... ', e.hitPoint,"directlyBelowPlayerRayCastID",directlyBelowPlayerRayCastID)
        if (e.hitPoint && e.hitPoint.x > 0 && e.hitPoint.z > 0) {
          this.endPos = new Vector3(e.hitPoint.x, e.hitPoint.y, e.hitPoint.z)
        } else {
          this.endPos = this.startPos.clone()
          this.endPos.y = 0
        }

        this.addComponent(
          new utils.MoveTransformComponent(
            this.startPos,
            this.endPos,
            speed ? speed : 5,
            () => {
              this.hitGround()
            }
          )
        )
      },
      directlyBelowPlayerRayCastID
    )
  }
  async getGroundHeight(startPosition: Vector3) {}

  hitGround() {
    this.parachute.addComponent(
      new utils.ScaleTransformComponent(
        Vector3.One(),
        Vector3.Zero(),
        1,
        () => {
          engine.removeEntity(this.parachute)
        },
        utils.InterpolationType.EASEINSINE
      )
    )
  }
}

export function dropCrate(campaignRefId:string,campaign: string, campaign_key: string,randomDelayMax?:number) {
  const METHOD_NAME = 'crate.drop.called'
  log(METHOD_NAME,"ENTRY",campaignRefId)
  if(campaignRefId === undefined){
    log(METHOD_NAME,"campaignRefId was undefined could not drop")
    return
  }
  //decide now if normal or kraken
  const altId = "KRAKEN"
  const alternateRefId = campaignRefId + "." + altId
  
  const normal = lookUpDispenserDefByRefId(campaignRefId,CONFIG.DISPENSER_POSITIONS)
  let dropToUse = normal 
  //const altCampaignConfig = lookUpDispenserDefByRefId(alternateRefId,CONFIG.DISPENSER_POSITIONS)
  const randomNum = Math.floor(Math.random()*3)
  //1 in 3 chance to drop kraken
  let useAltCampaign = campaignRefId.toLocaleLowerCase().indexOf(altId.toLocaleLowerCase()) > -1
  /*if(randomNum==1){
    //making it a kraken drop
    if(altCampaignConfig !== undefined){
      useAltCampaign = true
    }else{
      log(METHOD_NAME, "failed to find ",altId,' version',alternateRefId,altCampaignConfig)
    }
    if(useAltCampaign){
      dropToUse = altCampaignConfig
    }
  }*/
  const postfix = (useAltCampaign?"_"+altId.toLowerCase():"")
  
  log(METHOD_NAME ,"using',randomNum","dropToUse",dropToUse,"useAltCampaign",useAltCampaign,"postfix",postfix)

  let crate = new Crate(
    'src/festival-mgmt-dropin/models/crate/crate'+ postfix +'.glb',
    'src/festival-mgmt-dropin/models/crate/parachute'+postfix+'.glb',
    new Vector3(8, -10, 8),
    dropToUse.name,
    campaign,
    campaign_key
  )

  let pos = dropzone.getComponent(Transform).position.clone()
  let size = dropzone.getComponent(Transform).scale.clone()

  let xDiff = (size.x / 2)
  let zDiff = (size.z / 2)

  let finalX = Math.random() * xDiff + pos.x
  let finalZ = Math.random() * zDiff + pos.z

  //let finalX = 9
  //let finalY = 10

  // up to 3 minutes
  let _randomDelay = Math.random() * (randomDelayMax !== undefined ? randomDelayMax : 2 * 60)  * 1000
  
  log(METHOD_NAME ,dropToUse.name, "drop in ",_randomDelay)
  utils.setTimeout(_randomDelay, () => {
    crate.drop(new Vector3(finalX, CONFIG.DROPZONE_DROP_HEIGHT, finalZ))
  })
}
