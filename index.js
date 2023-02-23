const classesContainer = document.getElementById("classes-container")
const currentDayEl = document.getElementById("current-day")

function setClasses(studentData,schedule){
  let meetClasses = []
  let olderList = []

  // get the classes the student will meet
  studentData.classes.forEach(myClass => {

    myClass.meeting.forEach(day => {
      if(day === schedule.CurrentDay){
        meetClasses.push(myClass)
      }
    })

  })

  // older sort the student classes
  schedule.DaysMeet[schedule.CurrentDay].forEach(index => {
    meetClasses.forEach(myClass => {
      if(myClass.period === index){
        olderList.push(myClass)
      }
    })
  })

  // append classes to the container
  olderList.forEach(myClass => {
    const div = document.createElement('div')
    div.textContent = `${myClass.period}pd - ${myClass.class}`
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

