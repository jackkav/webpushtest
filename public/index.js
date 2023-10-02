function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64).split("").map(x => x.charCodeAt()))
}

async function run() {
  // A service worker must be registered in order to send notifications on iOS
  const registration = await navigator.serviceWorker.register("serviceworker.js", { scope: "./", });

  const button = document.getElementById("subscribe");
  button.addEventListener("click", async () => {
    // Triggers popup to request access to send notifications
    const result = await window.Notification.requestPermission();

    // If the user rejects the permission result will be "denied"
    if (result === "granted") {
      const subscription = await registration.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(
          "BIzXlMU5Cr80Xo1W37-insHdpa_wc1PiyDvm-RLL-GoLhi9EVzemoKqFp5qW1nFlVrNMDS3FDQy0NlQ9nvwFsWA"
        ),
        userVisibleOnly: true,
      });

      await fetch("/save-subscription", {
        method: "post",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(subscription),
      });
    }
  });
}

run();
