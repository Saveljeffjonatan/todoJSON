const output = document.querySelector('#output');
const addTodo = document.querySelector('#addTodo')
const title = document.querySelector('#title')
const todoText = document.querySelector('#todoText')


const pushTodo = () => {
  if(title && todoText !== '')

  createTodo(title.value, todoText.value)
}

const createTodo = (title, todoText) => {
  let todo = {
    title,
    todoText
  }

  posts.push(todo)
}

//* Fetches my rest api and prints out a list of 10 todo posts.
const listPosts = async () => {
  let url = 'https://jsonplaceholder.typicode.com/posts?_limit=10'

  const res = await fetch(url);
  const posts = await res.json();

  output.innerHTML = '';
  posts.forEach(post => {
    let html = `
    <div class="card my-3">
        <h3>${post.title.slice(0, 20)}</h3>
        <p>${post.body.slice(0, 50)}</p>
    </div>
    `

    output.innerHTML += html;

  })
}

window.addEventListener('DOMContentLoaded', () => {
  listPosts();
})


