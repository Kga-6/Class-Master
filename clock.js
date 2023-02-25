const timerEl = document.getElementById("timer")
let countdown
let isSchoolOver = false

const timeChain = {

  test:new Date().setHours(24,33,0),
  test1:new Date().setHours(24,34,0),
  test2:new Date().setHours(24,35,0),
  test3:new Date().setHours(24,36,0),

  warning:new Date().setHours(7,35,0),
  zeroPeriod:new Date().setHours(8,35,0),
  homeroom:new Date().setHours(8,48,0),

  block1:new Date().setHours(9,40,0),
  block2:new Date().setHours(10,32,0),
  block3:new Date().setHours(11,24,0),

  lunch1:new Date().setHours(11,48,0),
  lunchB:new Date().setHours(12,40,0),

  lunch2:new Date().setHours(12,16,0),
  lunchA:new Date().setHours(12,40,0),

  block5:new Date().setHours(13,32,0),

  dismissal:new Date().setHours(14,24,0),
}

function formtTime(time){
  return time<10 ? "0"+time : time
}

function currentClass(classname){
  const classEl = document.getElementById(classname)
  classEl.classList.add("currentClass")

  // add a new className to the classes that are over for styling
  const classEls = document.getElementsByClassName("class")
  for(i=0;i<classEls.length;i++){
    const indexClass = classEls[i]

    if(classEls[i].id === classname){
      break
    }else{
      indexClass.classList.add("classOver")
    }
  }

}

function mainFunction(myLunch){

  let myTime = new Date().getTime()
  let timeleft

  if(timeChain.warning-myTime >= 0){
    console.log("warning bell")
    timeleft = timeChain.warning - myTime;
  }else if(timeChain.zeroPeriod-myTime >= 0){
    console.log("zeroPeriod bell")
    timeleft = timeChain.zeroPeriod - myTime;
    currentClass("zeroperiod")
  }else if(timeChain.homeroom-myTime >= 0){
    timeleft = timeChain.homeroom - myTime;
    currentClass("homeroom")
  }else if(timeChain.block1-myTime >= 0){
    timeleft = timeChain.block1 - myTime;
    currentClass("block1")
  }else if(timeChain.block2-myTime >= 0){
    timeleft = timeChain.block2 - myTime;
    currentClass("block2")
  }else if(timeChain.block3-myTime >= 0){
    timeleft = timeChain.block3 - myTime;
    currentClass("block3")
  }else if(myLunch==="1"){

    if(timeChain.lunch1-myTime >= 0){
      timeleft = timeChain.lunch1 - myTime;
      currentClass("lunch")
    }else if(timeChain.lunchB-myTime >= 0){
      timeleft = timeChain.lunchB - myTime;
      currentClass("block4")
    }else if(timeChain.block5-myTime >= 0){
      timeleft = timeChain.block5 - myTime;
      currentClass("block5")
    }else if(timeChain.dismissal-myTime >= 0){
      timeleft = timeChain.dismissal - myTime;
      currentClass("block6")
    }else{
      isSchoolOver = true
      clearInterval(countdown)
    }

  }else if(myLunch==="2"){

    if(timeChain.lunchA-myTime >= 0){
      timeleft = timeChain.lunchA - myTime;
      currentClass("lunch")
    }else if(timeChain.lunch2-myTime >= 0){
      timeleft = timeChain.lunch2 - myTime;
      currentClass("block4")
    }else if(timeChain.block5-myTime >= 0){
      timeleft = timeChain.block5 - myTime;
      currentClass("block5")
    }else if(timeChain.dismissal-myTime >= 0){
      timeleft = timeChain.dismissal - myTime;
      currentClass("block6")
    }else{
      isSchoolOver = true
      clearInterval(countdown)
    }

  }else if(myLunch==="test"){

    if(timeChain.test-myTime >= 0){
      timeleft = timeChain.test - myTime;
    }else if(timeChain.test1-myTime >= 0){
      timeleft = timeChain.test1 - myTime;
      currentClass("block4")
    }else if(timeChain.test2-myTime >= 0){
      timeleft = timeChain.test2 - myTime;
      currentClass("block5")
    }else if(timeChain.test3-myTime >= 0){
      timeleft = timeChain.test3 - myTime;
      currentClass("block6")
    }else{
      isSchoolOver = true
      clearInterval(countdown)
    }

  }

  // Calculating the days, hours, minutes and seconds left
  const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if(hours<=0){
    timerEl.textContent = `${formtTime(minutes)}:${formtTime(seconds)}`
  }else{
    timerEl.textContent = `${formtTime(hours)}:${formtTime(minutes)}:${formtTime(seconds)}`
  }

  if(isSchoolOver===true){
    timerEl.textContent = "Dismissal"
    dismissal()
  }

}

function startClock(myLunch){
  isSchoolOver = false

  if(countdown){
    clearInterval(countdown)
  }

  countdown = setInterval(function(){
    mainFunction(myLunch)
  },1000)

  // make the first call instead of waiting 1000
  mainFunction(myLunch)

}

