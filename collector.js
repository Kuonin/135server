// - -- ----------------  Setting Up Session data so you can tie data to a specific user
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
console.log(getCookie("id"));

//  -- ----------------------- Static Data Collection Start

let nav = window.navigator;
let user = nav.userAgent; // collecting user agent string
let language = nav.language; // collecting user language
let allowCookie = nav.cookieEnabled; // if the user accepts cookies

// Collecting Screen Dimensions
let s = window.screen;
let sWidth = s.width; 
let sHeight = s.height;

// Collecting Window Dimensions
let wWidth = window.innerWidth;
let wHeight = window.innerHeight;

//Checking if user allows JavaScript
//js checked using no script tag in index.html
let js = "enabled"; 

//Checking if user allows images, no image function is called after DOMTRee is loaded
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
}

// Css variable to determine if CSS is enabled or not, Altered when DOMTREE is loaded in
let css = "disabled";

//Determining the users network connection type
// check if connection object present
let connection =
navigator.connection || navigator.mozConnection || navigator.webkitConnection;

// then use the effectiveType property
// to get the connection type
console.log(connection.effectiveType);

//  ------------------------- Performance Data Collection Start

let loadTime = null; // total load time
let timeObj = null; // whole timing object
let startTime = null; // when page starts to load
let endTime = null; // when page ends loading

window.addEventListener("load", function(){    
    setTimeout(function(){

        const entry = performance.getEntriesByType("navigation")[0];
        loadTime = entry.duration;
        startTime = entry.startTime;
        endTime = entry.loadEventEnd;
        timeObj = entry;
    }, 0);
});
let storedData = []; //used to store data
localStorage.setItem("storedData", JSON.stringify(storedData));
// Sending Data collected after page loads (Static Data + Performance Data)
async function sendData(){
    send({
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
            totalLoadT : loadTime,
            id : getCookie("id")
            });        
}

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  // Checking if CSS is enabled
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

    //Calling function to check if images are enabled
  noimage();
  if(document.referrer){ // came from anotehr page at the start
    let currentdate = new Date(); 
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    // console.log(`Page entered ${datetime}`);
    // console.log(document.referrer);
    send({
        event: "Page enter",
            time: datetime,
            pageOn: page,
            id:getCookie("id")
    })
  }
  else{
    console.log("Something else did it");
  }

  sendData(); 

  //data is stored locally, make attempts to send to server
  let t; // must be declared here
    function update() {
        let len = storedData.length;
        storedData = JSON.parse(localStorage.getItem("storedData"));
        for (let i = 0; i < len; i++) {
            send(storedData[i]);
        }

        clearTimeout(t); // global function
        t = setTimeout(update, 100000);  
    } 
    update();
});

//------------------------- Activity Data Collection Start

//Collecting all thrown errors
window.addEventListener("error", (event) => {
  console.log(event);
  console.log(event.filename);
  send({
    event: "error",
    message: event.message,
    source: event.filename,
    line: event.lineno,
    id : getCookie("id")
  });

});

//Collecting mouse movement (Coordinates)
// these coordinates will be used to determine location of scroll
let mousex = 0;
let mousey = 0;
window.addEventListener("mousemove", (e) => {
  mousex = e.x;
  mousey = e.y;
  send({ 
    event: "mousemove",
    button: e.buttons,
    x: e.x,
    y: e.y,
     id: getCookie("id")
  });
});

//Collecting mouse clicks
window.addEventListener("mousedown", (e) => {
    // console.log("Mouse Click(down)");
    send({ 
    event: "mouseclick(d)",
    button: e.buttons,
    x: e.x,
    y: e.y,
     id : getCookie("id")
  });
});
window.addEventListener("mouseup", (e) => {
    // console.log("Mouse Click(up)");
    send({ 
    event: "mouseclick(u)",
    button: e.buttons,
    x: e.x,
    y: e.y,
     id : getCookie("id")
  });
});

//Collecting Scrolling Activity
window.addEventListener("scroll", (e) => {
//   console.log("Scroll");
    send({ 
    event: "scroll",
    x: mousex,
    y: mousey,
     id : getCookie("id")
  });
});

// Collecting Key Activity
window.addEventListener("keydown", (e) => {
//   console.log(e.key);
    send({ 
        event: "key",
        key: e.key,
        ctrl : e.ctrlKey,
        shift : e.shiftKey,
        alt: e.altKey,
        code: e.code,
        meta: e.metaKey,
         id : getCookie("id")
    })
});

// Determining Idle time
let prev = 0; //used to keep track of when last kind of acticity happened
let duration = 0; // used to determine the duration between activities happening

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
        if(duration >= 2000) // Idle time occurs
        {
            // console.log(duration);
            send({
                event: "idle",
                dur : duration,
                endDate: datetime,
                endTime: performance.now(),
                 id : getCookie("id")
            });            
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

// Determining when User entered the page or left the page and which page they may have come from
document.onvisibilitychange = () => {
    let currentdate = new Date(); 
        let datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  if (document.visibilityState === "hidden") {
        // console.log(`Page left ${datetime}`);
        send({
            event: "Page left",
            time: datetime,
            id : getCookie("id")
        });
  }
  else if (document.visibilityState === "visible"){
        // console.log(`Page entered ${datetime}`);
        let page = "";
        if(document.referrer){
            // console.log(document.referrer);
            page = document.referrer;
        }
        send({
            event: "Page enter",
            time: datetime,
            pageOn: page,
            id:getCookie("id")
        });
  }
};

//Function used to send data based on a passed in body
async function send(json){
    try{
        const response = await fetch("https://katiel.site/json/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
        // …
        });
    }catch(e){
        //if unable to send the data, store it
        storedData = JSON.parse(localStorage.getItem("storedData"));
        storedData.push(json);
        localStorage.setItem("storedData", JSON.stringify(storedData));
    }
        
}
