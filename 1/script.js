"use strict";

// Dodawanie nowego elementu do listy.
const newElement = () => {
  const newItem = document.createElement("li");
  const inputVal = document.getElementById("todo-item-input").value;
  newItem.appendChild(document.createTextNode(inputVal));

  if (inputVal === "") {
    alert("Item cannot be empty");
  } else {
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "x";
    closeButton.setAttribute("id", "delete-btn");
    closeButton.setAttribute("class", "btn btn-outline-danger btn-sm");
    newItem.appendChild(closeButton);
    const selectValue = document.getElementById("todo-list-select").value;
    document.getElementById(selectValue).appendChild(newItem);
  }

  document.getElementById("todo-item-input").value = "";
};

// Wyszarzanie elementu po kliknięciu oraz dodanie daty wykonania.
window.addEventListener("DOMContentLoaded", () => {
  const urgentToDoList = document.getElementById("urgent-todo-list");
  const notUrgentToDoList = document.getElementById("not-urgent-todo-list");
  const time = new Date();
  const formattedTime = time.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  urgentToDoList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      if (event.target.classList.contains("done")) {
        event.target.removeChild(event.target.childNodes[1]);
      } else {
        event.target.insertBefore(
          document.createTextNode(` - ${formattedTime}`),
          event.target.lastChild
        );
      }
      event.target.classList.toggle("done");
    }
  });

  notUrgentToDoList.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      if (event.target.classList.contains("done")) {
        event.target.removeChild(event.target.childNodes[1]);
      } else {
        event.target.insertBefore(
          document.createTextNode(` - ${formattedTime}`),
          event.target.lastChild
        );
      }
      event.target.classList.toggle("done");
    }
  });
});

// "Historia" usuwania.
let deletedUrgentTask = "";
let deletedNotUrgentTask = "";

// Usuwanie elementu po kliknięciu.
$(document).ready(() => {
  $("#urgent-todo-list").on("click", "#delete-btn", (event) => {
    deletedUrgentTask = $(event.target).parent();
    $(event.target).parent().remove();
    // Odblokowanie przycisku przywracania.
    $("#urgent-put-back-btn").prop("disabled", false);
  });

  $("#not-urgent-todo-list").on("click", "#delete-btn", (event) => {
    deletedNotUrgentTask = $(event.target).parent();
    $(event.target).parent().remove();
    // Odblokowanie przycisku przywracania.
    $("#not-urgent-put-back-btn").prop("disabled", false);
  });
});

// Obsługa przywracania elementu.
$(document).ready(() => {
  $("#urgent-put-back-btn").on("click", () => {
    $("#urgent-todo-list").append(deletedUrgentTask);
    // Ponowne zablokowanie przycisku przywracania.
    $("#urgent-put-back-btn").prop("disabled", true);
  });

  $("#not-urgent-put-back-btn").on("click", () => {
    $("#not-urgent-todo-list").append(deletedNotUrgentTask);
    // Ponowne zablokowanie przycisku przywracania.
    $("#not-urgent-put-back-btn").prop("disabled", true);
  });
});

// Obsługa chowania list.
const hideUrgentList = () => {
  const container = document.getElementById("urgent-list-container");
  const list = document.getElementById("urgent-todo-list");
  const button = document.getElementById("urgent-put-back-btn");
  container.classList.toggle("unset-height");
  list.classList.toggle("hidden");
  button.classList.toggle("hidden");
};

const hideNotUrgentList = () => {
  const container = document.getElementById("not-urgent-list-container");
  const list = document.getElementById("not-urgent-todo-list");
  const button = document.getElementById("not-urgent-put-back-btn");
  container.classList.toggle("unset-height");
  list.classList.toggle("hidden");
  button.classList.toggle("hidden");
};

// Obsługa wyszukiwania elementów.

const search = () => {
  const selectValue = document.getElementById("todo-search-select").value;

  if (selectValue === "not-case") {
    for (const task of document.querySelectorAll("li")) {
      if (
        task.innerText
          .toLowerCase()
          .includes(
            document.getElementById("todo-item-search").value.toLowerCase()
          )
      ) {
        task.classList.remove("hidden");
      } else {
        task.classList.add("hidden");
      }
    }
  } else {
    for (const task of document.querySelectorAll("li")) {
      if (
        task.innerText.includes(
          document.getElementById("todo-item-search").value
        )
      ) {
        task.classList.remove("hidden");
      } else {
        task.classList.add("hidden");
      }
    }
  }
};
