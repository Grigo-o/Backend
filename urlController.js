const Url = require("../models/url");
const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  6
);

async function createUrl(req, res) {
  try {
    let shortUrl;
    if (req.body.customPath) {
      shortUrl = req.body.customPath;
    } else {
      shortUrl = nanoid();
    }

    const newUrl = new Url({
      originalUrl: req.body.originalUrl,
      shortUrl: shortUrl,
    });

    const savedUrl = await newUrl.save();
    res.json(savedUrl);
  } catch (error) {
    console.error("Error creating URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllUrls(req, res) {
  try {
    const urls = await Url.find({}, { updatedAt: 0, _id: 0 }); // Exclude updatedAt and _id fields
    res.json(urls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function redirectToOriginalUrl(req, res) {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateOriginalUrl(req, res) {
  try {
    const { shortUrl } = req.params;
    const { newOriginalUrl } = req.body;

    const url = await Url.findOneAndUpdate(
      { shortUrl },
      { originalUrl: newOriginalUrl },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.json(url);
  } catch (error) {
    console.error("Error updating original URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createUrl,
  getAllUrls,
  redirectToOriginalUrl,
  updateOriginalUrl,
};
