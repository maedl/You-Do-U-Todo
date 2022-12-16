import { doc } from 'prettier';
import './style/style.scss';
import Todo from './Todo';

/**************** Variables ****************/

let todoArr = [];

// Elements

const todoContainer = document.querySelector('.todo-container');
const doneContainer = document.querySelector('.done-container');
const openAddBtn = document.querySelector('.open-add-todo-btn');
const inputContainer = document.querySelector('.input-section');
const closeInputBtn = document.querySelector('.close-input');
const addTodoBtn = document.querySelector('.add-todo-item');

const todoInput = document.querySelector('#todo-input');
const dateInput = document.querySelector('#todo-date');
const categoryInput = document.querySelector('#todo-category');

const sortingBtn = document.querySelector('.sorting-icon');
const settingsBtn = document.querySelector('.settings-icon');

/**************** Functions ****************/

function setEventListeners() {
  openAddBtn.addEventListener('click', toggleAddTodo);
  closeInputBtn.addEventListener('click', toggleAddTodo);
  sortingBtn.addEventListener('click', openSortingMenu);
  settingsBtn.addEventListener('click', openSettings);
  addTodoBtn.addEventListener('click', createTodo);
}
function toggleAddTodo() {
  inputContainer.classList.toggle('input-active');
  clearForm();
}

function createTodo() {
  const title = todoInput.value;
  const category = categoryInput.options[categoryInput.selectedIndex].text;
  let dueDate = dateInput.value;
  let indexExists = false;
  todoArr.forEach(todo => {
    if (title === todo.title) {
      indexExists = true;
    }
  })
 
  if (title.length < 1) {
    todoInput.setAttribute('placeholder', 'Please add a title');
    console.log('här');
  }
  else if (indexExists) {
    clearForm();
    todoInput.setAttribute('placeholder', 'Todo already exists!');
  }
  else {
    const todo = new Todo(title, category, dueDate, false);
    todoArr.push(todo);
    clearForm();
    renderTodos();
  }
}

function renderTodos() {
  let container = '';
  todoContainer.innerHTML = '';
  doneContainer.innerHTML = '';
  todoArr.forEach(todo => {
    if (todo.completed === false) {
      container = todoContainer;
    } else {
      container = doneContainer;
    }

    container.innerHTML += `
      <li class="todo">
      <div class="left-grid">
        <input type="checkbox" data-id="${todo.title}">
      </div>
      <div class="middle-grid">
        <p>${todo.title}</p>
        <div class="date-section">Due: ${todo.dueDate}</div>
      </div>
      <div class="right-grid">
        <div class="icon1">1</div>
        <button type="button" class="delete-icon"> 
          <span class="material-symbols-outlined">
          delete
          </span>
        </button
      </li>
      `;
  });

  handleCheckboxes();
  // renderInfoBar();
}

function handleCheckboxes(e) {
  const todoCheckboxes = document.querySelectorAll('input[type=checkbox]');
  const doneTodos = document.querySelectorAll('.done-container .todo .left-grid input');

  todoCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', manageCompleteStatus);
  });

  doneTodos.forEach(element => {
    element.setAttribute('checked', '');
  });
}

function manageCompleteStatus(e) {
  const clickedTitle = e.target.dataset.id;

  for (let i = 0; i < todoArr.length; i++) {
    if (clickedTitle === todoArr[i].title) {
      todoArr[i].toggleComplete();
    }
  }
  renderTodos();
}

function clearForm() {
  document.querySelector('.input-section').reset();
}

function openSortingMenu() {
  addExampleTodos();
  console.log(todoArr);
}

function openSettings() {
  alert('I am a settings menu');
}

/**************** Program Flow ****************/

setEventListeners();