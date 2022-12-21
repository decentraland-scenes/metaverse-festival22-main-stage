//import { showType } from 'src/showMetadata'

//moved to src/modedule/showStatusDisplays.ts

/*
import { ShowType } from '@dcl/show-management'
import { video } from '../videoScreens'

let messageBoard = new Entity()
messageBoard.setParent(video)
export let messageText = new TextShape()
messageBoard.addComponent(messageText)
messageBoard.addComponent(
  new Transform({
    position: new Vector3(0, 0, 0.3),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(0.2, 0.2, 0.2),
  })
)
messageText.visible = false
messageText.fontSize = 5
messageText.font = new Font(Fonts.SanFrancisco_Heavy)
messageText.textWrapping = true
messageText.width = 4
messageText.outlineColor = Color3.Black()
messageText.outlineWidth = 0.2

export function setBoardMessage(text: string) {
  messageText.visible = true
  messageText.value = text
}

export function hideBoard() {
  messageText.visible = false
  messageText.value = ""//undefined
  CountDownTimer.terminate()
}

const currentShowText  = messageText//PLACE HOLDER
export function setArtistName(name?: string) {
  currentShowText.visible = true
  if(name && name !== undefined ){
    currentShowText.value = name
  }else{
    currentShowText.value = ""
  }
}

export function hideArtistName() {
  currentShowText.visible = false
  currentShowText.value = ''
}

// setBoardMessage(
//   'There is another show playing right now at this same time in the acoustic stage'
// )

export function startNextShowCounter(runOfShow: ShowType[]) {
  log('STARTING NEW COUNTER, ', runOfShow)
  let currentTime = Date.now() / 1000
  let nextShow: ShowType = {link: "", artist: "", startTime:0, subs:'', length:0, id:-2, title:""}
  for (let show of runOfShow) {
    log(show.artist, ' STARTS IN ', show.startTime - currentTime)
    if (show.startTime - currentTime > 0) {
      if (nextShow) {
        if (show.startTime - currentTime < nextShow.startTime - currentTime) {
          nextShow = show
        }
      } else {
        nextShow = show
      }
    }
  }

  if (CountDownTimer._instance) {
    CountDownTimer._instance = null
  }

  if (!nextShow) {
    // setBoardMessage(
    //   "That's all for today on this stage. Visit the other stages!"
    // )
    return
  }

  log(
    'IDENTIFIED NEXT SHOW, ',
    nextShow,
    ' STARTING IN ',
    nextShow.startTime - currentTime
  )

  // contdown w nextShow
  CountDownTimer.createAndAddToEngine(nextShow)

  // TODO if last show over "return tomorrow"
}

export class CountDownTimer implements ISystem {
  static _instance: CountDownTimer | null = null
  timeToEvent = 60 * 5
  secondsTimer = 1
  artistName: string = ''
  constructor(show: ShowType) {
    log('SHOW STARTS AT ', show.startTime, ' NOW IS ', Date.now() / 1000)
    this.timeToEvent = show.startTime - Date.now() / 1000
    this.artistName = show.artist
  }

  static createAndAddToEngine(show: ShowType): CountDownTimer {
    if (this._instance == null) {
      this._instance = new CountDownTimer(show)
      engine.addSystem(this._instance)
    }
    return this._instance
  }

  static terminate() {
    if (this._instance) {
      engine.removeSystem(this._instance)
      this._instance = null
    }
  }

  update(dt: number) {
    //   log('in scene')

    if (this.timeToEvent > 0) {
      this.secondsTimer -= dt
      this.timeToEvent -= dt

      if (this.secondsTimer < 0) {
        this.secondsTimer = 1
        let timeAsString = secondsToString(this.timeToEvent)
        setBoardMessage(this.artistName + '\nstarts in just\n' + timeAsString)
      }
    } else {
      log('show about to start!')
      hideBoard()
      //   engine.removeSystem(this)
    }
  }
}

function secondsToString(rawSeconds: number) {
  let seconds = (Math.floor(rawSeconds) % 60).toString()
  let minutes = (Math.floor(rawSeconds / 60) % 60).toString()
  let hours = Math.floor(rawSeconds / 3600).toString()

  if (seconds.length == 1) {
    seconds = '0' + seconds
  }

  if (minutes.length == 1) {
    minutes = '0' + minutes
  }

  return hours + ':' + minutes + ':' + seconds
}
*/