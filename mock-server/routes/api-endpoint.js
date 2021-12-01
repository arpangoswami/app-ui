const express = require("express");

const router = express.Router();

const { sendResponse } = require("../controllers/api");

router.post("/state/cache", sendResponse);

module.exports = router;
