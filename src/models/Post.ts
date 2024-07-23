import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
    description: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);
const Post = model("Post", postSchema);

export default Post;
