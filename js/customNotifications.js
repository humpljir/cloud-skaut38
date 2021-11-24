function initCustomNotifications() {
  let customNotificationsWrapper = document.createElement("div");
  customNotificationsWrapper.className="custom-notifications-wrapper";
  customNotificationsWrapper.id="custom-notifications-wrapper-div";
  document.getElementById("window-div").append(customNotificationsWrapper);
}

function pushCustomNotifications(color,timeout) {
  let customNotificationsBox = document.createElement("div");
  customNotificationsBox.className = "custom-notifications-box notifications-hide fluent-bg";
  customNotificationsBox.setAttribute("style","--notification-color:"+color);
  customNotificationsBox.innerHTML="Lorem Ipsum, lorem ipsum bla bla bla!";
  setTimeout(() => {
    customNotificationsBox.classList.remove("notifications-hide");
  }, 10);
  setTimeout(() => {
    customNotificationsBox.classList.add("notifications-hide");
    setTimeout(() => {
      customNotificationsBox.remove();
    }, 400);
  }, timeout);
  document.getElementById("custom-notifications-wrapper-div").prepend(customNotificationsBox);
}