import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name: String,
    logo: String,
    website_url: String,
    display_order: Number,
}, {
    timestamps: true,
});
export const Customer = mongoose.models.Customer || mongoose.model("Customer", schema);
