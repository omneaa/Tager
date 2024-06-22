const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		
	},
	{ timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

module.exports =messageModel;

