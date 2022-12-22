import { doc } from 'prettier';
import './style/style.scss';
import Todo from './Todo';
import { setCategoryIcon } from './utils';

/**************** Variables ****************/

let todoArr = [];

// Elements

const todoAmountSpan = document.querySelector('.info-bar span');

const doneSection = document.querySelector('.done-section');
const todoContainer = document.querySelector('.todo-container');
const doneContainer = document.querySelector('.done-container');
const delAllCompleteBtn = document.querySelector('.del-all-complete-btn');

const openAddBtn = document.querySelector('.open-todo-input-btn');
const inputSection = document.querySelector('.input-section');
const closeInputBtn = document.querySelector('.close-input');
const addTodoBtn = document.querySelector('.add-todo-btn');

const todoInput = document.querySelector('#todo-input');
const dateInput = document.querySelector('#todo-date');
const categoryInput = document.querySelector('#todo-category');

const sortingBtn = document.querySelector('.sorting-icon');
const closeSortingBtn = document.querySelector('.close-sorting-btn');
const sortingSection = document.querySelector('.sorting-section');
const sortingRadios = document.querySelectorAll('input[name="sorting-radio-btn"]');

const settingsBtn = document.querySelector('.settings-icon');

/**************** Functions ****************/

function setEventListeners() {
  openAddBtn.addEventListener('click', toggleAddTodo);
  delAllCompleteBtn.addEventListener('click', deleteAllCompleted);
  closeInputBtn.addEventListener('click', toggleAddTodo);
  sortingBtn.addEventListener('click', toggleSortingMenu);
  closeSortingBtn.addEventListener('click', toggleSortingMenu);
  settingsBtn.addEventListener('click', openSettings);
  addTodoBtn.addEventListener('click', createTodo);
  

  sortingRadios.forEach(element => {
    element.addEventListener('change', sortTodos);
  });
}
function toggleAddTodo() {
  inputSection.classList.toggle('input-active');
  clearForm();
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
    }
  });

  if (title.length < 1) {
    todoInput.setAttribute('placeholder', 'Please add a title');
  } else if (alreadyExists) {
    clearForm();
    todoInput.setAttribute('placeholder', 'Todo already exists!');
  } else {
    const todo = new Todo(title, category, dueDate, timeAdded, false);
    todoArr.push(todo);
    toggleAddTodo();
    todoInput.setAttribute('placeholder', 'Type something to do..');
    renderTodos();
  }
}

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

  renderTodos();
  toggleSortingMenu();
}

function renderTodos() {
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
    console.log(deadlineClass);

    container.innerHTML += `
      <li class="todo${deadlineClass}">
        <div class="left-grid">
          <input type="checkbox" data-id="${todo.title}">
        </div>

        <div class="middle-grid">
          <p class="todo-title${textClass}">${todo.title}</p>
          <div class="date-section${textClass}">
            Due: <span>${todo.dueDate}</span>
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

function checkDueDate(todoDueDate) {
  const today = new Date();
  let yesterday = newDateObject(today, -1);
  const dueDate = new Date(todoDueDate);
  // const duePlus5 = newDateObject(dueDate, 5);

  if (yesterday > dueDate) {
    return ' passed-due';
  }

  /*
  if (dueDate >= today && dueDate <= duePlus5) { // 🤔 får ej till detta, provat med getTime() och annat
    return ' due-in-five';
  }
  */

  return '';
}

/**
 * 
 * @param {date object} date 
 * @param {number} amount 
 * @returns date object
 * used so the original date object is not changed
 */
function newDateObject (date, amount) {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + amount)
  return tempDate;
};

function setBtnListeners() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteTodo);
  });
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
  renderTodos();
}

function deleteAllCompleted() {

  while (todoArr.length > 0) {
      todoArr.pop();
  }
  renderTodos();
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

// TODO: more fun stats?
function renderInfoBar(doneCounter) {
  let done = doneCounter;
  todoAmountSpan.innerText = '';
  if (todoArr.length > 0) {
    todoAmountSpan.innerText = `${done} / ${todoArr.length} completed`;
  }
  if (todoArr.length === doneCounter) {
    toggleDeleteAllBtn();
  }
}

function toggleDeleteAllBtn() {
  delAllCompleteBtn.classList.toggle('hidden');
}
function clearForm() {
  document.querySelector('.input-section').reset();
}

function toggleSortingMenu() {
  sortingSection.classList.toggle('sorting-active');
}

/**
 * meny eller about eller nåt..  men just nu skriver den bara ut exempel-todos!
 */
function openSettings() {
  // obs ej samma funktionalitet som riktiga todos..
  // bara för test av sortering och design

  let title = 'A';
  let category = 'activity';
  let dateLol = 24;
  let dueDate = '2022-12-' + dateLol;

  for (let i = 0; i < 5; i++) {
    const todo = new Todo(title, category, dueDate, dueDate, false);
    todoArr.push(todo);
    title += ' A';
    category === 'activity' ? (category = 'shop-item') : (category = 'activity');
    dateLol++;
    dueDate = '2022-12-' + dateLol;
  }
  renderTodos();
}

/**************** Program Flow ****************/

setEventListeners();
