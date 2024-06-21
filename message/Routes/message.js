const express = require('express');
var { getMessages, sendMessage }= require( "../Controllers/message.js");
// import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

module.exports = router;
