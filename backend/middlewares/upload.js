import multer from "multer";

// const storage = multer.memoryStorage();

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
//     fileFilter: (req, file, cb) => {
//         if (!file.mimetype.match(/^image\/(jpeg|png|gif)$/)) {
//             return cb(new Error('Only JPG, PNG, and GIF images are allowed'), false);
//         }
//         cb(null, true);
//     }
// });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/logo/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })
export default upload;