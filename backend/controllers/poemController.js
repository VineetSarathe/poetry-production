import Poem from "../models/Poem.js";

// ➕ Add Poem (Admin)
export const addPoem = async (req, res) => {
  try {

    const {
      poetId,
      title_en,
      title_hi,
      content_en,
      content_hi,
      type   // 🔥 receive
    } = req.body;

    const poem = await Poem.create({
      poet: poetId,
      title_en,
      title_hi,
      content_en,
      content_hi,
      type   // 🔥 save
    });

    res.json({
      message: "Poem added successfully",
      poem
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get ALL Poems
export const getAllPoems = async (req, res) => {
  try {
    const poems = await Poem.find().populate("poet");
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get Poems by Poet
export const getPoemsByPoet = async (req, res) => {
  try {
    const poems = await Poem.find({
      poet: req.params.poetId
    }).populate("poet");

    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get Poems By Title
export const getPoemsByTitle = async (req, res) => {
  try {
    const poems = await Poem.find({
      title_en: req.params.title
    })
      .populate("poet")
      .sort({ createdAt: -1 }); // ✅ newest first

    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📥 Get Poem By ID
export const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id).populate("poet");

    if (!poem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏ UPDATE POEM (Admin)
export const updatePoem = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPoem = await Poem.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedPoem) {
      return res.status(404).json({ message: "Poem not found" });
    }

    res.json({
      message: "Poem updated successfully",
      poem: updatedPoem
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};