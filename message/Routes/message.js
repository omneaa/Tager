const express = require('express');
var { getMessages, sendMessage , getConversationsByUserId }= require( "../Controllers/message.js");
// import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);
router.get("/getConversations/:userId", getConversationsByUserId ) ; 

module.exports = router;
