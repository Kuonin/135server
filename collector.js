
let user = window.navigator.userAgent;

const response = await fetch("https://katiel.site/json/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ userAgent: user }),
  // …
});