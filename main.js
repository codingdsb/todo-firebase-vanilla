import './style.css'
import {
  initializeAppWithFirebase,
  getFirestoreDB,
  getAllTodos,
  deleteTodo,
  addTodo,
} from './firebase'

const todolist = document.getElementById('todo-list')

const firebaseApp = initializeAppWithFirebase()
const firestoreDB = getFirestoreDB(firebaseApp)

let todos = await getAllTodos(firestoreDB)

let deleteBtn

// sort based on timestamp
todos.sort((a, b) => {
  return new Date(b.currentTimestamp) - new Date(a.currentTimestamp)
})


// render all the todos
todos.forEach((todo, idx) => {
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo-item')
  const innerSection = document.createElement('section')
  todoDiv.appendChild(innerSection)

  const todoNumber = document.createElement('span')
  todoNumber.classList.add('todo-number')
  todoNumber.textContent = idx + 1
  innerSection.appendChild(todoNumber)

  const todoTask = document.createElement('span')
  todoTask.classList.add('todo-task')
  todoTask.textContent = todo.task
  innerSection.appendChild(todoTask)

  deleteBtn = document.createElement('button')
  deleteBtn.classList.add('todo-delete')
  deleteBtn.id = todo.id
  // add delete icon
  deleteBtn.textContent = 'Delete'
  deleteBtn.addEventListener('click', async () => {
    // make delete spinner display inline-block
    document.getElementById('spinner').style.display = 'inline-block'

    await deleteTodo(firestoreDB, todo.id)
    window.location.reload()
  })

  todoDiv.appendChild(deleteBtn)
  todolist.appendChild(todoDiv)
})
document.getElementById('spinner').style.display = 'none'

// when the add todo button is clicked
const addTodoBtn = document.getElementById('add-todo')
addTodoBtn.addEventListener('click', async () => {
  // make delete spinner display inline-block
  document.getElementById('spinner').style.display = 'inline-block'

  const newTodo = document.getElementById('input').value
  await addTodo(firestoreDB, newTodo)
  window.location.reload()
})
