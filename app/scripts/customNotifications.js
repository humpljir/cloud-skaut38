/*

************************************
customNotifications.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  This file contains functions and all js for custom in-app notifications.
*/

function initCustomNotifications() {
// create main wrapper for appending custom notifications

  let customNotificationsWrapper = document.createElement("div");
  customNotificationsWrapper.className="custom-notifications-wrapper";
  customNotificationsWrapper.id="custom-notifications-wrapper-div";
  document.getElementById("window-div").after(customNotificationsWrapper);
}

function pushCustomNotifications(content,color) {
// push custom in-app notification content - text of notification color - can be
// any code, but preferably should be used one of predefined values:
// var(--notifications-regular-color), var(--notifications-error-color),
// var(--notifications-warning-color), var(--notifications-confirm-color)

  let customNotificationsBox = document.createElement("div");
  customNotificationsBox.className = "custom-notifications-box notifications-hide";
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
  }, session.settings.customNotificationsTimeout);

  let touchstartY = 0;
  let touchendY = 0;
  let touchstartYmove = 0;
  let touchdistance = 0;
  
  customNotificationsBox.addEventListener('touchstart', e => {
    touchstartY = e.touches[0].screenY;
  });

  function touchmoveHandler(t) {
    t.stopPropagation();

    if(touchstartYmove == 0) {
      touchstartYmove = t.touches[0].pageY;
    }

      touchdistance += (t.changedTouches[0].pageY-touchstartYmove)/2;
      customNotificationsBox.style.transform="translateY("+touchdistance + "px)";
      console.log(touchdistance,t.touches[0].pageY,touchstartYmove);
  }

  customNotificationsBox.addEventListener("touchmove",touchmoveHandler(t));
  
  customNotificationsBox.addEventListener('touchend', e => {
    touchendY = e.changedTouches[0].screenY;

    if (touchendY < touchstartY){
      console.log("gesture a little bit...");
      if((touchstartY-touchendY)>200) {
        console.log("...a lot of it!");
      customNotificationsBox.remove();
      }
      else {
        console.log("failed, reset");
        customNotificationsBox.style.transform="translateY(0px)";
        touchstartY = 0;
        touchendY = 0;
        touchstartYmove = 0;
        touchdistance = 0;
        customNotificationsBox.removeEventListener("touchmove",touchmoveHandler(t));
      }
    }
  })

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