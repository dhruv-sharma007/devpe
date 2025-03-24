import mongoose from "mongoose";

const adminEntrySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
	},
	{ timestamps: true }
);

const AdminEntry = mongoose.model("AdminEntry", adminEntrySchema)

export { AdminEntry }