/*

************************************
settings.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  File with all functions related only to settings in side page of app. All
  changes should be locally visible even without saving to php.
*/

function sideNotifications(val) {
  // checkbox is checked, initialize push notifications

  if (val) {
    initNotifications();
  }
}

function switchSessionVal(name, val) {
  // general function for changing any session.settings value

  session.settings[name] = val;
}

/*
function toolbarEditOpen(target) {
  document.querySelectorAll(".icon-open").forEach((element) => {
    element.classList.remove("icon-open");
  });
  target.classList.add("icon-open");
}*/

function toolbarEditColor(index, color, colorComplementary) {
  // change color of toolbar icon in front-end

  document.documentElement.style.setProperty("--toolbar-color-" + index, color);
  document.documentElement.style.setProperty(
    "--toolbar-color-" + index + "-complementary",
    colorComplementary
  );
}

function toggleToolbarEditMode() {
  // switch between advanced and simple edit mode

  document
    .getElementById("toolbar-edit-mode-div")
    .classList.toggle("toggle-edit");
}

function changeHighlightColor(color, colorComplementary) {
  // change global main highlight color in front-end

  document.documentElement.style.setProperty("--interactive-color", color);
  document.documentElement.style.setProperty(
    "--interactive-color-complementary",
    colorComplementary
  );
}

function swapToolbarColor(index) {
  // switch between fg and bg color of toolbar icon

  let toolbarColor = document.documentElement.style.getPropertyValue(
    "--toolbar-color-" + index
  );
  document.documentElement.style.setProperty(
    "--toolbar-color-" + index,
    document.documentElement.style.getPropertyValue(
      "--toolbar-color-" + index + "-complementary"
    )
  );
  document.documentElement.style.setProperty(
    "--toolbar-color-" + index + "-complementary",
    toolbarColor
  );
}

function hideToolbarIcon(index, target) {
  // hide/show toolbar icon from toolbar

  session.settings.toolbarDisplayIcon[index] =
    !session.settings.toolbarDisplayIcon[index];
  target.classList.toggle("hidden-toolbar-icon");
  drawToolbar();
}

function colorComplement(string) {
  if (string.includes("complementary")) {
    return string.replace("-complementary", "");
  } else {
    return string.replace(")","-complementary)");
  }
}

