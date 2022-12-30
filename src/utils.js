/**
 * 
 * @param {string} choosedCategory | get selected string from category dropdown
 * @returns google icon name to be displayed
 */

export function setCategoryIcon(choosedCategory) {
  let categoryString = '';
  switch (choosedCategory) {
    case 'activity':
      categoryString = 'sprint';
      break;
    case 'shop-item':
      categoryString = 'shopping_bag';
      break;
    case 'call':
      categoryString = 'call';
      break;
  }
  return categoryString;
}

/**
 * 
 * @param {string} todoDueDate | get string from date input
 * @returns the appropriate class name for expiration date
 */
export function checkDueDate(todoDueDate) {
  const today = new Date();
  let yesterday = newDateObject(today, -1);
  const dueDate = new Date(todoDueDate);
  const dueIn5 = newDateObject(today, 5);


  if (yesterday > dueDate) {
    return ' passed-due';
  } else if (dueDate <= dueIn5) {
    return ' due-in-five';
  } else {
    return '';
  }
}

/**
 *
 * @param {date object} date to moidify
 * @param {number} amount of days
 * @returns new date object
 * used so the original date object is not changed
 */
function newDateObject(date, amount) {
  let tempDate = new Date(date);
  tempDate.setDate(tempDate.getDate() + amount);
  return tempDate;
}

let aboutContent = `
<h2>How to use:</h2>
  <p>
    First off, start by adding an item to the list using the plus-button. Add your title, due date and category, then press "Add". Repeat until satisfied!
  </p>
  <p>
    If you wish to sort your to do-list, press the <span class="material-symbols-outlined footer-icon sorting-icon"> sort </span> button and choose your preferred order.
  </p>
  <p>
    Your tasks can be removed by clicking their <span class="material-symbols-outlined ex-icon"> delete </span> button. Or if you prefer, use the <button type="button" class="del-all-complete-btn">Remove all done</button> . This button will emerge when you have completed all tasks. Mark them as done using the checkbox on the left of your to do title.
  </p>
  <p class="flex-p">
  Try it here: <input type="checkbox"> 
  </p>
  <p>
    You can easily see if your due date is expired or close to expiration. Expired dates are displayed <span class="passed-due"> in red italic and underlined.</span> Any task's date expiring within 5 days will be displayed <span class="due-in-five"> in yellow italic.
  </p>
  <p>
    Your tasks will be saved on your device using a small portion of your local memory. 
  <h2>Contact the developer</h2>
  <p>
    Send me an e-mail at: <a href="mailto:max.edlund@medieinstitutet.se">max.edlund@medieinstitutet.se</a>
  </p>
  <p>
    Or if you want to see what else I am up to, check my <a href="https://github.com/maedl">Github</a> or my <a href="https://www.linkedin.com/in/max-edlund/">LinkedIn</a>.
  </p>
  <p>
    Max 'maedl' Edlund
  </p>
`;

export { aboutContent };
