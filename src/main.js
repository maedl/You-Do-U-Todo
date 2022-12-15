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
const helpBtn = document.querySelector('.help-icon');

/**************** Functions ****************/

function setEventListeners() {
  openAddBtn.addEventListener('click', toggleAddTodo);
  closeInputBtn.addEventListener('click', toggleAddTodo);
  sortingBtn.addEventListener('click', openSortingMenu);
  helpBtn.addEventListener('click', openHelp);
  addTodoBtn.addEventListener('click', createTodo);
}
function toggleAddTodo() {
  inputContainer.classList.toggle('input-active');
}

function createTodo() {
  let category = categoryInput.options[categoryInput.selectedIndex].text;
  let todo = new Todo(todoInput.value, category, dateInput.value, false);
  todoArr.push(todo);
  clearForm();
  renderTodos();
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
      <div class="todo">
      <div class="left-grid">
        <input type="checkbox">
      </div>
      <div class="middle-grid">
        <p>${todo.title}</p>
        <div class="date-section">Datum</div>
      </div>
      <div class="right-grid">
        <div class="icon1">1</div>
        <div class="icon2">2</div>
      </div>
      `;
  });

  document.querySelectorAll('.done-container .todo .left-grid input').forEach(element => {
    element.setAttribute('checked', '');
  });
}

function clearForm() {
  document.querySelector('.input-section').reset();
}

function openSortingMenu() {
  addExampleTodos();
  console.log(todoArr);
}

function openHelp() {
  alert('I need help asap');
}

function addExampleTodos(array) {
  for (let i = 0; i < 4; i++) {
    let todo = new Todo('todoInput.value', 'category', 'dateInput.value', false);
    todoArr.push(todo);
  }
  for (let i = 0; i < 4; i++) {
    let todo = new Todo('todoInput.value', 'category', 'dateInput.value', true);
    todoArr.push(todo);
  }
  renderTodos();
}
/**************** Program Flow ****************/

setEventListeners();
