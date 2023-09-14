self.addEventListener("push", async (event) => {
  const payload = await event.data.text();
  const { title, body } = JSON.parse(payload);
  self.registration.showNotification(title, {
    body,
  });
});