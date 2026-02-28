import mongoose from "mongoose";

const poetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  }
});

const Poet = mongoose.model("Poet", poetSchema);
export default Poet;
