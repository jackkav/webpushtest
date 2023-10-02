self.addEventListener("push", async (event) => {
  const payload = await event.data.text();
  const { title, body } = JSON.parse(payload);
  self.registration.showNotification(title, {
    body,
    // icon: './images/logo-192x192.png',
    // badge: './images/badge-72x72.png',
    data: {
      url: 'https://web.dev/push-notifications-overview/',
    },
  });
});