function reqListener() {
    var data = JSON.parse(this.responseText);
    document.getElementById("username").innerText = data.username;
    //   document.getElementById("email").innerText = data.email;
  }
  
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "/userinfo");
  oReq.send();
  