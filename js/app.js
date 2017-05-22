$(document).foundation()

const megaroster = {
  students: [],

  init() {
    this.studentList = document.querySelector('#student-list')
    this.max = 0
    this.setupEventListeners()
    this.load()
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addstudentviaform.bind(this))
  },
  
  load(){
    const rosterString = localStorage.getItem('roster')
    const rosterArray= JSON.parse(rosterString)
    if(rosterArray){
      rosterArray.reverse().map(this.addStudent.bind(this))
    }

  },

  addstudentviaform(ev){
      ev.preventDefault()
      const f = ev.target
      const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }
    f.reset()
    this.addStudent(student)
  },

  addStudent(student) {
    this.students.unshift(student)
    
    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    
    if(student.id>this.max){
      this.max = student.id
    }
    this.save()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    li.querySelector('.student-name').textContent = student.name
    li.setAttribute('title', student.name)
    li.dataset.id = student.id
    if (student.promoted) {
      li.classList.add('promoted')
    }
    this.removeClassName(li, 'template')

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
    li.querySelector('button.success').addEventListener('click', this.promote.bind(this, student))
    li.querySelector('button.secondary').addEventListener('click', this.moveUp.bind(this, student))
    li.querySelector('button.movedown').addEventListener('click', this.moveDown.bind(this, student))
    li.querySelector('button.edit').addEventListener('click', this.edit.bind(this, student))
    li.querySelector('button.save').addEventListener('click', this.saveName.bind(this, student))
    return li
    

  },
  saveName(student, ev){
    const btn = ev.target
    const index = this.students.findIndex((currentStudent, i) => {
      return currentStudent.id === student.id})
    this.students[index].name = btn.closest('.student').textContent.trim()
    this.save()
  },

  edit(student, ev){
    alert("Double click on the name to edit")
    $('span').bind('dblclick',
    function(){
        $(this).attr('contentEditable',true);
    })
    .blur(
        function() {
            $(this).attr('contentEditable', false);
        }
      ) 
  },

  moveDown(student, ev){
    const btn = ev.target
    const orig=btn.closest('.student')
    const swap=orig.nextSibling
    const parent = swap.parentNode

    const index = this.students.findIndex((currentStudent, i) => {
      return currentStudent.id === student.id})

    if(parent.lastChild.previousSibling===swap){
      alert('This is the bottom of the list')
    }

    else{
      parent.insertBefore(swap,orig)
      let a = this.students[index]
      this.students[index] = this.students[index+1]
      this.students[index+1] = a

      this.save()
    }
  },

  moveUp(student, ev){
    const btn = ev.target
    const orig=btn.closest('.student')
    const swap=orig.previousSibling
    const parent = swap.parentNode

    const index = this.students.findIndex((currentStudent, i) => {
      return currentStudent.id === student.id})

    if(swap===null){
      alert('This is the top of the list')
    }

    else{
      parent.insertBefore(orig,swap)
      let a = this.students[index]
      this.students[index] = this.students[index-1]
      this.students[index-1] = a
      this.save()
    }
  },

  promote(student, ev){
    const btn = ev.target
    let li = btn.closest('.student')
      if(btn.closest('.student').style.backgroundColor==='orange'){
        btn.closest('.student').style.backgroundColor='white'
        li.classList.remove('promoted')
        student.promoted=false;
    }
    else{
      btn.closest('.student').style.backgroundColor='orange'
      li.classList.add('promoted')
      student.promoted = true;
    }
    this.save()
  },

  removeStudent(ev) {
    const btn = ev.target
    const li =  btn.closest('.student')
    for (let i=0; i < this.students.length; i++) {
      let currentId = this.students[i].id.toString()
      if (currentId === li.dataset.id) {
        this.students.splice(i, 1)
        break
      }
    }

    li.remove()
    this.save()
  },

  removeClassName(el, className) {
    el.className = el.className.replace(className, '').trim()
  },

  save(){
    localStorage.setItem('roster', JSON.stringify(this.students))
  },
}
megaroster.init()