import { doc } from 'prettier';
import './style/style.scss';
import Todo from './Todo';
import { setCategoryIcon, checkDueDate, aboutContent } from './utils';

/**************** Variables ****************/

let todoArr = [];

// Elements

const todoAmountSpan = document.querySelector('.info-bar span');

const todoContainer = document.querySelector('.todo-container');
const doneContainer = document.querySelector('.done-container');
const delAllCompleteBtn = document.querySelector('.del-all-complete-btn');

const openInputBtn = document.querySelector('.open-todo-input-btn');
const inputSection = document.querySelector('.input-section');
const closeInputBtn = document.querySelector('.close-input');
const addTodoBtn = document.querySelector('.add-todo-btn');
const resetFormBtn = document.querySelector('.reset-btn');

const todoInput = document.querySelector('#todo-input');
const dateInput = document.querySelector('#todo-date');
const categoryInput = document.querySelector('#todo-category');

const sortingBtn = document.querySelector('.sorting-btn');
const closeSortingBtn = document.querySelector('.close-sorting-btn');
const sortingSection = document.querySelector('.sorting-section');
const sortingRadios = document.querySelectorAll('input[name="sorting-radio-btn"]');

const aboutBtn = document.querySelector('.about-btn');
const closeAboutBtn = document.querySelector('.close-about-btn');
const aboutSection = document.querySelector('.about-section');
const aboutContainer = document.querySelector('.about-section div');

/**************** Functions ****************/

function setEventListeners() {
  openInputBtn.addEventListener('click', openTodoInput);
  closeInputBtn.addEventListener('click', closeTodoInput);
    
  addTodoBtn.addEventListener('click', createTodo);
  resetFormBtn.addEventListener('click', clearForm);

  sortingBtn.addEventListener('click', openSortingMenu);
  closeSortingBtn.addEventListener('click', closeSortingMenu);
  aboutBtn.addEventListener('click', openHelpMenu);
  closeAboutBtn.addEventListener('click', closeHelpMenu);

  delAllCompleteBtn.addEventListener('click', deleteAllCompleted);

  sortingRadios.forEach(element => {
    element.addEventListener('change', sortTodos);
  });
}

function openTodoInput() {
  toggleAddTodo();
  gsap.from(inputSection, {duration: 0.25, opacity: 0});
}

function closeTodoInput() {
  const tl = gsap.timeline();
  tl.to(inputSection, {duration: 0.25, opacity: 0, onComplete: toggleAddTodo})
  tl.to(inputSection, {duration: 0.1, opacity: 1});
}

function toggleAddTodo() {
  inputSection.classList.toggle('input-active');
  clearForm();
}

function clearForm() {
  document.querySelector('.input-section').reset();
  todoInput.classList.remove('placeholder-red');
  todoInput.setAttribute('placeholder', 'Type something to do..');
}

function createTodo() {
  const title = todoInput.value;
  const category = categoryInput.options[categoryInput.selectedIndex].value;
  let dueDate = dateInput.value;
  let timeAdded = new Date().getTime();
  let alreadyExists = false;
  todoArr.forEach(todo => {
    if (title === todo.title) {
      alreadyExists = true;
      return;
    }
  });

  if (title.length < 1) {
    todoInput.setAttribute('placeholder', 'Please add a title');
    todoInput.classList.add('placeholder-red');
  } else if (alreadyExists) {
    clearForm();
    todoInput.setAttribute('placeholder', 'Todo already exists!');
    todoInput.classList.add('placeholder-red');
  } else {
    const todo = new Todo(title, category, dueDate, timeAdded, false);
    todoArr.push(todo);
    closeTodoInput();
    todoInput.setAttribute('placeholder', 'Type something to do..');
    setArrToStorage();
    renderTodos();
  }
}

function setArrToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoArr));
}

/**
 * need to create new objects from localStorage using
 * todo constructor to be able to use methods from Todo.js
 */
function getArrFromStorage() {
  let todoObjects = JSON.parse(localStorage.getItem('todoList'));
  todoArr = [];
  todoObjects.forEach(object => {
    const title = object.title;
    const category = object.category;
    const dueDate = object.dueDate;
    const timeAdded = object.timeAdded;
    const completed = object.completed;
    const todo = new Todo(title, category, dueDate, timeAdded, completed);
    todoArr.push(todo);
  });
}

/**
 *
 * @param {event} e
 * TODO: case insensitive title sort
 */
function sortTodos(e) {
  let selectedRadio = e.target.id;

  switch (selectedRadio) {
    case 'time-radio':
      todoArr.sort((a, b) => {
        return a.timeAdded - b.timeAdded;
      });
      break;

    case 'name-radio':
      todoArr.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      break;

    case 'due-date-radio':
      todoArr.sort((a, b) => {
        if (a.dueDate < b.dueDate) {
          return -1;
        }
        if (a.dueDate > b.dueDate) {
          return 1;
        }
        return 0;
      });
      break;
  }
  setArrToStorage();
  todoFadeoutAnimation();
  closeSortingMenu();
}

