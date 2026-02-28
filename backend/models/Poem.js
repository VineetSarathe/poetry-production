import mongoose from "mongoose";

const poemSchema = new mongoose.Schema(
  {
    poet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poet",
      required: true
    },

    title_en: String,
    title_hi: String,

    content_en: String,
    content_hi: String,

    type: {
      type: String,
      enum: ["couplet", "poem", "ghazal", "couplets"],
      default: "poem"
    }
  },
  { timestamps: true }
);

const Poem = mongoose.model("Poem", poemSchema);

export default Poem; // ✅ MUST BE PRESENT