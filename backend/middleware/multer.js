// import multer from "multer";
// import fs from "fs";

// const uploadPath = "uploads/posters";

// // ensure folder exists
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);   // ✅ FIXED
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// export default upload;











import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;