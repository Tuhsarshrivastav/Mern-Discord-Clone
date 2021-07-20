//dependencys
import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";

//imports
import Router from "./route.js";

// pusher
const pusher = new Pusher({
  appId: "1173197",
  key: "9985ebe1d44034cbced2",
  secret: "4a83800934c74ea6a81d",
  cluster: "ap2",
  useTLS: true,
});

//db config
const url =
   // here ou need to paste your mongodb config to start the server 
mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected");
  const changeStream = mongoose.connection.collection("conversations").watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("channels", "newChannel", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("conversation", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error triggering pusher");
    }
  });
});

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/", Router);

//app listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
