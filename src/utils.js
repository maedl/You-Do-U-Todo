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
