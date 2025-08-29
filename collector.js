
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
  if(document.referrer){
    let currentdate = new Date(); 
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    console.log(`Page entered ${datetime}`);
    console.log(document.referrer);
  }
  else{
    console.log("Something else did it");
  }

  //sendData();
});

//continuous data collection
window.addEventListener("error", (event) => {
  console.log(event);
  console.log(event.filename);
  send({
    event: "error",
    message: event.message,
    source: event.filename,
    line: event.lineno
  });

});

let mousex = 0;
let mousey = 0;
window.addEventListener("mousemove", (e) => {
//   console.log("Mouse Move");
//   console.log(e.buttons);
//   console.log(e.x);
//   console.log(e.y);
  mousex = e.x;
  mousey = e.y;
//   send({
//     event: "mousemove",
//     button: e.buttons,
//     x: e.x,
//     y: e.y
//   });
});
window.addEventListener("mousedown", (e) => {
    console.log("Mouse Click(down)");
    // console.log(e.buttons);
    // console.log(e.x);
    // console.log(e.y);
//     send({
//     event: "mouseclick(d)",
//     button: e.buttons,
//     x: e.x,
//     y: e.y
//   });
});
window.addEventListener("mouseup", (e) => {
    console.log("Mouse Click(up)");
    // console.log(e.buttons);
    // console.log(e.x);
    // console.log(e.y);
//     send({
//     event: "mouseclick(u)",
//     button: e.buttons,
//     x: e.x,
//     y: e.y
//   });
});
window.addEventListener("scroll", (e) => {
  console.log("Scroll");
//   console.log(mousex);
//   console.log(mousey);
//     send({
//     event: "scroll",
//     x: mousex,
//     y: mousey
//   });
});

window.addEventListener("keydown", (e) => {
  console.log(e.key);
//   console.log(e.ctrlKey);
//   console.log(e.shiftKey);
    // send({
    //     event: "key",
    //     key: e.key,
    //     ctrl : e.ctrlKey,
    //     shift : e.shiftKey
    // })
});
let prev = 0;
let duration = 0;

function noIdlingHere() {

    function yourFunction() {
        let currentdate = new Date(); 
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

        duration = performance.now() - prev;
        if(duration >= 2000)
        {
            console.log(duration);
            // send({
            //     event: "idle",
            //     dur : duration,
            //     endDate: datetime,
            //     endTime: performance.now()
            // });
            // console.log(datetime);
            // console.log(performance.now());
            // console.log(performance.now() - prev);
            
        }
        prev = performance.now();
        
    }

    let t; // must be declared here
    function resetTimer() {
        clearTimeout(t); // global function
        t = setTimeout(yourFunction, 0);  // time is in milliseconds timeout so doesn't register 
    } 

    window.addEventListener('load', resetTimer, true);
    window.addEventListener('mousemove', resetTimer, true);
    window.addEventListener('mousedown', resetTimer, true);
    window.addEventListener('touchstart', resetTimer, true);
    window.addEventListener('touchmove', resetTimer, true);
    window.addEventListener('click', resetTimer, true);
    window.addEventListener('keydown', resetTimer, true);
    window.addEventListener('scroll', resetTimer, true);
    window.addEventListener('wheel', resetTimer, true);
}

noIdlingHere();

document.onvisibilitychange = () => {
    let currentdate = new Date(); 
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  if (document.visibilityState === "hidden") {
        console.log(`Page left ${datetime}`);
  }
  else if (document.visibilityState === "visible"){
        console.log(`Page entered ${datetime}`);
        if(document.referrer){
            console.log(document.referrer);
        }
        else{
            console.log("typed in");
        }
  }
};



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  else return "";
}

function generateUniqueId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
function setUniqueCookie(cookieName, days) {
        let uniqueId = getCookie(cookieName);
        if (uniqueId === "") {
            uniqueId = generateUniqueId();
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = `${cookieName}=${uniqueId};${expires};path=/;SameSite=Lax`;
        }
    }
setUniqueCookie("id", 14);
console.log(getCookie('_ga'));
console.log(getCookie("id"));

async function send(json){
    const response = await fetch("https://katiel.site/json/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
    // …
    });
}
