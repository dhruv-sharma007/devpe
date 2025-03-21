import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	reciever: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
    amount: {
        type: Number,
        default: 0,
        required: true,
    }
},{ timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export { Payment }

