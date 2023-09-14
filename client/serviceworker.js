self.addEventListener("push", async (event) => {
  console.log('listening', event.data.text())
  const payload = await event.data.text();
  const { title, body } = JSON.parse(payload);
  self.registration.showNotification(title, {
    body,
  });
});