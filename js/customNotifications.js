let customNotificationsTimeout = 3000;

function initCustomNotifications() {
  let customNotificationsWrapper = document.createElement("div");
  customNotificationsWrapper.className="custom-notifications-wrapper";
  customNotificationsWrapper.id="custom-notifications-wrapper-div";
  document.getElementById("top-bar-div").before(customNotificationsWrapper);
}

function pushCustomNotifications(content,color) {
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
}

function clearCustomNotifications() {
  document.querySelectorAll(".custom-notifications-box").forEach(element => {
    element.remove();
  });
}

console.log("✅ customNotifications.js successfully loaded!");