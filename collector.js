
let user = window.navigator.userAgent;

async function sendData(){
    const response = await fetch("https://katiel.site/json/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ userAgent: user }),
    // …
    });
}

sendData();