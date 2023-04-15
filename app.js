let db;
let formElem = document.querySelector("form");
let nameInput = document.querySelector(".name-input");
let passwordInput = document.querySelector(".password-input");
let emailInput = document.querySelector(".email-input");

window.addEventListener("load", () => {
  let openDB = indexedDB.open("MettiPedia", 1);

  openDB.addEventListener("success", (e) => {
    db = e.target.result;
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
