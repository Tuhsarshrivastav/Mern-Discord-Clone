import mongosse from "mongoose";

const discodeSchema = mongosse.Schema({
  channelName: String,
  conversation: {
    message: String,
    timestamp: String,
    user: {
      displayName: String,
      email: String,
      photo: String,
      uid: String,
    },
  },
});
export default mongosse.model("conversations", discodeSchema);
