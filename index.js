import { initializeApp, applicationDefault } from "firebase-admin/app";
import express, { json } from "express";
import cors from "cors";
import { getMessaging } from "firebase-admin/messaging";

// var serviceAccount = require("path/to/serviceAccountKey.json");

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("content-type", "application/json");
  next();
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

initializeApp({
  credential: applicationDefault(),
  projectId: "potion-for-creators",
});

app.post("/send", function (req, res) {
  const received_token = req.body.fcmToken;

  const message = {
    notification: {
      title: "notify",
      body: "this is test notification",
    },
    token:
      "cUlmXEZiRoGo3O2KA9V2T6:APA91bGCrkUccn4fHKIcR26Dsp8kyWxiqUYqCnelbiH0Qp_R_X6bfytCQ4UaGxZGW79mP5FyKryC_6WkibdyOroh9yNhjjNdVQHKz5aW737PkaBAKGz8rHiZjnISSx3-3OodMsmnJrow",
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: received_token,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
