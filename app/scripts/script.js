/*

************************************
script.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  Main file for all global js functions.
*/

function errorHandler(code, crucial) {
  // function for handling with errors, in the future, they should probably be
  // sent to server

  //#code 0 -> loading timeout
  //#code 1 -> missing DOM element
  //#code 2 -> unable to delete gallery element

  console.log("error nr. " + code);

  if (crucial) {
    pushCustomNotifications(
      "ERROR! Appication run into problem. CODE #" + code,
      "var(--notifications-error-color)"
    );

    setTimeout(() => {
      // when webapp doesn't load properly, try refresh the window without caching
      // - hopping problem was only with network - otherwise this will lead to app
      //   refreshing all the time - better handler for this error should be
      //   created in the future

      window.location.reload(true);
    }, customNotificationsTimeout);
  }
}

function formValidator(form, event) {
  let isValid = true;
  form.querySelectorAll("[data-validate]").forEach((element) => {
    if (element.getAttribute("data-valid-input") == "false") {
      isValid = false;
    }
  });

  if (isValid) {
    return true;
  }
  event.preventDefault();
  pushCustomNotifications(
    "Check entered values!",
    "var(--notifications-error-color)"
  );
  changeHTMLTheme("#rr0000");
  return false;
}

function inputValidator(input, type) {
  let value = input.value;
  let errorMessage = "";

  var regexUpperAndLower = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])([^\xyz]){0,}$/);
  var regexDecimal = new RegExp(/^(?=.*\d)([^\xyz]){0,}$/);
  var regexLabelUnallowed = new RegExp(
    /^[a-zA-Zá-žÁ-Ž0-9\s!?.\$%\^\&*\)\(+=._-]+$/
  );
  var regexUsernameUnallowed = new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/);
  var regexEmail = new RegExp(/.+\@.+\..+/);

  if (type == "username") {
    if (!(value.length > 7 && value.length < 200)) {
      errorMessage += "<li>length between 8 and 200 chars</li>";
    }

    if (!regexUsernameUnallowed.test(value)) {
      errorMessage += "<li>contains unallowed symbols</li>";
    }
  } else if (type == "label") {
    if (!(value.length > 0 && value.length < 200)) {
      errorMessage += "<li>length between 1 and 200 chars</li>";
    }

    if (!regexLabelUnallowed.test(value)) {
      errorMessage += "<li>conatins unallowed symbols</li>";
    }
  } else if (type == "email") {
    if (!regexEmail.test(value)) {
      errorMessage += "<li>this is not an email adress</li>";
    }
  } else if (type == "password") {
    if (!(value.length > 7 && value.length < 200)) {
      errorMessage += "<li>length between 8 and 200 chars</li>";
    }

    if (!regexUpperAndLower.test(value)) {
      errorMessage += "<li>at least one uppercase and lowercase letter</li>";
    }

    if (!regexDecimal.test(value)) {
      errorMessage += "<li>at least one number</li>";
    }
  } else if (type == "match") {
    if (
      !(
        document.getElementById(input.getAttribute("data-validate-match-id"))
          .value == value
      )
    ) {
      errorMessage += "<li>password does not match</li>";
    }
  }

  if (errorMessage == "") {
    input.setAttribute("data-valid-input", true);
    if (input.nextElementSibling.className.includes("validate-warning")) {
      input.nextElementSibling.innerHTML = "";
      input.nextElementSibling.classList.add("warning-hide");
    } else {
      errorHandler(1, false);
    }
  } else {
    input.setAttribute("data-valid-input", false);

    if (input.nextElementSibling.className.includes("validate-warning")) {
      input.nextElementSibling.innerHTML = errorMessage;
      input.nextElementSibling.classList.remove("warning-hide");
    } else {
      errorHandler(1, false);
    }
  }
}

function normalizeValue(val, maxVal, offset) {
  if (val + offset > maxVal) {
    return val - offset;
  } else {
    return val;
  }
}

function closeMenu() {
  // close menu form and show toolbar

  clearCustomNotifications();
  document.getElementById("main-wrapper-div").classList.remove("menu-open");
}

function openMenu(target, event) {
  // hide bottom toolbar and show menu form defined by target variable

  closeAllSubmenus();
  event.stopPropagation();
  document.querySelectorAll("#menu-formbox-div form").forEach((element) => {
    // hide all opened menu forms, if there are any

    element.classList.remove("form-visible");
  });
  document.getElementById(target).classList.add("form-visible");
  document.getElementById("menu-submit-button").innerHTML = document
    .getElementById(target)
    .getAttribute("data-submit-label");
  document.getElementById("menu-submit-button").setAttribute("form", target);
  document.getElementById("main-wrapper-div").classList.add("menu-open");
}

function openSubsortMenumenu(event) {
  event.stopPropagation();
  closeAllSubmenus();
  let rect = event.target.closest(".window").getBoundingClientRect();
  let submenu = document.getElementById("sort-submenu-div");
  let x =
    normalizeValue(
      event.clientX,
      document.body.offsetWidth,
      submenu.offsetWidth
    ) - rect.left;
  let y =
    normalizeValue(
      event.clientY,
      document.body.offsetHeight,
      submenu.offsetHeight
    ) - rect.top;
  openSubmenu(x, y, submenu);
}

