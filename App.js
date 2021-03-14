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

//? This is the logic of how a new todo is supposed to look like. (The information and parameters that we want to display)
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
    //* This could be done with a .push and have a reverse order on the <li> tags to save RAM. Happy to explain more if asked.
    todos.unshift(newTodo)
    renderTodos();
  })
}

//* Checks the data inputted and sets new css styling on the add button. Also limits the input to not include spaces.
inputBox.onkeyup = () => {
  let userData = inputBox.value //* Getting user entered value
  if(userData.trim() !== '') {
    addBtn.classList.add('active')
  } else {
    addBtn.classList.remove('active')
  }
}

//? This is the logic for creating a new todo.
const createNewTodo = () => {
  createTodo(input.value);
  input.value = ''
  addBtn.classList.remove('active')
}

//? This does as the name suggests, we render our todos to the DOM.
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

  //! If you delete all todos the number will be static at the current number.
  const pendingNumb = document.querySelector('.pendingNumb')
      pendingNumb.textContent = todos.length; //* Shows current pending tasks
  })
}

//* Checks if any of the todo items have the status of "completed: true" then it adds a css class to the clear button.
const checkTodoStatus = () => {
  const hasCompletedTrue = todos.find(({ completed }) => Boolean(completed))
  if(hasCompletedTrue){
    deleteAllBtn.classList.add('active')
  }else {
    deleteAllBtn.classList.remove('active')
  }
}

//* This function finds the ID of the todo item that you press and changes it to the completed status that it currently doesn't have.
const toggleTodo = (id) => {
  const currentTodo = todos.find(item => item.id === id)
  currentTodo.completed = !currentTodo.completed
  renderTodos()
}

//* This function deletes all todos that have the status "completed: true"
const clearTodos = () => {
  const newTodos = todos.filter(({ completed }) => Boolean(!completed))
  todos = newTodos
  renderTodos()
}
