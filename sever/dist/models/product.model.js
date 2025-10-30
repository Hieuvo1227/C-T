import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name_vn: String,
    name_en: String,
    description: String,
    certificate_number: Number,
    issue_year: Number,
}, {
    timestamps: true,
});
export const Product = mongoose.models.Product || mongoose.model("Product", schema);
