const toggleTodo = () => {
  const circle = document.querySelector(".circle");
  const moon = document.querySelector(".moon");
  const sun = document.querySelector(".sun");
  const banner = document.querySelector(".banner");
  const new_todo = document.querySelector(".new_todo");
  if (!circle.classList.contains("circle-active-right")) {
    circle.classList.add("circle-active-right");
    circle.classList.remove("circle-active-left");
    sun.classList.add("sunactive");
    moon.classList.add("moonactive");
    banner.style.backgroundImage = "url(./images/bg-mobile-dark.jpg)";
    new_todo.classList.add("new_todo_dark");
    new_todo.classList.remove("new_todo_light");
  } else {
    circle.classList.add("circle-active-left");
    circle.classList.remove("circle-active-right");
    sun.classList.remove("sunactive");
    moon.classList.remove("moonactive");
    banner.style.backgroundImage = "url(./images/bg-mobile-light.jpg)";

    new_todo.classList.add("new_todo_light");
    new_todo.classList.remove("new_todo_dark");
  }
};

const search = () => {
  const filterBtn = document.querySelectorAll(".category");
  filterBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      const target = e.target.dataset.id;

      console.log(target);
    });
  });
};

search();

const addTodo = (e) => {
  e.preventDefault();
  let text = document.getElementById("addTodoInput");
  if (!text.value == "") {
    db.collection("todo-items").add({
      text: text.value,
      status: "active",
    });
    text.value = "";
  } else {
    alert("please enter a value");
  }
};

const getTodo = () => {
  db.collection("todo-items").onSnapshot((snapshot) => {
    let todoItem = [];

    snapshot.docs.forEach((doc) => {
      todoItem.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    let itemLeft = document.querySelector("#items-left");
    itemLeft.innerHTML = `${todoItem.length}`;
    generateTodo(todoItem);
  });
};

const generateTodo = (items) => {
  let innerTodo = "";
  let todoContiner = document.querySelector(".todo-continer");

  items.map((item) => {
    const { text, id, status } = item;
    innerTodo += `<div class="todo-list-item">
    <div class="todo-item">
      <div class="checked-item">
        <div  data-id=${id} class="check-mark">
          <img class="${
            status === "complete" ? "check-icon-active" : "check-icon"
          }  " src="./images/icon-check.svg" />
        </div>
      </div>
      <div class="todo-text ${status === "complete" ? "underline" : ""}">
        ${text}
      </div>
    </div>
    <div class="todo-remove">
      <img class=" ${status === "complete" ? "add-close" : "remove-close"}" 
      src="./images/icon-cross.svg" alt="" />
    </div>
  </div>`;
    todoContiner.innerHTML = innerTodo;
    check();
  });
};

const check = () => {
  let checkMark = document.querySelectorAll(".checked-item .check-mark");
  checkMark.forEach((item) => {
    item.addEventListener("click", () => {
      markCompleted(item.dataset.id);
    });
  });
};

const markCompleted = (id) => {
  let item = db.collection("todo-items").doc(id);
  item.get().then((doc) => {
    if (doc.exists) {
      let status = doc.data().status;
      if (status === "active") {
        item.update({
          status: "complete",
        });
      } else if (status === "complete") {
        item.update({
          status: "active",
        });
      }
    }
  });
};

getTodo();
