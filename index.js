const classesContainer = document.getElementById("classes-container")
const studentDataDisplay = document.getElementById("student-Data-Display")

const fetchStudentData = async () => {
  const studentData = await fetch('./data/students.json')
  const studentDataJSON = await studentData.json()
  return studentDataJSON
}

const fetchSchedule = async () => {
  const schedule = await fetch('./data/schedule.json')
  const scheduleJSON = await schedule.json()
  return scheduleJSON
}

const App = async() => {
  let studentData = await fetchStudentData()
  let schedule = await fetchSchedule() 

  console.log(studentData,schedule)

  studentDataDisplay.textContent = `Student: ${studentData.name+" "+studentData.lastName} `

  console.log(studentData.name, " meets these classes today:")
  let meetClasses = []
  studentData.classes.forEach(cls => {

    cls.meeting.forEach(day => {
      if(day === schedule.CurrentDay){
        const li = document.createElement('li')
        li.textContent = cls.class
        meetClasses.push(li)
      }
    })
  })

  meetClasses.forEach(cls => {
    classesContainer.append(cls)
  })

}

App()

