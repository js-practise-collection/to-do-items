async function addItem(text) {
  return await createItem({ text: text });
}

async function modifyItemText(id, text) {
  let allItems = await getAllItems();
  let item = allItems.find((item) => item.id === parseInt(id));
  item.text = text;
  return await updateItem(item);
}

async function getAllToDoItems() {
  let allItems = await getAllItems();
  return allItems.sort((a, b) => b.id - a.id);
}

async function toggleItemStatus(id) {
  let allItems = await getAllItems();
  let item = allItems.find((item) => item.id === parseInt(id));
  item.status = item.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED';
  return await updateItem(item);
}
