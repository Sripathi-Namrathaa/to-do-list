let todoListArray = [];

const storedTodoList = localStorage.getItem("todoTaskList");

const saveTask = () => {
  const inputValue = document.getElementById("input-box").value;
  const todoObject = {
    taskId: todoListArray.length + 1,
    task: inputValue,
    checked: false,
  };
  todoListArray.push(todoObject);
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
  document.getElementById("input-box").value = "";
  taskList(todoListArray);
};

const deleteTask = (event) => {
  const index = todoListArray.findIndex((i) => i.taskId == event.target.taskId);

  todoListArray.splice(index, 1);
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
  taskList(todoListArray);
};

const editTask = (event) => {
  const index = todoListArray.findIndex((i) => i.taskId == event.target.taskId);
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
  document.getElementById("input-box").focus();
  document.getElementById("input-box").value = todoListArray[index].task;
  todoListArray.splice(index, 1);
  taskList(todoListArray);
};

const displayAll = () => {
  taskList(todoListArray);
};

const todo = () => {
  const todoTask = todoListArray.filter((i) => i.checked == false);
  taskList(todoTask);
};

const closed = () => {
  const closedTask = todoListArray.filter((i) => i.checked == true);
  taskList(closedTask);
};

const clearAll = () => {
  todoListArray.splice(0);
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
  taskList(todoListArray);
};

const checked = (event) => {
  const index = todoListArray.findIndex((i) => i.taskId == event.target.taskId);
  todoListArray[index].checked = true;
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
};

const taskList = (todoListArray) => {
  document.getElementById("list-container").innerHTML = " ";
  for (let index = 0; index < todoListArray.length; index++) {
    const li = document.createElement("li");
    li.classList.add("task");
    const span = document.createElement("span");
    li.appendChild(span);
    span.classList.add("li-child");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.addEventListener("click", checked);
    if (todoListArray[index].checked == true) input.checked = true;
    input.taskId = todoListArray[index].taskId;
    span.appendChild(input);
    const p = document.createElement("p");
    span.appendChild(p);
    p.textContent = todoListArray[index].task;
    const div = document.createElement("div");
    li.appendChild(div);
    div.classList.add("li-child");
    const editImage = document.createElement("img");
    editImage.src = "./img/edit.png";
    editImage.addEventListener("click", editTask);
    editImage.taskId = todoListArray[index].taskId;
    div.appendChild(editImage);
    const deleteImage = document.createElement("img");
    deleteImage.src = "./img/bin.png";
    deleteImage.addEventListener("click", deleteTask);
    deleteImage.taskId = todoListArray[index].taskId;
    div.appendChild(deleteImage);

    document.getElementById("list-container").appendChild(li);
  }
};

if (storedTodoList !== null) {
  todoListArray = JSON.parse(storedTodoList);
  taskList(todoListArray);
}

function setActiveClass(event) {
  const buttons = document.querySelectorAll(".buttons-wrapper button");

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  event.target.classList.add("active");
}

document.querySelectorAll(".buttons-wrapper button").forEach((button) => {
  button.addEventListener("click", setActiveClass);
});
