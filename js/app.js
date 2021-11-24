async function initNotifications() {
    let permission = await Notification.requestPermission();

    pushNotifications('Notifications enabled!','This is still a beta function. If you find any bugs, please, report them at our git repo.','https://github.com/humpljir/cloud-skaut38');
  }

  async function pushNotifications(title, body,link) {
    const greeting = new Notification(title,{
        body: body,
        icon: './img/icon_add.svg'
      });
      
      setTimeout(() => greenting.close(), 10*1000);
      
      greeting.addEventListener('click', function(){
          window.open(link);
      });
  }

console.log("✅ app.js successfully loaded!");