function drawToolbarEditMode(target) {
  // init toolbar element in edit mode

  target.innerHTML = "";
  
  for (let index = 0; index < toolbarIconCount; index++) {
    let indexReorder = session.settings.toolbarReorder[index];
    let toolbarIconDOM = document.createElement("div");
    toolbarIconDOM.className = "side-toolbar-button";
    toolbarIconDOM.addEventListener("click", () => {
      toolbarEditOpen(toolbarIconDOM.parentNode);
    });
    toolbarIconDOM.setAttribute(
      "style",
      "background-color: var(--toolbar-color-" + indexReorder + ");"
    );
    toolbarIconDOM.innerHTML = static.svg["button" + indexReorder + "svg"];

    let toolbarIconOptionsSwapDOM = document.createElement("img");
    toolbarIconOptionsSwapDOM.className = "side-toolbar-edit-swap";
    toolbarIconOptionsSwapDOM.addEventListener("click", () => {
      swapToolbarColor(index);
      session.settings.toolbarColors[index] = colorComplement(
        session.settings.toolbarColors[index]
      );
    });
    toolbarIconOptionsSwapDOM.src = "img/swap-icon.svg";

    let toolbarIconOptionsDeleteDOM = document.createElement("img");
    toolbarIconOptionsDeleteDOM.className = "side-toolbar-edit-delete";
    toolbarIconOptionsDeleteDOM.addEventListener("click", () => {
      hideToolbarIcon(
        index,
        toolbarIconOptionsDeleteDOM.parentNode.parentNode.parentNode
      );
    });
    toolbarIconOptionsDeleteDOM.src = "img/delete-icon.svg";

    let toolbarIconOptionsReorderDOM = document.createElement("img");
    toolbarIconOptionsReorderDOM.className = "side-toolbar-edit-reorder";
    toolbarIconOptionsReorderDOM.src = "img/reorder-icon.svg";

    let toolbarIconLineOptionsDOM = document.createElement("div");
    toolbarIconLineOptionsDOM.className = "side-icon-options";
    toolbarIconLineOptionsDOM.append(toolbarIconOptionsSwapDOM);
    toolbarIconLineOptionsDOM.append(toolbarIconOptionsDeleteDOM);
    toolbarIconLineOptionsDOM.append(toolbarIconOptionsReorderDOM);

    let toolbarIconLineWrapperDOM = document.createElement("div");
    toolbarIconLineWrapperDOM.className = "side-icon-line-wrapper";
    toolbarIconLineWrapperDOM.append(toolbarIconDOM);
    toolbarIconLineWrapperDOM.append(toolbarIconLineOptionsDOM);

    let toolbarIconPaletteDOM = document.createElement("div");
    toolbarIconPaletteDOM.className = "side-icon-palette";

    for (let index2 = 0; index2 < colorsInPalette; index2++) {
      let toolbarIconColorOptionDOM = document.createElement("label");
      toolbarIconColorOptionDOM.addEventListener("click", () => {
        toolbarEditColor(
          index,
          "var(--theme-color-" + index2 + ")",
          "var(--theme-color-" + index2 + "-complementary)"
        );
        session.settings.toolbarColors[index]="var(--theme-color-" + index2 + ")";
      });
      let toolbarIconColorOptionInputDOM = document.createElement("input");
      if (
        "var(--theme-color-" + index2 + ")" ==
          document.documentElement.style.getPropertyValue(
            "--toolbar-color-" + index
          ) ||
        "var(--theme-color-" + index2 + "-complementary)" ==
          document.documentElement.style.getPropertyValue(
            "--toolbar-color-" + index
          )
      ) {
        toolbarIconColorOptionInputDOM.checked = "checked";
      }
      toolbarIconColorOptionInputDOM.type = "radio";
      toolbarIconColorOptionInputDOM.id = "icon" + index + "color" + index2;
      toolbarIconColorOptionInputDOM.name = "icon" + index + "color";
      let toolbarIconColorOptionDivDOM = document.createElement("div");
      toolbarIconColorOptionDivDOM.style =
        "--circle-color:var(--theme-color-" + index2 + ");";

      toolbarIconColorOptionDOM.append(toolbarIconColorOptionInputDOM);
      toolbarIconColorOptionDOM.append(toolbarIconColorOptionDivDOM);

      toolbarIconPaletteDOM.append(toolbarIconColorOptionDOM);
    }

    let toolbarIconWrapperDOM = document.createElement("div");
    toolbarIconWrapperDOM.className = "side-icon-wrapper";
    toolbarIconWrapperDOM.setAttribute("draggable", "true");
    toolbarIconWrapperDOM.append(toolbarIconLineWrapperDOM);
    toolbarIconWrapperDOM.append(toolbarIconPaletteDOM);
    target.append(toolbarIconWrapperDOM);
  }
}

function sideInit() {
  // initialize settings in side page of app

  document.querySelectorAll(".side-form input").forEach((element) => {
    element.addEventListener("input", () => {
      element.closest(".side-form").classList.add("form-changed");
    });
  });
  drawToolbarEditMode(document.getElementById("toolbar-edit-mode-div"));
}

function changePalette(nr) {
  // change css variables to new color palette

  for (let index = 0; index < colorsInPalette; index++) {
    document.documentElement.style.setProperty(
      "--theme-color-" + index,
      palettes[nr].colors[index]
    );
    document.documentElement.style.setProperty(
      "--theme-color-" + index + "-complementary",
      palettes[nr].colorComplementary[index]
    );
  }
}

console.log("✅ settings.js successfully loaded!");
