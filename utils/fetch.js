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

const fetchPublicData = async () => {
  const schedule = await fetch('./data/classPublicData.json')
  const scheduleJSON = await schedule.json()
  return scheduleJSON
}