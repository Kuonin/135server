
let nav = window.navigator;
let user = nav.userAgent;
let language = nav.language;
let allowCookie = nav.cookieEnabled;

let s = window.screen;
let sWidth = s.width;
let sHeight = s.height;

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

//js checked using no script tag in index.html
let js = "enabled";
let image = "unavailable";

const img = new Image();
img.onload = function(){
    image = "available";
}

let css = "disabled";
const foot = document.querySelector('footer');
if (foot != null){
    const style = window.getComputedStyle(foot);
    if(style.getPropertyValue('position') === 'fixed'){
        css = "enabled";
    }
}
else{
    console.log("Footer does not exist");
}


async function sendData(){
    const response = await fetch("https://katiel.site/json/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
         userAgent: user,
         userLan: language,
         cookieEnabled: allowCookie,
         screenWidth: sWidth,
         screenHeight: sHeight,
         windowWidth: wWidth,
         windowHeight: wHeight,
         javascript : js,
         imageOn: image,
         cssEnabled: css
         }),
    // …
    });
}

sendData();