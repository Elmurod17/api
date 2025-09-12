const elCardTemplate = document.getElementById("cardTemp");
const elContainer = document.getElementById("container");
const elLoading = document.getElementById("loading");

function init() {
  elLoading.style.display = "block";
  fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      elLoading.style.display = "none";
    });
}
init();

// delete

function deleteEl(id) {
  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      init();
    })
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
}

function ui(cars) {
  elContainer.innerHTML = "";
  cars.forEach((element) => {
    const clone = elCardTemplate.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elCategory = clone.querySelector("mark");
    const elDeleteBtn = clone.querySelector("button");

    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    elCategory.innerText = element.category;
    elDeleteBtn.id = element.id;
    elContainer.append(clone);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteEl(e.target.id);
  }
});
