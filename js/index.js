window.currentStatus = 'all';
function addToDoItem() {
  let itemDom = document.getElementById('addItem');
  if (!itemDom.checkValidity()) {
    itemDom.classList.add('require-input');
    return;
  }
  addItem(itemDom.value);
  itemDom.value = '';
  showItemsWithCurrentStatus();
}

function enterItem(event) {
  if (event.keyCode == 13) {
    addToDoItem();
  }
}

function showItems(items) {
  let itemsDom = document.getElementById('items');
  itemsDom.querySelectorAll('*').forEach((n) => n.remove());
  items
    .map((item) => generateItem(item.id, item.text, item.status))
    .forEach((item) => itemsDom.appendChild(item));
}

function generateItem(id, text, status) {
  let li = document.createElement('li');
  li.classList.add(status);
  let input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.checked = status === 'completed';
  input.setAttribute('onclick', 'changeItemStatus(' + id + ')');
  li.appendChild(input);
  let span = document.createElement('span');
  let content = document.createTextNode(text);
  span.appendChild(content);
  span.setAttribute('id', id);
  span.setAttribute('onclick', 'makeEditable(this)');
  span.setAttribute('onkeydown', 'editItem(this)');
  span.setAttribute('onmouseout', 'makedDisEditable(this)');
  li.appendChild(span);
  let button = document.createElement('button');
  button.classList.add('deleteBtn');
  button.setAttribute('onclick', 'deleteItem(' + id + ')');
  li.appendChild(button);
  return li;
}

function makeEditable(ele) {
  ele.setAttribute('contenteditable', true);
}

function makedDisEditable(ele) {
  ele.setAttribute('contenteditable', false);
}

function editItem(ele) {
  if (event.keyCode == 13) {
    let text = ele.innerText;
    let id = ele.getAttribute('id');
    modifyItemText(id, text);
    showItemsWithCurrentStatus();
  }
}

function changeItemStatus(id) {
  toggleItemStatus(id);
  showItemsWithCurrentStatus();
}

function showItemsWithCurrentStatus() {
  let items = getAllToDoItems();
  if (window.currentStatus === 'all') {
    showItems(items);
  } else {
    showItems(items.filter((item) => item.status === window.currentStatus));
  }
}

function filterItems(dom, status) {
  window.currentStatus = status;
  let elements = dom.parentNode.children;
  Array.from(elements).forEach((ele) => ele.classList.remove('btn-checked'));
  dom.classList.add('btn-checked');
  showItemsWithCurrentStatus();
}

window.addEventListener('DOMContentLoaded', (event) => {
  showItemsWithCurrentStatus();
});
