window.currentStatus = 'all';
function addItem() {
  let itemDom = document.getElementById('addItem');
  let items = getAllItems();
  let item = {
    id: items.length + 1,
    text: itemDom.value,
    status: 'active'
  };
  items.push(item);
  itemDom.value = '';
  saveAllItems(items);
  showItemsWithCurrentStatus();
}

function enterItem(event) {
  if (event.keyCode == 13) {
    addItem();
  }
}

function showItems(items) {
  let lis = items
    .sort((a, b) => b.id - a.id)
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
    ')"/><span contenteditable="true">' +
    text +
    '</span><button class="deleteBtn" onclick="deleteItem(' +
    id +
    ')"></button></li>'
  );
}

function changeItemStatus(id) {
  let items = getAllItems();
  items.forEach((item) => {
    if (item.id === id) {
      item.status = item.status === 'completed' ? 'active' : 'completed';
    }
  });
  saveAllItems(items);
  showItemsWithCurrentStatus();
}

function deleteItem(id) {
  let items = getAllItems().filter((item) => item.id !== id);
  saveAllItems(items);
  showItemsWithCurrentStatus();
}

function showItemsWithCurrentStatus() {
  let items = getAllItems();
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
