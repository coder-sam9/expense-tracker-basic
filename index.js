const form = document.querySelector("form");
const ul = document.querySelector("ul");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const details = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };
  const identifier = `${details.amount}-${details.description}-${details.category}`;
  details["identifier"] = identifier;
  localStorage.setItem(identifier, JSON.stringify(details));
  // const expenses=[]
  const newLi = document.createElement("li");
newLi.className = "list-group-item d-flex justify-content-between align-items-center";

  newLi.style = "margin:10px";
  const newLiText = document.createTextNode(
    `${details.amount}-${details.description}-${details.category}`
  );
  newLi.appendChild(newLiText);
  const btnDelete = document.createElement("button");
  const btnDeleteText = document.createTextNode("Delete");
  btnDelete.appendChild(btnDeleteText);
  btnDelete.className = "btn btn-secondary";
  btnDelete.classList.add("btn-delete");
  btnDelete.style = "margin-left:5px";
  newLi.appendChild(btnDelete);
  // Edit Button
  const btnEdit = document.createElement("button");
  const btnEditText = document.createTextNode("Edit");
  btnEdit.appendChild(btnEditText);
  btnEdit.className = "btn btn-secondary";
  btnEdit.classList.add("btn-edit");
  btnEdit.style = "margin-left:5px";
  newLi.appendChild(btnEdit);
  newLi.className = "expense";
  newLi.setAttribute("identifier", identifier);
  ul.appendChild(newLi);
  document.querySelector("#amount").value = "";
  document.querySelector("#description").value = "-";
  document.querySelector("#category").value = "-";
});
ul.addEventListener("click", (event) => {
  let identifier, expenseToDelete;
  event.preventDefault();
  if (event.target.classList.contains("btn-delete")) {
    expenseToDelete = event.target.parentElement;
    identifier = expenseToDelete.getAttribute("identifier");
    localStorage.removeItem(identifier);
    ul.removeChild(expenseToDelete);

    document.querySelector("#amount").value = "";
    document.querySelector("#description").value = "-";
    document.querySelector("#category").value = "-";
  }
  if (event.target.classList.contains("btn-edit")) {
    expenseToDelete = event.target.parentElement;
    identifier = expenseToDelete.getAttribute("identifier");
    const details = JSON.parse(localStorage.getItem(identifier));
    document.querySelector("#amount").value = details.amount;
    document.querySelector("#description").value = details.description;
    document.querySelector("#category").value = details.category;
  }
});
