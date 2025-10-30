import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    message: String,
    submit_type: String,
}, {
    timestamps: true,
});
export const Contact = mongoose.models.Contact || mongoose.model("Contact", schema);
