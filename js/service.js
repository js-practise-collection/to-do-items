function addItem(text) {
  const items = getAllToDoItems();
  const item = {
    id: items[0].id + 1,
    text: text,
    status: 'active',
  };
  items.push(item);
  saveAllItems(items);
}

function modifyItemText(id, text) {
  let items = getAllItems().map((item) =>
    item.id === parseInt(id)
      ? {
          ...item,
          text: text,
        }
      : item
  );

  saveAllItems(items);
}

function deleteItem(id) {
  let items = getAllItems().filter((item) => item.id !== id);
  saveAllItems(items);
  showItemsWithCurrentStatus();
}

function getAllToDoItems() {
  return getAllItems().sort((a, b) => b.id - a.id);
}

function toggleItemStatus(id) {
  let items = getAllItems().map((item) =>
    item.id === parseInt(id)
      ? {
          ...item,
          status: item.status === 'completed' ? 'active' : 'completed',
        }
      : item
  );

  saveAllItems(items);
}
