/** @format */

const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector(".todos");
const todoTitle = document.querySelector(".todo-title");
const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".close-button");
const editedText = document.querySelector(".edited-text ");
const submitEdit = document.querySelector(".submit");

const todoList = [];
let totalTodo = 0;

function findFromArray(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (id === array[i].id) {
      return array[i];
    }
  }

  return null;
}

function deleteTodo(id) {
  const element = document.getElementById(id);
  element.remove();
  const data = findFromArray(id, todoList);
  todoList.splice(todoList.indexOf(data), 1);
}

function editTodo(id) {
  const element = document.querySelector("#" + id + " h1");
  modal.showModal();
  modalClose.addEventListener("click", () => {
    modal.close();
  });
  submitEdit.addEventListener("click", () => {
    const newTodoText = editedText.value;
    element.innerText = newTodoText;
    modal.close();
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = todoTitle.value;

  const newTodo = document.createElement("div");
  const h1 = document.createElement("h1");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");

  deleteButton.innerText = "Delete";
  editButton.innerText = "Edit";

  todoList.push({
    id: "Todo" + totalTodo,
    title,
  });

  totalTodo++;

  const lastTodo = todoList[todoList.length - 1];

  newTodo.classList.add("todo-card");
  todos.appendChild(newTodo);

  h1.innerText = lastTodo.title;
  deleteButton.addEventListener("click", () => deleteTodo(lastTodo.id));
  editButton.addEventListener("click", () => editTodo(lastTodo.id));

  newTodo.appendChild(h1);
  newTodo.appendChild(deleteButton);
  newTodo.appendChild(editButton);
  newTodo.id = lastTodo.id;
  todoTitle.value = "";
});
