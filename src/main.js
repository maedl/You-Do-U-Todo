import { doc } from 'prettier';
import './style/style.scss';
import Todo from './Todo';
import { addExampleTodos } from './utils';

/**************** Variables ****************/

let todoArr = [];
let doneArr = [];

// Elements

const todoSection = document.querySelector('.todo-section');
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
  let todo = new Todo(todoInput.value, category, dateInput.value);
  todoArr.push(todo);
  console.log(todoArr);
  console.log('hej');
  // TODO: create render function
}

function clearForm() {

}

function openSortingMenu() {
  alert('sortera här');
}

function openHelp() {
  alert('I need help asap');
}

/**************** Program Flow ****************/

setEventListeners();
// addExampleTodos(todoSection);  // TODO: change this to add objects to array instead

const rightNow = new Date();
const todo = new Todo('Handla', 'Activity', rightNow);

console.log(todo);
