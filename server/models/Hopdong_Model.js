const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  congty: {
    type: String,
    required: true,
  },
  maso: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("hopdong", PostSchema);
