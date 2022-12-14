import { doc } from 'prettier';
import './style/style.scss';

// Variables

// Elements

const todoSection = document.querySelector('.todo-section');
const inputContainer = document.querySelector('.input-section');
const closeInputBtn = document.querySelector('.close-input');
const addTodoBtn = document.querySelector('.open-add-todo-btn');
const sortingBtn = document.querySelector('.sorting-icon');
const helpBtn = document.querySelector('.help-icon');

// Functions

function setEventListeners() {
  addTodoBtn.addEventListener('click', toggleAddTodo);
  closeInputBtn.addEventListener('click', toggleAddTodo)
  sortingBtn.addEventListener('click', openSortingMenu);
  helpBtn.addEventListener('click', openHelp);
}

function toggleAddTodo() {
  inputContainer.classList.toggle('input-active');
}

/**
 * testar layout med 8 exempel-todos
 */
function addExampleTodos() {
  todoSection.innerHTML = `
  <h2>
    To do:
  </h2>
  `;

  for (let i = 0; i < 8; i++) {
    todoSection.innerHTML += `
    <div class="todo">
    <div class="left-grid">
      <input type="checkbox">
    </div>
    <div class="middle-grid">
      <p>Gör en todo-app</p>
      <div class="date-section">Datum</div>
    </div>
    <div class="right-grid">
      <div class="icon1">1</div>
      <div class="icon2">2</div>
    </div>
    `;
  }
}

function openSortingMenu() {
  alert('sortera här');
}

function openHelp() {
  alert('I need help asap');
}

// Program Flow
setEventListeners();
addExampleTodos();