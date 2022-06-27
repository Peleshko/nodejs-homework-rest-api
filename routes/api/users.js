const express = require("express");

const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
