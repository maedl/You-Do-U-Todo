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
