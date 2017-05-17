
$(document).foundation()

const megaroster = {
    init(){
        this.max=0 //counter for student id
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

        this.buildListItem(student) //even when inside an object, when called by a function "this" refers to the event not the object. adding bind will fix this
        this.max++
    },

    buildListItem(student) {
        console.log(student)

    },
}
megaroster.init()
