import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    slug: String,
    title_vn: String,
    title_en: String,
    description_vn: String,
    description_en: String,
    display_order: Number,
}, {
    timestamps: true,
});
export const Solution = mongoose.models.Solution || mongoose.model("Solution", schema);
