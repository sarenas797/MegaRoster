
$(document).foundation()

const megaroster = {
    students: [],

    init(){
        this.max=0 //counter for student id
        this.studentList = document.querySelector('#student-list')
        document
            .querySelector('#new-student')
            .addEventListener('submit', this.addStudent.bind(this)) //using the function, not the value returned from the func
    },

    addStudent(ev) {
        ev.preventDefault()
        const f = ev.target
        const student = {
            id: this.max + 1,
            name: f.studentName.value, //it targets the form and value of student name for the user input. Could replace ev.target with "this"
        }

        this.students.push(student) //adds the new student values into the students array

        const listItem = this.buildListItem(student) //even when inside an object, when called by a function "this" refers to the event not the object. adding bind will fix this
        this.studentList.appendChild(listItem)
        this.max++
        f.reset() //clears field or f.studentName.value = ""
    },

    buildListItem(student) {
        const li = document.createElement('li')
        li.textContent = student.name
        li.dataset.id = student.id //sets the data id of the list element equal to the student id
        return li
    },
}
megaroster.init()
