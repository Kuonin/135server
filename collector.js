
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
let image = "available";

function noimage(){
    const image = document.getElementById('flag');
    if(image.complete){
        console.log("Image available");
    }
    else{
        console.log("Images unavailable");
    }
    // if ((document.getElementById('flag').offsetWidth==1&&document.getElementById('flag').readyState=='complete')
    //     ||(document.getElementById('flag').offsetWidth==1&&document.getElementById('flag').readyState==undefined)){
    
    //         image = "unavailable";
    //         console.log("Image unavailable");
    //     }
}

let css = "disabled";

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

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  const foot = document.getElementById('love');
    if (foot != null){
        const style = window.getComputedStyle(foot);
        if(style.getPropertyValue('position') === 'fixed'){
            css = "enabled";
        }
    }
    else{
        console.log("Footer does not exist");
    }
  noimage();
  //sendData();
});
