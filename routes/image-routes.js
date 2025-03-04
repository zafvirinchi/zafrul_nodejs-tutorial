const express = require("express");
const {
    uploadImageController,
    deleteImageController,
} = require('../controllers/imageController');
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");

const router = express.Router();

router.post(
    "/upload",
    authMiddleware,
    adminMiddleware,
    uploadMiddleware.single("image"),
    uploadImageController

);

router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController);

module.exports = router;