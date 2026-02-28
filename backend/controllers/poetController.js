// import Poet from "../models/Poet.js";

// // ➕ Add Poet (URL + FILE SUPPORT)
// export const addPoet = async (req, res) => {
//   try {

//     const name = req.body.name;

//     let image = "";

//     if (req.file) {
//       image = `/uploads/${req.file.filename}`;
//     } else if (req.body.imageUrl) {
//       image = req.body.imageUrl;
//     }

//     const poet = await Poet.create({
//       name,
//       image
//     });

//     res.json({
//       message: "Poet added successfully",
//       poet
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 📥 Get All Poets
// export const getAllPoets = async (req, res) => {
//   try {
//     const poets = await Poet.find();
//     res.json(poets);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// // ✏️ Update Poet
// export const updatePoet = async (req, res) => {
//   try {
//     const { name } = req.body;

//     const poet = await Poet.findById(req.params.id);

//     if (!poet) {
//       return res.status(404).json({ message: "Poet not found" });
//     }

//     // ✅ Update name
//     if (name) poet.name = name;

//     // ✅ Update image (file OR URL)
//     if (req.file) {
//       poet.image = `/uploads/${req.file.filename}`;
//     } else if (req.body.imageUrl) {
//       poet.image = req.body.imageUrl;
//     }

//     await poet.save();

//     res.json({
//       message: "Poet updated successfully",
//       poet
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };









import Poet from "../models/Poet.js";
import cloudinary from "../config/cloudinary.js";

export const addPoet = async (req, res) => {
  try {
    const { name } = req.body;
    let image = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "poets" },
        async (error, result) => {
          if (error) throw error;

          const poet = await Poet.create({
            name,
            image: result.secure_url,
          });

          res.json({ message: "Poet added", poet });
        }
      ).end(req.file.buffer);
    } else if (req.body.imageUrl) {
      const poet = await Poet.create({
        name,
        image: req.body.imageUrl,
      });

      res.json({ message: "Poet added", poet });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllPoets = async (req, res) => {
  const poets = await Poet.find();
  res.json(poets);
};

export const updatePoet = async (req, res) => {
  try {
    const poet = await Poet.findById(req.params.id);
    if (!poet) return res.status(404).json({ message: "Not found" });

    if (req.body.name) poet.name = req.body.name;

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "poets" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      poet.image = result.secure_url;
    } else if (req.body.imageUrl) {
      poet.image = req.body.imageUrl;
    }

    await poet.save();
    res.json({ message: "Updated", poet });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};