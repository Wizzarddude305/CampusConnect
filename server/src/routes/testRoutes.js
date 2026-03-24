const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("the server is running - router");
});

module.exports = router;
