const classesContainer = document.getElementById("classes-container")
const selectSchoolDay = document.getElementById("select-school-day")

let studentData
let schedule

let selectedWeek
const week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let currentDay = "A"

function setClasses(){
  let meetClasses = []
  let olderList = []
  let myLunch = studentData.Lunch[currentDay]
  let addedLunch = false
  let block = 1

  //Clear the container
  let lastEl = classesContainer.lastElementChild
  while(lastEl){
    classesContainer.removeChild(lastEl)
    lastEl = classesContainer.lastElementChild
  }
  
  // get the classes the student will meet
  studentData.classes.forEach(myClass => {

    myClass.meeting.forEach(day => {
      if(day == currentDay){

        meetClasses.push(myClass)

      }
    })

  })

  // older sort the student classes
  schedule.DaysMeet[currentDay].forEach(index => {
    meetClasses.forEach(myClass => {
      if(myClass.period === index){
         
        if(olderList.length<3){
          olderList.push(myClass)
        }else{
          if(addedLunch === false){
            if(myLunch === "1"){
              olderList.push({
                "class":"Lunch"
              })
              olderList.push(myClass)
              addedLunch = true
            }else if(myLunch === "2"){
              olderList.push(myClass)
              olderList.push({
                "class":"Lunch"
              })
              addedLunch = true
            }
          }else{
            olderList.push(myClass)
          }
        }

      }
    })
  })

  // append classes to the container

  // senior option
  if(studentData.seniorOpt == false || studentData.seniorOpt == "first" ){
    const zeroPeriod = document.createElement('div')
    const zeroName = document.createElement("label")
    const zeroTime = document.createElement("label")
    zeroName.textContent = "Zero Period"
    zeroTime.textContent = `${schedule.BellSchedule.Time.ZeroPeriod.S1[0]}-${schedule.BellSchedule.Time.ZeroPeriod.S2[1]}`
    zeroPeriod.append(zeroName)
    zeroPeriod.append(zeroTime)
    classesContainer.append(zeroPeriod)
    zeroPeriod.classList.add("class")
    zeroPeriod.id = "zeroperiod"
    zeroName.classList.add("class-name")
    zeroTime.classList.add("class-time")

    const homeroom = document.createElement('div')
    const homeName = document.createElement("label")
    const homeTime = document.createElement("label")
    homeName.textContent = "Homeroom"
    homeTime.textContent = `${schedule.BellSchedule.Time.Homeroom[0]}-${schedule.BellSchedule.Time.Homeroom[1]}`
    homeroom.append(homeName)
    homeroom.append(homeTime)
    classesContainer.append(homeroom)
    homeroom.classList.add("class")
    homeroom.id = "homeroom"
    homeName.classList.add("class-name")
    homeTime.classList.add("class-time")
  }


  olderList.forEach(myClass => {
    const div = document.createElement('div')
    const className = document.createElement("label")
    const timeLine = document.createElement("label")
    div.append(className)
    div.append(timeLine)
    div.classList.add("myClass","class")
    className.classList.add("class-name")
    timeLine.classList.add("class-time")

    if(myClass.dropped == true){
      div.classList.add("droppedClass")
    }

    let timeText = ""

    className.textContent = myClass.class


    // Get the class time
    if(myClass.class === "Lunch"){

      div.id = "lunch"
      if(myLunch === "1"){
        timeText = `${schedule.BellSchedule.Time.FirstLunch[0]}-${schedule.BellSchedule.Time.FirstLunch[1]}`
      }else if(myLunch === "2"){
        timeText = `${schedule.BellSchedule.Time.SecondLunch[0]}-${schedule.BellSchedule.Time.SecondLunch[1]}`
      }
      timeLine.textContent = timeText
      //div.textContent = `${myClass.class} | ${timeText}`
      
    }else{

      if(block === 1){
        div.id = "block1"
        timeText = `${schedule.BellSchedule.Time.block1[0]}-${schedule.BellSchedule.Time.block1[1]}`
      }else if(block === 2){
        div.id = "block2"
        timeText = `${schedule.BellSchedule.Time.block2[0]}-${schedule.BellSchedule.Time.block2[1]}`
      }else if(block === 3){
        div.id = "block3"
        timeText = `${schedule.BellSchedule.Time.block3[0]}-${schedule.BellSchedule.Time.block3[1]}`
      }else if(block === 4){
        div.id = "block4"
        if(myLunch === "1"){
          timeText = `${schedule.BellSchedule.Time.BeforeLunch[0]}-${schedule.BellSchedule.Time.BeforeLunch[1]}`
        }else if(myLunch === "2"){
          timeText = `${schedule.BellSchedule.Time.AfterLunch[0]}-${schedule.BellSchedule.Time.AfterLunch[1]}`
        }
      }else if(block === 5){
        div.id = "block5"
        timeText = `${schedule.BellSchedule.Time.block4[0]}-${schedule.BellSchedule.Time.block4[1]}`
      }else if(block === 6){
        div.id = "block6"
        timeText = `${schedule.BellSchedule.Time.block5[0]}-${schedule.BellSchedule.Time.block5[1]}`
      }
      
      //div.textContent = `${myClass.period}pd - ${myClass.class} | ${timeText}`
      timeLine.textContent = timeText

      block += 1
    }

    classesContainer.append(div)
  })

}

// This function is called when school is over [caller: clock.js]
function dismissal(){

}

function weekend(){

}

function updateApp(){

  // This function will set the classes the student will meet 
  setClasses(studentData,schedule)
  startClock(studentData.Lunch[currentDay])

}

const App = async() => {
  studentData = await fetchStudentData()
  schedule = await fetchSchedule() 

  const todayDate = new Date()
  const weekDay = week[todayDate.getDay()]

  if(localStorage.getItem(weekDay)){
    const weekStorage = JSON.parse(localStorage.getItem(weekDay))
    currentDay = weekStorage.Day
    select(weekDay)
  }else{ 
    if(weekDay=="Saturday"||weekDay=="Sunday"){
      unselectAll()
    }else{
      select(weekDay)
    }
    currentDay = "A"
  }

  selectSchoolDay.value = currentDay
  selectedWeek = weekDay

  updateApp()
  selectWeeklock(weekDay) // special highlight for the current week day

  selectSchoolDay.addEventListener('change',function(event){
    currentDay = event.target.value

    if(selectedWeek){
      setStorage(selectedWeek,"Day",event.target.value)
    }

    updateApp()

  })

}

App()

