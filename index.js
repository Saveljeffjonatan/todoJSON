const inputBox = document.querySelector('.inputField input')
const addBtn = document.querySelector('.inputField button')
const todoList = document.querySelector('.todoList')
const deleteAllBtn = document.querySelector('.footer button')

inputBox.onkeyup = () => {
  let userData= inputBox.value //* Getting user entered value

  if(userData.trim() !== '') {
    addBtn.classList.add('active') //* Will activate add button
  } else {
    addBtn.classList.remove('active') //* Will deactivate add button
  }
}
showTasks(); //* Calling the showTasks function

addBtn.onclick = () => {
  let userData = inputBox.value //* Getting user entered value
  let getLocalStorage = localStorage.getItem("New Todo");

  if(getLocalStorage == null){
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  listArr.unshift(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));

  showTasks(); //* Calling the showTasks function
}

//* This function adds a li tag inside the ul tag
function showTasks(){
  let getLocalStorage = localStorage.getItem("New Todo");

  if(getLocalStorage == null){
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  const pendingNumb = document.querySelector('.pendingNumb')
  pendingNumb.textContent = listArr.length; //* Shows current pending tasks

  if(listArr.length > 0){
    deleteAllBtn.classList.add('active');
  } else {
    deleteAllBtn.classList.remove('active');
  }

  let newLiTag = '';
  listArr.forEach((element) => {
    newLiTag += `<li>${element}<span onClick="deleteTask()"><i class="fas fa-trash"></i></li>`
  });

  todoList.innerHTML = newLiTag; //* Adds a new li tag to the todo app
  inputBox.value = ''; //* Resets the inputbox after successful add
}

//* This function deletes the selected task
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);

  listArr.splice(index, 1)

  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks(); //* Calling the showTasks function
}

//* Deletes the whole array on button click
deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks(); //* Calling the showTasks function
}
