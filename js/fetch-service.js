const URL = 'http://localhost:8080/items';
async function getAllItems() {
  let res = await fetch(URL);
  return await res.json();
}

async function createItem(data) {
  return await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

async function updateItem(data) {
  return await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

async function removeItem(id) {
  return await fetch(URL + '/' + id, {
    method: 'DELETE'
  });
}
