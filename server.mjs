import express from "express";
import webpush from "web-push";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

let subscriptionData = null;

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

app.post('/send-notification', (req, res) => {
  console.log('send', req.body)
  if (!subscriptionData) return res.sendStatus(400);
  const payload = JSON.stringify({ title: req.body.title || "Hello World", body: req.body.body || "something" })
  webpush.sendNotification(subscriptionData, payload)
  res.sendStatus(200);
})

app.post("/save-subscription", async (req, res) => {
  subscriptionData = req.body;
  res.sendStatus(200);
});

app.use(express.static("../client"));

app.listen(3000);