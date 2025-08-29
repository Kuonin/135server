
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

function noimage(){
    const i = document.getElementById('flag');
    if(i.complete){
        console.log("Image available");
        image = "available";
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

// check if connection object present
let connection =
navigator.connection || navigator.mozConnection || navigator.webkitConnection;

// then use the effectiveType property
// to get the connection type
console.log(connection.effectiveType);

//Static Collection end

let loadTime = null;
let timeObj = null;
let startTime = null;
let endTime = null;

window.addEventListener("load", function(){    
    setTimeout(function(){

        const entry = performance.getEntriesByType("navigation")[0];
        loadTime = entry.duration;
        startTime = entry.startTime;
        endTime = entry.loadEventEnd;
        timeObj = entry;
    }, 0);
});

// perfroamnce data collection end

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
         cssEnabled: css,
         networkCon : connection,
         timingObj : timeObj,
         startLoad : startTime,
         endLoad : endTime,
         totalLoadT : loadTime
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

//continuous data collection
// window.addEventListener("error", (event) => {
//   log.textContent = `${log.textContent}${event.type}: ${event.message}\n`;
//   console.log(event);
// });
window.onerror = (a, b, c, d, e) => {
  console.log(`message: ${a}`);
  console.log(`source: ${b}`);
  console.log(`lineno: ${c}`);
  console.log(`colno: ${d}`);
  console.log(`error: ${e}`);

  return true;
};
b