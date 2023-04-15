let db;
const formElem = document.querySelector("form");
const nameInput = document.querySelector(".name-input");
const passwordInput = document.querySelector(".password-input");
const emailInput = document.querySelector(".email-input");

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

  let transReq = db.transaction("users", "readwrite");
  let transStore = transReq.objectStore("users");
  let transAdd = transStore.add(newUser);

  resetInputValues();
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

    tableUsersArray.map((user) => {
      console.log(user);
    });
  });
}

function createTx(storeName, mode) {
  let tx = db.transaction(storeName, mode);

  return tx;
}
