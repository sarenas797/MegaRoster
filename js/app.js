
$(document).foundation()

const megaroster={
    init(){
        document
            .querySelector('#new-student')
            .addEventListener('submit', this.addStudent) //using the function, not the value returned from the func
    },

    addStudent(ev){
        ev.preventDefault()
        const studentName = ev.target.studentName.value //it targets the form and value of student name for the user input could replace ev.target with "this"
        console.log(studentName)
    },
}
megaroster.init()
