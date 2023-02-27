const container = document.getElementById("week-container")
const storageTable = {Day:"A",School:true}

function updateDOM(){
  for (const button of container.children) {
    const week = button.id
    const weekStorage = JSON.parse(localStorage.getItem(week))
    const buttonP = document.getElementById(`week-schedule-${week}`)
    buttonP.textContent = weekStorage.Day
  }
}

function storageCheck(){
  if(localStorage.getItem('Monday')==null){
    localStorage.setItem('Monday', JSON.stringify(storageTable) );
  }
  if(localStorage.getItem('Tuesday')==null){
    localStorage.setItem('Tuesday', JSON.stringify(storageTable) );
  }
  if(localStorage.getItem('Wednesday')==null){
    localStorage.setItem('Wednesday', JSON.stringify(storageTable) );
  }
  if(localStorage.getItem('Thursday')==null){
    localStorage.setItem('Thursday', JSON.stringify(storageTable) );
  }
  if(localStorage.getItem('Friday')==null){
    localStorage.setItem('Friday', JSON.stringify(storageTable) );
  }
}

function setStorage(week,type,value){
  if(week=="Saturday"||week=="Sunday"){
    return
  }
  const weekStorage = JSON.parse(localStorage.getItem(week))
  weekStorage[type] = value
  localStorage.setItem(week, JSON.stringify(weekStorage) );
  updateDOM()
}

function unselectAll(){
  for (const button of container.children) {
    button.classList.remove("week-day-selected")
  }
}

function select(week){
  if(week=="Saturday"||week=="Sunday"){
    return
  }
  unselectAll()
  const element = document.getElementById(week)
  element.classList.add("week-day-selected")
}

for (const button of container.children) {

  button.addEventListener("click",function(){
    const week = button.id
    selectedWeek = week

    unselectAll()
    button.classList.add("week-day-selected")

    const weekStorage = JSON.parse(localStorage.getItem(selectedWeek))
    selectSchoolDay.value = weekStorage.Day
    currentDay = weekStorage.Day

    updateApp()
  })

}

storageCheck()
updateDOM()