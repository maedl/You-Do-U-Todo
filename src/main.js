import { doc } from 'prettier';
import './style/style.scss';
import Todo from './Todo';
import { setCategoryIcon } from './utils';

/**************** Variables ****************/

let todoArr = [];

// Elements

// const infoBar = document.querySelector('.info-bar');
const todoAmountSpan = document.querySelector('.info-bar span');

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
    const todo = new Todo(title, category, dueDate, false);
    todoArr.push(todo);
    clearForm();
    todoInput.setAttribute('placeholder', 'Type something to do..');
    renderTodos();
  }
}

function sortTodos(e) {
    let selectedRadio = e.target.id;
    
    switch (selectedRadio) {
      case 'time-radio':
        console.log('time added');
      break;
      case 'name-radio': 
        console.log('name');
      break;
      case 'due-date-radio':
        console.log('due date');
      break;
    }
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

    container.innerHTML += `
      <div class="todo">
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

      </div>
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

function deleteTodo(e) {
  const clickedBtnTitle = e.currentTarget.dataset.id;
  let indexToDel;

  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].title === clickedBtnTitle)
    {
      indexToDel = i;
    }
  }
  todoArr.splice(Number(indexToDel), 1);
  renderTodos();
}

function deleteAllCompleted() {
  let titlesToDelete = [];
  let indexToDel = '';

  for (let i = 0; i < todoArr.length; i++) {
    if (todoArr[i].completed === true) {
      titlesToDelete.push(todoArr[i].title);
    }
  }
  titlesToDelete.forEach(title => {
    indexToDel = todoArr.indexOf(indexToDel);
    todoArr.splice(indexToDel, 1);
  });
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
    const todo = new Todo(title, category, dueDate, false);
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
