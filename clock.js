const timerEl = document.getElementById("timer")
let countdown
let isSchoolOver = false

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const timeChain = {

  warning:new Date().setHours(7,35,0),
  zeroPeriod:new Date().setHours(8,35,0),
  homeroom:new Date().setHours(8,48,0),

  block1:new Date().setHours(9,40,0),
  block2:new Date().setHours(10,32,0),
  block3:new Date().setHours(11,24,0),

  // BLOCK 4

    // Second Lunch
    lunch2:new Date().setHours(12,40,0),
    lunchA:new Date().setHours(12,16,0),

    // First Lunch
    lunch1:new Date().setHours(11,48,0),
    lunchB:new Date().setHours(12,40,0),

  //

  block5:new Date().setHours(13,32,0),
  dismissal:new Date().setHours(14,24,0),
}

function formtTime(time){
  return time<10 ? "0"+time : time
}

function currentClass(classname){
  const classEl = document.getElementById(classname)
  if(!classEl) return;

  // add a new className to the classes that are over for styling
  for(const child of classesContainer.children){
    child.classList.remove("currentClass")
    if(child.id === classname){
      break
    }else{
      child.classList.add("classOver")
    }
  }

  classEl.classList.add("currentClass")

}

function mainFunction(myLunch){

  let myDate = new Date()
  let myTime = myDate.getTime()
  let timeleft

  if(weekday[myDate.getDay()] == "Sunday" || weekday[myDate.getDay()] == "Saturday"){
    timerEl.textContent = "No school today"
    weekend()
    return
  }

  if(studentData.seniorOpt == false || studentData.seniorOpt == "first" ){

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
        currentClass("block4")
      }else if(timeChain.lunch2-myTime >= 0){
        timeleft = timeChain.lunch2 - myTime;
        currentClass("lunch")
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
    }

  }else{
    if(myLunch==="1"){
  
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
        currentClass("block4")
      }else if(timeChain.lunch2-myTime >= 0){
        timeleft = timeChain.lunch2 - myTime;
        currentClass("lunch")
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

