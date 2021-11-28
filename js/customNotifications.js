/*

************************************
customNotifications.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  This file contains functions and all js for custom in-app notifications.
*/

let customNotificationsTimeout = 3000;
// user should be able to change this value from the UI in the future

function initCustomNotifications() {
// create main wrapper for appending custom notifications

  let customNotificationsWrapper = document.createElement("div");
  customNotificationsWrapper.className="custom-notifications-wrapper";
  customNotificationsWrapper.id="custom-notifications-wrapper-div";
  document.getElementById("top-bar-div").before(customNotificationsWrapper);
}

function pushCustomNotifications(content,color) {
// push custom in-app notification content - text of notification color - can be
// any code, but preferably should be used one of predefined values:
// var(--notifications-regular-color), var(--notifications-error-color),
// var(--notifications-warning-color), var(--notifications-confirm-color)

  let customNotificationsBox = document.createElement("div");
  customNotificationsBox.className = "custom-notifications-box notifications-hide fluent-bg";
  customNotificationsBox.setAttribute("style","--notification-color:"+color);
  customNotificationsBox.innerHTML=content;
  setTimeout(() => {
    customNotificationsBox.classList.remove("notifications-hide");
  }, 10);
  setTimeout(() => {
    customNotificationsBox.classList.add("notifications-hide");
    setTimeout(() => {
      customNotificationsBox.remove();
    }, 400);
  }, customNotificationsTimeout);
  document.getElementById("custom-notifications-wrapper-div").prepend(customNotificationsBox);

  console.log("Custom notfication pushed: "+content);
}

function clearCustomNotifications() {
// delete all existing notifications whithout waiting for timeout - when going
// through UI, notifications could make the user experience worst

  document.querySelectorAll(".custom-notifications-box").forEach(element => {
    element.remove();
  });
}

console.log("✅ customNotifications.js successfully loaded!");