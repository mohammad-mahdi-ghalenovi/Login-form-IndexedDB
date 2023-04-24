let db;
const formElem = document.querySelector("form");
const nameInput = document.querySelector(".name-input");
const passwordInput = document.querySelector(".password-input");
const emailInput = document.querySelector(".email-input");
const tableContainerElem = document.querySelector(".tr-container");

window.addEventListener("load", () => {
  let openDB = indexedDB.open("MettiPedia", 1);

  openDB.addEventListener("success", (e) => {
    db = e.target.result;
    getUsers();
    console.warn("succesFully installed :_)");
  });

  openDB.addEventListener("upgradeneeded", (e) => {
    db = e.target.result;

    if (!db.objectStoreNames.contains("users")) {
      db.createObjectStore("users", {
        keyPath: "userID",
      }); // to create a store
    }
  });
});

formElem.addEventListener("submit", (e) => {
  e.preventDefault();

  let newUser = {
    userID: Math.floor(Math.random() * 100),
    name: nameInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  let transReq = createTx("users", "readwrite");
  let transStore = transReq.objectStore("users");
  let transAdd = transStore.add(newUser);

  resetInputValues();
  getUsers();
});

function resetInputValues() {
  nameInput.value = "";
  passwordInput.value = "";
  emailInput.value = "";
}

function getUsers() {
  let transReq = createTx("users", "readonly");
  let transStore = transReq.objectStore("users");
  let transAdd = transStore.getAll();

  transAdd.addEventListener("success", (e) => {
    let tableUsersArray = e.target.result;

    tableContainerElem.innerHTML = "";

    tableUsersArray.map((user) => {
      tableContainerElem.innerHTML += `
      <div class="tr-wrapper">
            <p>${user.userID}</p>
            <p>${user.name}</p>
            <p>${user.password}</p>
            <p>${user.email}</p>
            <a href="#" onclick="deleteTargetUser(${user.userID})">Remove</a>
      </div>
      `;
    });
  });
}

function deleteTargetUser(userID) {
  event.preventDefault();

  let tx = createTx("users", "readwrite");
  let store = tx.objectStore("users");
  let request = store.delete(userID);

  getUsers();
}

function createTx(storeName, mode) {
  let tx = db.transaction(storeName, mode);

  return tx;
}

// menu toggle 
document.body.addEventListener("keyup" , function (e) {
  if(e.key === "Control") {
    document.querySelector(".user-container").classList.toggle("active")
  }
})