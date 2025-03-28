import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		read: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model("Notifications", notificationSchema);

export { Notification };
