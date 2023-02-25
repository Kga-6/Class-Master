const classesContainer = document.getElementById("classes-container")
const selectSchoolDay = document.getElementById("select-school-day")

let currentDay = "A"

function setClasses(studentData,schedule){
  let meetClasses = []
  let olderList = []
  let myLunch = studentData.Lunch[schedule.CurrentDay]
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
      if(day == schedule.CurrentDay){

        meetClasses.push(myClass)

      }
    })

  })

  // older sort the student classes
  schedule.DaysMeet[schedule.CurrentDay].forEach(index => {
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

  const zeroPeriod = document.createElement('div')
  zeroPeriod.textContent = `Zero Period | ${schedule.BellSchedule.Time.ZeroPeriod.S1[0]}-${schedule.BellSchedule.Time.ZeroPeriod.S2[1]}`
  classesContainer.append(zeroPeriod)
  zeroPeriod.classList.add("class")
  zeroPeriod.id = "zeroperiod"

  const homeroom = document.createElement('div')
  homeroom.textContent = `Homeroom ${schedule.BellSchedule.Time.Homeroom[0]}-${schedule.BellSchedule.Time.Homeroom[1]}`
  classesContainer.append(homeroom)
  homeroom.classList.add("class")
  homeroom.id = "homeroom"

  olderList.forEach(myClass => {
    const div = document.createElement('div')
    div.classList.add("myClass","class")

    let timeText = ""


    // Get the class time
    if(myClass.class === "Lunch"){

      div.id = "lunch"
      if(myLunch === "1"){
        timeText = `${schedule.BellSchedule.Time.FirstLunch[0]}-${schedule.BellSchedule.Time.FirstLunch[1]}`
      }else if(myLunch === "2"){
        timeText = `${schedule.BellSchedule.Time.SecondLunch[0]}-${schedule.BellSchedule.Time.SecondLunch[1]}`
      }
      div.textContent = `${myClass.class} | ${timeText}`
      
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
      
      div.textContent = `${myClass.period}pd - ${myClass.class} | ${timeText}`

      block += 1
    }

    classesContainer.append(div)
  })

}

// This function is called when school is over [caller: clock.js]
function dismissal(){
  console.log("School is over!")
}

const App = async() => {
  let studentData = await fetchStudentData()
  let schedule = await fetchSchedule() 

  selectSchoolDay.value = schedule.CurrentDay

  // This function will set the classes the student will meet 
  setClasses(studentData,schedule)
  startClock(studentData.Lunch[schedule.CurrentDay])

  selectSchoolDay.addEventListener("change",function(event){
    schedule.CurrentDay = event.target.value

    // This function will set the classes the student will meet 
    setClasses(studentData,schedule)
    startClock(studentData.Lunch[schedule.CurrentDay])

  })

}

App()

