const form = document.querySelector('#todoForm');
const output = document.querySelector('#todoList');
const inputBox = document.querySelector('.inputField input')
const input = document.querySelector('#todoInput')
const addBtn = document.querySelector('.inputField button')
const deleteAllBtn = document.querySelector('.footer button')

let todos = [];

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => res.json())
    .then(data => {
      todos = data;

      renderTodos();
      checkTodoStatus();
    })
}
fetchTodos();

const renderTodos = () => {
  output.innerHTML = '';
  todos.forEach(post => { //* Lists each array index as a separate post with different styling


  if(post.completed === true){
    let html =
    `
    <div id=${post.id} ${post.completed} class="post">
    <li><h3 class="textEdit">${post.title.slice(0, 50)}</h3></li>
    <button onclick="toggleTodo(${post.id})" class="far fa-check-square"></button>
    </div>
    `
    output.innerHTML += html;
  }else{
    let html =
    `
    <div id=${post.id} ${post.completed} class="post">
    <li><h3>${post.title.slice(0, 50)}</h3></li>
    <button onclick="toggleTodo(${post.id})" class="far fa-square"></button>
    </div>
    `
    output.innerHTML += html;
  }

  const pendingNumb = document.querySelector('.pendingNumb')
    pendingNumb.textContent = todos.length; //* Shows current pending tasks
  })
}

const createTodo = (title) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    const newTodo = {
      ...data,
      id: todos.length + 1
    }
    todos.unshift(newTodo)
    renderTodos();
  })
}

inputBox.onkeyup = () => {
  let userData = inputBox.value //* Getting user entered value
  if(userData.trim() !== '') {
    addBtn.classList.add('active') //* Will activate add button
  } else {
    addBtn.classList.remove('active') //* Will deactivate add button
  }
}

/* This function finds the ID of the todo item and changes it
to the completed status that it currently doesn't have. */
const toggleTodo = (id) => {
  const currentTodo = todos.find(item => item.id === id)
  currentTodo.completed = !currentTodo.completed
  renderTodos()
}

const clearTodos = () => {
  const newTodos = todos.filter(({ completed }) => Boolean(!completed))
  todos = newTodos
  renderTodos()
}

const checkTodoStatus = () => {
  const hasCompletedTrue = todos.find(({completed}) => Boolean(completed))
  if(hasCompletedTrue){
    deleteAllBtn.classList.add('active')
  }else {
    deleteAllBtn.classList.remove('active')
  }
}

const createNewTodo = () => {
    createTodo(input.value);
    input.value = ''
    addBtn.classList.remove('active')
}
