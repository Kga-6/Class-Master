const scheduleDay = "A"
const scheduleDays = ["A","B","C","D"]

import studentData from './data/students.json' assert { type: 'json' };

const classesContainer = document.getElementById("classes-container")
const studentDataDisplay = document.getElementById("student-Data-Display")

studentDataDisplay.textContent = `Student: ${studentData.name+" "+studentData.lastName} `

console.log(studentData.name, " meets these classes today:")
let meetClasses = []
studentData.classes.forEach(cls => {

  cls.meeting.forEach(day => {
    if(day === scheduleDay){
      console.log(cls.class)
      const li = document.createElement('li')
      li.textContent = cls.class
      meetClasses.push(li)
    }
  })
})

console.log(meetClasses)

meetClasses.forEach(cls => {
  classesContainer.append(cls)
})

