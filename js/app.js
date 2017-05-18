$(document).foundation()

const megaroster = {
  students: [],

  init() {
    this.studentList = document.querySelector('#student-list')
    this.max = 0
    this.setupEventListeners()
    localStorage.setItem('list', document.querySelector('.student').parentNode.childNodes)
    if(performance.navigation.type===1){
      var item = localStorage.getItem('list')
    }
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudent.bind(this))
  },

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }

    this.students.unshift(student)
    
    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    
    this.max ++
    f.reset()

    this.save()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id
    this.removeClassName(li, 'template')

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))
    li.querySelector('button.success').addEventListener('click', this.promote.bind(this))
    li.querySelector('button.secondary').addEventListener('click', this.moveUp.bind(this))
    li.querySelector('button.movedown').addEventListener('click', this.moveDown.bind(this))
    return li
    

  },

  moveDown(ev){
    const btn = ev.target
    const swap=btn.closest('.student').nextSibling
    const orig=btn.closest('.student')
    const parent = btn.closest('.student').parentNode
    if(parent.lastChild.previousSibling===swap){
      alert('This is the bottom of the list')
    }
    else{
      parent.insertBefore(swap,orig)
    }
  },

  moveUp(ev){
    const btn = ev.target
    const swap=btn.closest('.student').previousSibling
    const orig=btn.closest('.student')
    const parent = btn.closest('.student').parentNode
    if(swap===null){
      alert('This is the top of the list')
    }
    else{
      parent.insertBefore(orig,swap)
    }
  },

  promote(ev){
    const btn = ev.target
      if(btn.closest('.student').style.backgroundColor==='orange'){
        btn.closest('.student').style.backgroundColor='white'
    }
    else{
      btn.closest('.student').style.backgroundColor='orange'
    }
  },

  removeStudent(ev) {
    const btn = ev.target
    btn.closest('.student').remove()

    // Remove it from the this.students array
    this.students.splice(megaroster.length, 1)
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