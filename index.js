const scheduleDay = "A"
const scheduleDays = ["A","B","C","D"]

const classesContainer = document.getElementById("classes-container")
const studentDataDisplay = document.getElementById("student-Data-Display")

async function Test(){

  fetch('./data/students.json').then(response => response.json())
    .then(data => {
      console.log(data)

      studentDataDisplay.textContent = `Student: ${data.name+" "+data.lastName} `


      console.log(data.name, " meets these classes today:")
      let meetClasses = []
      data.classes.forEach(cls => {

        cls.meeting.forEach(day => {
          if(day === scheduleDay){
            const li = document.createElement('li')
            li.textContent = cls.class
            meetClasses.push(li)
          }
        })
      })

      meetClasses.forEach(cls => {
        classesContainer.append(cls)
      })


    })

}
Test()

