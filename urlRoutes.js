const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.post("/urls", urlController.createUrl);
router.get("/urls", urlController.getAllUrls);
router.get("/urls/:shortUrl", urlController.redirectToOriginalUrl);
router.patch("/urls/:shortUrl", urlController.updateOriginalUrl);

module.exports = router;
