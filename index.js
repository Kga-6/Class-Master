const classesContainer = document.getElementById("classes-container")
const currentDayEl = document.getElementById("current-day")

function setClasses(studentData,schedule){
  let meetClasses = []
  let olderList = []
  let myLunch = studentData.Lunch[schedule.CurrentDay]
  let addedLunch = false

  console.log(myLunch)
  // get the classes the student will meet
  studentData.classes.forEach(myClass => {

    myClass.meeting.forEach(day => {
      if(day === schedule.CurrentDay){

        meetClasses.push(myClass)

      }
    })

  })

  console.log(meetClasses)

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
  olderList.forEach(myClass => {
    const div = document.createElement('div')
    if(myClass.class === "Lunch"){
      div.textContent = `${myClass.class}`
    }else{
      div.textContent = `${myClass.period}pd - ${myClass.class}`
    }
    classesContainer.append(div)
  })
}

const App = async() => {
  let studentData = await fetchStudentData()
  let schedule = await fetchSchedule() 

  currentDayEl.textContent = `${schedule.CurrentDay} Day`

  // This function will set the classes the student will meet 
  setClasses(studentData,schedule)

}

App()

