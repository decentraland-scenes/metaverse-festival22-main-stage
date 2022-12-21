
//// RANDOMIZER

import { REGISTRY } from "../registry"

export function actionRandomizer(animations: string[], beats = 8) {
    ActionRandomizerSystem.createAndAddToEngine()
    ActionRandomizerSystem._instance.events = animations
    ActionRandomizerSystem._instance.start()
  }
  
export class ActionRandomizerSystem implements ISystem {
    static _instance: ActionRandomizerSystem | null = null
  
    timer: number = 0
    beats: number = 8
    events: string[]
    lastPlayed: number | null = null
    stopAllActionName = 'STOPALL'//if need to change it
    pauseAllActionName = 'PAUSEALL'//if need to change it
  
    active: boolean = false
  
    static createAndAddToEngine(): ActionRandomizerSystem {
      if (this._instance == null) {
        this._instance = new ActionRandomizerSystem()
        engine.addSystem(this._instance)
      }
      return this._instance
    }
  
    private constructor() {
      ActionRandomizerSystem._instance = this
    }
  
    update(dt: number) {
      if (!this.active) return
  
      this.timer += dt
      if (this.timer > (REGISTRY.SHOW_MGR.actionMgr.bpm / 60) * this.beats) {
        this.timer = 0
        this.playRandomAction()
      }
    }
    start() {
      this.active = true
      this.timer = 0
      this.playRandomAction()
    }
    playRandomAction() {
      if(this.events && this.events.length > 0){
        let randomIndex = Math.floor(Math.random() * this.events.length)
        // log('New random animation ', randomIndex, this.events[randomIndex])
        if (this.lastPlayed && this.lastPlayed == randomIndex) {
          return
        } else if (this.lastPlayed) {
          REGISTRY.SHOW_MGR.runAction(this.pauseAllActionName)
        }
        REGISTRY.SHOW_MGR.runAction(this.events[randomIndex])
        this.lastPlayed = randomIndex
      }else{
        log("playRandomAction","no events to play")
      }
    }
    stop() {
      this.active = false
      if (this.lastPlayed) {
        REGISTRY.SHOW_MGR.runAction(this.stopAllActionName)
      }
    }
    reset() {
      if (this.active) {
        this.timer = 0
        if (this.lastPlayed) {
          // make sure any looping animations go with the new BPM
          REGISTRY.SHOW_MGR.runAction(this.events[this.lastPlayed])
        }
      }
    }
}
  