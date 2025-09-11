const elContainer = document.getElementById("container");
const elSkeletonTemplete = document.getElementById("skeletonTemplete");
const elCardTemplete = document.getElementById("cardTemplete");

showSkeletons(15);

function init() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((res) => {
      setTimeout(() => {
        ui(res);
      }, 2000);
    })
    .catch((err) => {
      console.error(err);
    });
}
function showSkeletons(count) {
  elContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const clone = elSkeletonTemplete.content.cloneNode(true);
    elContainer.appendChild(clone);
  }
}

function deleteEl(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      init();
    })
    .then((res) => {})
    .finally(() => {});
}
init();

function ui(todos) {
  elContainer.innerHTML = "";
  todos.forEach((todo) => {
    const clone = elCardTemplete.content.cloneNode(true);
    const title = clone.querySelector("h2");
    const status = clone.querySelector("p");
    const button = clone.querySelector(".info");
    const deleteButton = clone.querySelector(".delete");

    button.addEventListener("click", () => {
      alert(`
            userId: ${todo.userId}
            id: ${todo.id}
            title: ${todo.title}
            completed: ${todo.completed}
          `);
    });

    deleteButton.id = todo.id;

    deleteButton.addEventListener("click", () => {
      deleteEl(todo.id);
    });

    title.textContent = todo.title;
    status.textContent = todo.completed
      ? "isCompleted : true"
      : "isCompleted : false";

    elContainer.appendChild(clone);
  });
}
