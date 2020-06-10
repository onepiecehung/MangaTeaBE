import path from 'path';
// const shell from 'shelljs');
import multer from 'multer';
// const fs from "fs")
// const utils from '../utils/utils');


// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         let offerId = req.body.offerId; //{offerId: id}
//         if (!offerId) offerId = "0";
//         if (file.fieldname === "image") {
//             const dir = path.join(__dirname, '../../public/images/offers/' + offerId);
//             if (!fs.existsSync(dir)) {
//                 shell.mkdir('-p', dir);
//             }
//             return cb(null, dir)
//         }
//         if (file.fieldname === "banner") {
//             const dir = path.join(__dirname, '../../public/images/offers/' + offerId + "/banners");
//             if (!fs.existsSync(dir)) {
//                 shell.mkdir('-p', dir);
//             }
//             return cb(null, dir)
//         }
//         return cb(null, "./public/temp")
//     }
// })
// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|tif|tiff|bmp|eps|jfif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Error: Images Only! (jpeg|jpg|png|gif|tif|tiff|bmp|eps|jfif)"));
    }
}
export const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

