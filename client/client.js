const publicVapidKey =
  "BB88mDBASFxSSZTpynOytHS2geC81QlQh7FJD3DOL6y_6oXt2Pdy5fRBhgUw5nb77Lk5EZHX3rGZ0IKI3o3WdGk";

// Check for service worker


if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering ...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Registered...");

  // Register Push
  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push registered...");

  // Send Push Notification
  console.log("Sending push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify({
      subscription: subscription,
      title : new Date().toLocaleString()
    }),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}