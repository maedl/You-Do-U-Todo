import { doc } from 'prettier';
import './style/style.scss';

// Variables

// Elements

const todoContainer = document.querySelector('.todo-container');
const addTodoBtn = document.querySelector('.add-todo');
const sortingBtn = document.querySelector('.sorting-icon');
const helpBtn = document.querySelector('.help-icon');

// Functions

function setEventListeners() {
  addTodoBtn.addEventListener('click', openAddTodo);
  sortingBtn.addEventListener('click', openSortingMenu);
  helpBtn.addEventListener('click', openHelp);
}

/**
 * testar layout med 8 exempel-todos
 */
function openAddTodo() {
  todoContainer.innerHTML = `
  <h2>
    To do:
  </h2>
  `;

  for (let i = 0; i < 8; i++) {
    todoContainer.innerHTML += `
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
