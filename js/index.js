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
  let lis = items
    .map((item) => generateItem(item.id, item.text, item.status))
    .reduce((a, b) => a + b, '');
  renderDom(lis, 'items');
}

function generateItem(id, text, status) {
  return (
    '<li class="' +
    status +
    '"><input type="checkbox" ' +
    (status === 'completed' ? 'checked' : '') +
    ' onclick="changeItemStatus(' +
    id +
    ')"/><span id="' +
    id +
    '" onclick="makeEditable(this)" onkeydown="editItem(this)" onmouseout="makedDisEditable(this)">' +
    text +
    '</span><button class="deleteBtn" onclick="deleteItem(' +
    id +
    ')"></button></li>'
  );
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

function renderDom(htmlEle, eleID) {
  let domEle = document.getElementById(eleID);
  domEle.innerHTML = htmlEle;
}

window.addEventListener('DOMContentLoaded', (event) => {
  showItemsWithCurrentStatus();
});
