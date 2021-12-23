/*

************************************
app.js
************************************

  - Project:  cloud.skaut38
  - Author:   J. Humpl   


  This file contains all components for web to behave as app.
*/

function initApp() {

  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  function updateOnlineStatus(event) {
    if(navigator.onLine) {
      pushCustomNotifications("Your internet connection has been restored.",
      "var(--notifications-confirm-color)");
    }
    else {
      pushCustomNotifications("Internet connection lost, some features may not be available.",
      "var(--notifications-error-color)");
    }
  }

let defferedPrompt;
const addbtn = document.createElement("button");
document.body.append(addbtn);

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    defferedPrompt = event
    addbtn.style.display = 'block';
});

addbtn.addEventListener('click', event => {
    defferedPrompt.prompt();

    defferedPrompt.userChoice.then(choice => {
        if(choice.outcome === 'accepted'){
            console.log('user accepted the prompt')
        }
        defferedPrompt = null;
    })
});
}

async function initNotifications() {
  //init push notifications, allow them in browser, in the future we should save
  //endpoints here

    let permission = await Notification.requestPermission();

    pushNotifications('Notifications enabled!','This is still a beta function. If you find any bugs, please, report them at our git repo.','https://github.com/humpljir/cloud-skaut38');
  }

  async function pushNotifications(title, body,link) {
    //function for sending notifications from user-side

    const greeting = new Notification(title,{
        body: body,
        icon: './img/icon_add.svg'
      });
      
      setTimeout(() => greenting.close(), 10*1000);
      
      greeting.addEventListener('click', function(){
          window.open(link);
      });
  }

  function changeHTMLTheme(color) {
    // function for changing html5 theme color used by browser
  
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", color);
  }

console.log("✅ app.js successfully loaded!");