// import Poster from "../models/Poster.js";
// import fs from "fs";

// /* ================= ADD POSTER ================= */
// export const addPoster = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     const poster = await Poster.create({
//       image: `/uploads/posters/${req.file.filename}`
//     });

//     res.json({
//       message: "Poster added",
//       poster
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= GET POSTERS ================= */
// export const getPosters = async (req, res) => {
//   try {
//     const posters = await Poster.find().sort({ createdAt: -1 });
//     res.json(posters);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= UPDATE POSTER ================= */
// export const updatePoster = async (req, res) => {
//   try {
//     const poster = await Poster.findById(req.params.id);

//     if (!poster) {
//       return res.status(404).json({ message: "Poster not found" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     /* 🔥 Delete old image safely */
//     if (poster.image) {
//       const oldPath = poster.image.replace("/uploads/", "");
//       const fullPath = `uploads/${oldPath}`;

//       if (fs.existsSync(fullPath)) {
//         fs.unlinkSync(fullPath);
//       }
//     }

//     poster.image = `/uploads/posters/${req.file.filename}`;
//     await poster.save();

//     res.json({ message: "Poster updated" });

//   } catch (err) {
//     console.error("Update poster error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= DELETE POSTER ================= */
// export const deletePoster = async (req, res) => {
//   try {
//     const poster = await Poster.findById(req.params.id);

//     if (!poster) {
//       return res.status(404).json({ message: "Poster not found" });
//     }

//     /* 🔥 Delete file safely */
//     if (poster.image) {
//       const oldPath = poster.image.replace("/uploads/", "");
//       const fullPath = `uploads/${oldPath}`;

//       if (fs.existsSync(fullPath)) {
//         fs.unlinkSync(fullPath);
//       }
//     }

//     await poster.deleteOne();

//     res.json({ message: "Poster deleted" });

//   } catch (err) {
//     console.error("Delete poster error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };









import Poster from "../models/Poster.js";
import cloudinary from "../config/cloudinary.js";

export const addPoster = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "posters" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const poster = await Poster.create({
      image: result.secure_url,
    });

    res.json({ message: "Poster added", poster });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosters = async (req, res) => {
  const posters = await Poster.find().sort({ createdAt: -1 });
  res.json(posters);
};

export const updatePoster = async (req, res) => {
  try {
    const poster = await Poster.findById(req.params.id);
    if (!poster) return res.status(404).json({ message: "Not found" });

    if (!req.file) return res.status(400).json({ message: "No file" });

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "posters" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    poster.image = result.secure_url;
    await poster.save();

    res.json({ message: "Updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePoster = async (req, res) => {
  const poster = await Poster.findById(req.params.id);
  if (!poster) return res.status(404).json({ message: "Not found" });

  await poster.deleteOne();
  res.json({ message: "Deleted" });
};