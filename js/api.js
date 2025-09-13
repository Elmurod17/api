const elCardTemplate = document.getElementById("cardTemp");
const elContainer = document.getElementById("container");
const elLoading = document.getElementById("loading");
const elForm = document.getElementById("form");
const elAddBtn = document.getElementById("addBtn");
const elEditBtn = document.getElementById("editBtn");
function init() {
  elLoading.style.display = "block";
  fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
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
    .finally(() => {});
}

function getById(id) {
  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      fill(res);
    })
    .finally(() => {});
}

// addEl

function addEl(newEl) {
  fetch(`https://json-api.uz/api/project/fn43/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEl),
  })
    .then((res) => {
      alert("Information added!");
      init();
    })
    .then((res) => {})
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {});
}

function fill(obj) {
  elForm.name.value = obj.name;
  elForm.description.value = obj.description;
  elForm.category.value = obj.category;
  elForm.price.value = obj.price;
}

function ui(cars) {
  elContainer.innerHTML = "";
  cars.forEach((element) => {
    const clone = elCardTemplate.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elCategory = clone.querySelector("mark");
    const elDeleteBtn = clone.querySelector(".delete-btn");
    const elEditBtn = clone.querySelector(".edit-btn");

    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    elCategory.innerText = element.category;
    elDeleteBtn.id = element.id;
    elEditBtn.id = element.id;
    elContainer.append(clone);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteEl(e.target.id);
  }
  if (e.target.classList.contains("edit-btn")) {
    getById(e.target.id);
  }
});

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elForm);
  const result = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });
  addEl(result);
  elForm.reset();
});
