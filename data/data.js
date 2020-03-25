function getAllItems() {
  let items = JSON.parse(window.localStorage.getItem('items'));
  return items == null ? [] : items;
}

function saveAllItems(items) {
  window.localStorage.setItem('items', JSON.stringify(items));
}

function clearItems() {
  window.localStorage.clear();
}
