import { crea } from "./myDOM.js";

const task = {
  search: document.querySelector("#task-search"),
  wrapper: document.querySelector("#task-body"),
  input: document.querySelector("#new-task-input"),
  newTaskBtn: document.querySelector("#new-task-send"),
  allTask: [
    { id: 1, completed: true, info: "comprare pasta" },
    { id: 2, completed: false, info: "studiare js" },
  ],
  allTaskNodes: [],
};

export default function () {
  showTask(true);
  task.allTaskNodes = getAllTastNodes();
  StorageEvent();
}

function showTask(all, taskItem = null) {
  if (all) {
    task.allTask.forEach((taskItem) => addTaskinPage(taskItem));
  } else {
    addTaskinPage(taskItem);
  }
}

function addTaskinPage(taskItem) {
  const taskClass = taskItem.completed ? "task-item completed" : "task-item",
    taskAttr = [
      ["class", taskClass],
      ["data-id", taskItem.id],
    ],
    taskElem = crea("div", taskAttr);

  const taskInfo = crea("p", [["class", "task-text"]], taskItem.info),
    taskTrash = crea("img", [
      ["src", " ./assets/del.svg"],
      ["data-trash", "true"],
    ]),
    taskCompleted = getSvg(taskItem.completed);

  taskElem.append(taskInfo, taskCompleted, taskTrash);

  task.wrapper.append(taskElem);
}

function getSvg(isCompleted) {
  const sel = isCompleted ? "completed" : "not-completed",
    svgElem = document.querySelector("#" + sel).cloneNode(true);
  svgElem.removeAttribute("id");
  svgElem.classList.remove("hide");
  return svgElem;
}

function StorageEvent() {
  task.search.addEventListener("keyup", searchText);
  task.wrapper.addEventListener("click", setStatus);
  task.wrapper.addEventListener("click", deleteTask);
  task.input.addEventListener("keyup", inputEvent);
  task.newTaskBtn.addEventListener("click", newTaskEvent);
}

function searchText() {
  task.allTaskNodes.forEach((taskItem) => {
    const info = taskItem.querySelector("p");
    if (!info.textContent.includes(task.search.value)) {
      taskItem.classList.add("hide");
    } else {
      taskItem.classList.remove("hide");
    }
  });
}

function setStatus(e) {
  if (!e.target.dataset.status) return;
  const itemWrapper = e.target.closest(".task-item");

  task.allTask.forEach((taskItem) => {
    if (taskItem.id === +itemWrapper.dataset.id) {
      console.log("ciao");
      itemWrapper.classList.toggle("completed");
      itemWrapper.replaceChild(
        getSvg(taskItem.completed ? false : true),
        itemWrapper.querySelector("svg")
      );
      taskItem.completed = !taskItem.completed;
    }
  });
}

function deleteTask(e) {
  if (!e.target.dataset.trash) return;
  if (confirm("Sei sicuro di voler cancellare il task")) {
    const itemWrapper = e.target.closest(".task-item");
    task.allTask.map((elem, index) => {
      if (elem.id === +itemWrapper.dataset.id) {
        task.allTask.splice(index, 1);
        itemWrapper.remove();
      }
    });
  }
}

function inputEvent(e) {
  if (e.key.toLowerCase() === "enter" && task.input.value.trim()) {
    newTaskEvent(task.input.value.trim());
  }
}

function newTaskEvent(e) {
  if (task.input.value.trim()) {
    newTask(task.input.value.trim());
  }
}

function newTask(taskText) {
  const newTaskObj = {
    id: task.allTask[task.allTask.length - 1].id + 1,
    completed: false,
    info: taskText,
  };
  task.allTask.push(newTaskObj);
  showTask(false, newTaskObj);

  task.input.value = "";
  task.allTaskNodes = getAllTastNodes();
}

function getAllTastNodes() {
  return Array.from(document.querySelectorAll(".task-item"));
}
