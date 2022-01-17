/*

************************************
theme.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  File containing functions related to theme settings.
*/

function toggleDarkTheme() {
  // switch between dark and light mode

  session.settings.darkTheme = !session.settings.darkTheme;
  if (session.settings.darkTheme) {
    document.body.classList.add("dark-theme");
    document.documentElement.style.setProperty("--main-bg-color", "#000");
    document.documentElement.style.setProperty("--main-fg-color", "#fff");
    document.documentElement.style.setProperty("--body-bg-color", "#2c2c2c");
    document.documentElement.style.setProperty("--body-bg-color-2", "#181818");
    document.documentElement.style.setProperty(
      "--main-line-color",
      "#ffffff20"
    );
    document.documentElement.style.setProperty("--menu-bg-color", "#2d2d2dc7");
    document.documentElement.style.setProperty("--side-bg-color", "#000");
    document.documentElement.style.setProperty("--side-bg-color-2", "#282828");
    document.documentElement.style.setProperty("--side-grey-light", "#4f4f4f");
    document.documentElement.style.setProperty(
      "--fluent-border-light",
      "#ffffff24"
    );
    document.documentElement.style.setProperty(
      "--fluent-border-dark",
      "#00000084"
    );
    document.documentElement.style.setProperty("--hyperlink-color", "#3e74ff");
    document.documentElement.style.setProperty(
      "--notifications-error-color",
      "#700000"
    );
    document.documentElement.style.setProperty(
      "--notifications-warning-color",
      "#9a7b00"
    );
    document.documentElement.style.setProperty(
      "--notifications-confirm-color",
      "#568559"
    );
  } else {
    document.body.classList.remove("dark-theme");
    document.documentElement.style.setProperty("--main-bg-color", "#fff");
    document.documentElement.style.setProperty("--main-fg-color", "#000");
    document.documentElement.style.setProperty("--body-bg-color", "var(--side-bg-color)");
    document.documentElement.style.setProperty("--body-bg-color-2", "var(--main-bg-color)");
    document.documentElement.style.setProperty(
      "--main-line-color",
      "#00000020"
    );
    document.documentElement.style.setProperty("--menu-bg-color", "#ffffffb8");
    document.documentElement.style.setProperty("--side-bg-color", "#ededed");
    document.documentElement.style.setProperty("--side-bg-color-2", "#ffffff");
    document.documentElement.style.setProperty("--side-grey-light", "#f2f2f2");
    document.documentElement.style.setProperty(
      "--fluent-border-light",
      "#ffffff99"
    );
    document.documentElement.style.setProperty(
      "--fluent-border-dark",
      "#00000020"
    );
    document.documentElement.style.setProperty("--hyperlink-color", "#1a4ed2");
    document.documentElement.style.setProperty(
      "--notifications-error-color",
      "#ff9e9e"
    );
    document.documentElement.style.setProperty(
      "--notifications-warning-color",
      "#ffe16d"
    );
    document.documentElement.style.setProperty(
      "--notifications-confirm-color",
      "#9eff7a"
    );
  }
}

function loadThemeColors() {
  for (let index = 0; index < colorsInPalette; index++) {
    document.documentElement.style.setProperty(
      "--theme-color-" + index,
      palettes[session.settings.activePalette].colors[index]
    );
    document.documentElement.style.setProperty(
      "--theme-color-" + index + "-complementary",
      palettes[session.settings.activePalette].colorComplementary[index]
    );
  }

  for (let index = 0; index < toolbarIconCount; index++) {
    document.documentElement.style.setProperty(
      "--toolbar-color-" + index,
      session.settings.toolbarColors[index]
    );
    document.documentElement.style.setProperty(
      "--toolbar-color-" + index + "-complementary",
      session.settings.toolbarColorsComplementary[index]
    );
  }
}

console.log("✅ theme.js successfully loaded!");
