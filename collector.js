
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

//Static Collection end

// const entries = window.performance.getEntriesByType("navigation");
// entries.forEach((entry) => {
//   console.log(`${entry.name}: domComplete time: ${entry.domComplete}ms`);
// });
let loadTime = null;
let timeObj = null;
let startTime = null;
let endTime = null;

window.addEventListener("load", function(){    
    setTimeout(function(){

        const entry = window.performance.getEntriesByType("navigation")[0];
        loadTime = entry.domComplete;
        startTime = entry.loadEventStart;
        endTime = entry.loadEventEnd;
        timeObj = endTime - startTime;
        console.log(`loadtime: ${loadTime}`);
        console.log(`startT: ${startTime}`);
        console.log(`end: ${endTime}`);
        console.log(`tot: ${timeObj}`);

        
    }, 0);
});

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