function search(keyword) {
  document.querySelectorAll(".searchable").forEach((element) => {
    let keywordmix =
      element.getAttribute("data-name").toLowerCase() +
      ";" +
      element.getAttribute("data-keyword").toLowerCase();
    if (!keywordmix.includes(keyword.toLowerCase())) {
      element.classList.add("search-hide");
    } else {
      element.classList.remove("search-hide");
    }
  });
}

function searchCancel() {
  topbarSearch();
  document.querySelector(".search-box input").value = "";
  document.querySelectorAll(".search-hide").forEach((element) => {
    element.classList.remove("search-hide");
  });
}

function sort(parameter) {
  var list = [];
  document.querySelectorAll(".searchable").forEach((element) => {
    list.push(element.cloneNode(true));
  });
  list.sort(function (a, b) {
    if (parameter == 0) {
      return a
        .getAttribute("data-name")
        .localeCompare(b.getAttribute("data-name"));
    } else if (parameter == 1) {
      return b
        .getAttribute("data-name")
        .localeCompare(a.getAttribute("data-name"));
    } else if (parameter == 2) {
      return a.getAttribute("data-date") - b.getAttribute("data-date");
    } else if (parameter == 3) {
      return b.getAttribute("data-date") - a.getAttribute("data-date");
    } else if (parameter == 4) {
      return a.getAttribute("data-size") - b.getAttribute("data-size");
    } else if (parameter == 5) {
      return b.getAttribute("data-size") - a.getAttribute("data-size");
    }
  });
  if (document.querySelector(".dir-header")) {
    let header = document.querySelector(".dir-header").cloneNode(true);
    list.unshift(header);
  }
  document.getElementById("blank-canvas").innerHTML = "";
  list.forEach((element) => {
    document.getElementById("blank-canvas").append(element);
  });
  appendEmptyElements(20, document.getElementById("blank-canvas"), "dir-box");
}

function openSubmenu(x, y, target) {
  // open submenu specified at target variable and move it to specified position

  target.style.top = y + `px`;
  target.style.left = x + `px`;
  target.classList.add("visible");
  document.getElementById("main-wrapper-div").classList.add("toolbar-hide");

  // hide toolbar to prevent any visual problems
}

function closeAllSubmenus() {
  // make sure no submenu stays open when it shouldn't

  if (session.settings.toolbarVisible) {
    document
      .getElementById("main-wrapper-div")
      .classList.remove("toolbar-hide");
  }

  document.querySelectorAll(".submenu-wrapper.visible").forEach((element) => {
    element.classList.remove("visible");
  });
}

function openSide() {
  // go to side page of app

  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--side-grey-bg")
  );
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.add("side-open");
  document.getElementById("main-wrapper-div").classList.add("top-bar-hide");
  document.getElementById("main-wrapper-div").classList.add("toolbar-hide");
  clearCustomNotifications();

  setTimeout(() => {
    document.getElementById("main-wrapper-div").classList.add("side-enable");
  }, 1000);
}

function closeSide() {
  // go back to main page of app

  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--main-bg-color")
  );
  document.documentElement.scrollTop = 0;
  document.getElementById("main-wrapper-div").classList.remove("side-enable");
  document.getElementById("main-wrapper-div").classList.remove("side-open");
  document.getElementById("main-wrapper-div").classList.remove("top-bar-hide");
  if (session.settings.toolbarVisible) {
    console.log("visible toolbar");
    document
      .getElementById("main-wrapper-div")
      .classList.remove("toolbar-hide");
  } else {
    console.log("unvisible toolbar");
    document.getElementById("main-wrapper-div").classList.add("toolbar-hide");
  }
  clearCustomNotifications();
}

function openTopbar() {
  // expand top-bar

  document.getElementById("main-wrapper-div").classList.add("top-bar-open");
}

function openToolbar() {
  // expand toolbar

  document
    .getElementById("main-wrapper-div")
    .classList.remove("toolbar-autohide");
}

function toggleDisplayStyle() {
  // change style of displaying directories and files

  document
    .getElementById("main-wrapper-div")
    .classList.toggle("display-as-tiles");
}

function topbarSearch() {
  // toggle search bar

  closeAllSubmenus();
  document.getElementById("top-bar-div").classList.toggle("top-bar-search");
}

function topbarSort() {
  // toggle sort submenu

  document.getElementById("top-bar-div").classList.add("top-bar-sort");
}

function closeDir() {
  // close opened directory and go back to their list

  changeHTMLTheme(
    document.documentElement.style.getPropertyValue("--main-bg-color")
  );
  blankCanvas = document.getElementById("blank-canvas");

  blankCanvas.classList.add("blank-canvas");

  setTimeout(() => {
    drawDirectories();
    blankCanvas.classList.remove("blank-canvas");
  }, 400);
}

console.log("✅ script.js successfully loaded!");
