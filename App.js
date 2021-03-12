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

      listTodos();
      checkTodoStatus();
    })
}
fetchTodos();

const listTodos = () => {
  output.innerHTML = '';
    todos.forEach(post => { //* Lists each array index as a separate post with different styling

/*
  Displays a fullsize box or small box depending on how many characters
  there is + adds styling if the post is already completed or not.
*/
  if(post.completed === true){
    let html =
    `
    <div id=${post.id} ${post.completed} class="post">
    <li><h3 class="textEdit">${post.title.slice(0, 50)}</h3></li>
    <button class="far fa-check-square"></button>
    </div>
    `
    output.innerHTML += html;
  }else{
    let html =
    `
    <div id=${post.id} ${post.completed} class="post">
    <li><h3>${post.title.slice(0, 50)}</h3></li>
    <button class="far fa-square"></button>
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
    console.log(data)

    let newTodo = {
      ...data,
      id: Date.now().toString()
    }
    console.log(newTodo);
    todos.unshift(newTodo);
    listTodos();
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

output.addEventListener('click', e => {
  const checkBox = e.target
  const check = e.target.parentNode.querySelector('h3')

  if(checkBox.classList.contains('fa-square')){
    checkBox.classList.remove('fa-square')
    checkBox.classList.add('fa-check-square')
    check.classList.add('textEdit')
  }else if(checkBox.classList.contains('fa-check-square')){
    checkBox.classList.remove('fa-check-square')
    check.classList.remove('textEdit')
    checkBox.classList.add('fa-square')
  }
})

const checkTodoStatus = () => {
  const hasCompletedTrue = [...output.children].find(item => item.children[1].classList.contains('fa-check-square'))
  if(hasCompletedTrue){
    deleteAllBtn.classList.add('active')
  }else {
    deleteAllBtn.classList.remove('active')
  }
}

addEventListener('click', () => checkTodoStatus())

form.addEventListener('submit', e => {
  e.preventDefault();

  createTodo(input.value);
  form.reset();
  addBtn.classList.remove('active')
})
