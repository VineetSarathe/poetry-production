import mongoose from "mongoose";

const posterSchema = new mongoose.Schema(
  {
    image: String
  },
  { timestamps: true }
);

export default mongoose.model("Poster", posterSchema);
