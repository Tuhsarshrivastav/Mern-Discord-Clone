import express from "express";
const router = express.Router();
import Schema from "./model.js";

router.post("/new/channel", (req, res) => {
  const dbData = req.body;

  Schema.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
router.get("/get/channelList", (req, res) => {
  Schema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let channels = [];
      data.map((channelData) => {
        const channelInfo = {
          id: channelData._id,
          name: channelData.channelName,
        };
        channels.push(channelInfo);
      });

      res.status(200).send(channels);
    }
  });
});

router.post("/new/message", (req, res) => {
  Schema.updateOne(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("error saving messages" + err);
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

router.get("/get/data", (req, res) => {
  Schema.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
router.get("/get/conversation", (req, res) => {
  const id = req.query.id;
  Schema.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

export default router;
