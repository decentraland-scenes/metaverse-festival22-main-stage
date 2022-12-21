

@Component("AngleRotate")
export class AngleRotate { 
  speedRotation:number = 1  
  fraction:number = 0
  startRotation:Quaternion
  endRotation:Quaternion


  constructor(_startRotation:Quaternion, _endRotation:Quaternion, _speed:number){
      this.speedRotation = _speed            
      this.startRotation = _startRotation
      this.endRotation = _endRotation
  }
}

@Component("PulseTransform")
export class PulseTransform { 
  speedRotation:number = 1  
  fraction:number = 0
  startRotation:Quaternion
  endRotation:Quaternion


  constructor(_startRotation:Quaternion, _endRotation:Quaternion, _speed:number){
      this.speedRotation = _speed            
      this.startRotation = _startRotation
      this.endRotation = _endRotation
  }
}

@Component("Oscillate")
export class Oscillate { 
  speed:number = 1  
  fraction:number = 0
  startRotation:Quaternion
  endRotation:Quaternion
  delay:number


  constructor(_startRotation:Quaternion, _endRotation:Quaternion, _speed:number, _delay:number){
      this.speed = _speed            
      this.startRotation = _startRotation
      this.endRotation = _endRotation
      this.delay = _delay
  }
}

export class AnimatorSys {

   
    angleRotateGroup = engine.getComponentGroup(AngleRotate, Transform)

    oscillateGroup = engine.getComponentGroup(Oscillate, Transform)

    elapsedTime:number = 0

    update(dt:number){
        
        //angle rotate objects
        for(let obj of this.angleRotateGroup.entities){
            let angleInfo = obj.getComponent(AngleRotate)
            let transform = obj.getComponent(Transform)

            angleInfo.fraction += angleInfo.speedRotation*dt
            transform.rotation = Quaternion.Slerp(angleInfo.startRotation, angleInfo.endRotation, angleInfo.fraction)

            

            if(angleInfo.fraction >= 1){
                angleInfo.fraction -= 1  
                transform.rotation = angleInfo.startRotation              
            }

            
        }

        //oscillate objects
        for(let obj of this.oscillateGroup.entities){
            let oscInfo = obj.getComponent(Oscillate)
            let transform = obj.getComponent(Transform)

            this.elapsedTime += oscInfo.speed * dt
            oscInfo.fraction = Math.sin(this.elapsedTime + oscInfo.delay)
            //oscInfo.fraction = oscInfo.speedRotation*dt
            transform.rotation = Quaternion.Slerp(oscInfo.startRotation, oscInfo.endRotation, oscInfo.fraction)                

            
        }


    }
}