function renderTodos() {
  getArrFromStorage();
  let container = '';
  let doneCounter = 0;
  todoContainer.innerHTML = '';
  doneContainer.innerHTML = '';
  todoArr.forEach(todo => {
    let textClass = '';
    if (todo.completed === false) {
      container = todoContainer;
    } else {
      container = doneContainer;
      doneCounter++;
      textClass = ' done-todo';
    }
    const categoryIconName = setCategoryIcon(todo.category);
    const deadlineClass = checkDueDate(todo.dueDate);

    container.innerHTML += `
      <li class="todo" data-id="${todo.title}">
        <div class="left-grid">
          <input type="checkbox" data-id="${todo.title}">
        </div>

        <div class="middle-grid">
          <p class="todo-title${textClass}">${todo.title}</p>
          <div class="date-section${textClass}">
            Due: <span class="${deadlineClass}">${todo.dueDate}</span>
          </div>
        </div>

        <div class="right-grid"> 
          <div class="category-icon-container">
            <span class="material-symbols-outlined">
              ${categoryIconName}
            </span>
          </div>
          <button type="button" class="delete-btn" data-id="${todo.title}"> 
            <span class="material-symbols-outlined">
              delete
            </span>
          </button
        </div>

      </li>
      `;
  });

  setBtnListeners();
  handleCheckboxes();
  renderInfoBar(doneCounter);
}

function setBtnListeners() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteTodo);
  });
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
  let clickedTodo;
  let completedState;

  for (let i = 0; i < todoArr.length; i++) {
    if (clickedTitle === todoArr[i].title) {
      completedState = todoArr[i].completed;
      todoArr[i].toggleComplete();
      clickedTodo = document.querySelector(`.todo[data-id="${clickedTitle}"]`);
    }
  }
  setArrToStorage();
  fadeOutTodo(clickedTodo, completedState);
}

/**
 * 
 * @param {HTML element} el 
 * @param {bool} isCompleted 
 * animates fadeout and position on toggled to do. up or down
 */
function fadeOutTodo(el, isCompleted) {
  const element = el;

  gsap.to(element, {duration: 0.4, opacity: 0});
  if (isCompleted) {
    gsap.to(element, {duration: 0.3, y: -60, delay: 0.2, onComplete: renderTodos});
  }
  else {
    gsap.to(element, {duration: 0.3, y: 60, delay: 0.2, onComplete: renderTodos});
  }
}

function todoFadeoutAnimation() { 
  gsap.to('.todo', {duration: 0.25, stagger: 0.1, opacity: 0, onComplete: renderTodos});
  gsap.to('.todo', {duration: 0.25, stagger: 0.1, x: -10, onComplete: todoFadeinAnimation});
}

function todoFadeinAnimation() {
  gsap.to('.todo', {duration: 0, x: -10, opacity: 0})
  gsap.to('.todo', {duration: 0.25, delay: 0.25, stagger: 0.1, x: 0})
  gsap.to('.todo', {duration: 0.25, delay: 0.25, stagger: 0.1, opacity: 1});
}

/**
 *
 * @param {number} doneCounter
 */
function renderInfoBar(doneCounter) {
  let done = doneCounter;
  todoAmountSpan.innerText = '';
  if (todoArr.length > 0) {
    todoAmountSpan.innerText = `${done} / ${todoArr.length} completed`;
  }
  handleDeleteAllBtn(done);
}

function handleDeleteAllBtn(done) {
  let doneLength = done;
  if (todoArr.length > 0 && todoArr.length === doneLength) {
    delAllCompleteBtn.classList.remove('hidden');
  }
  else if (todoArr.length > 0 && done !== todoArr.length) {
    delAllCompleteBtn.classList.add('hidden');
  }
}

function deleteTodo(e) {
  const clickedBtnTitle = e.currentTarget.dataset.id;
  let indexToDel;

  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].title === clickedBtnTitle) {
      indexToDel = i;
    }
  }
  todoArr.splice(Number(indexToDel), 1);
  setArrToStorage();
  renderTodos();
}

function deleteAllCompleted() {
  while (todoArr.length > 0) {
    todoArr.pop();
  }
  setArrToStorage();
  todoFadeoutAnimation();
  delAllCompleteBtn.classList.toggle('hidden'); // if button is clicked, it does its job and disappears
}

function openSortingMenu() {
  gsap.from(sortingSection, {duration: 0.25, opacity: 0});
  toggleSortingMenu();
}

function closeSortingMenu() {
  const tl = gsap.timeline();
  tl.to(sortingSection, {duration: 0.25, opacity: 0, onComplete: toggleSortingMenu})
  tl.to(sortingSection, {duration: 0.1, opacity: 1});
}

function toggleSortingMenu() {
  sortingSection.classList.toggle('sorting-active');
}

function openHelpMenu() {
  gsap.from(aboutSection, {duration: 0.25, opacity: 0});
  toggleHelpMenu();
}

function closeHelpMenu() {
  const tl = gsap.timeline();
  tl.to(aboutSection, {duration: 0.25, opacity: 0, onComplete: toggleHelpMenu})
  tl.to(aboutSection, {duration: 0.1, opacity: 1});
}

function toggleHelpMenu() {
  aboutSection.classList.toggle('about-active');
  setParagraphContent();
}

function setParagraphContent() {
  if (aboutSection.classList.contains('about-active')) {
    aboutContainer.innerHTML = aboutContent;
  }
  else {
    aboutContainer.innerHTML = '';
  }
}

/**************** Program Flow ****************/

setEventListeners();
renderTodos();