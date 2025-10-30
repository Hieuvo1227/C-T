import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    title_vn: String,
    title_en: String,
    description_vn: String,
    description_en: String,
    category_vn: String,
    category_en: String,
    thumbnail: String,
    published_date: Date,
    external_url: String,
    is_external: {
        type: Boolean,
        default: false,
    },
    is_published: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
export const Blog = mongoose.models.Blog || mongoose.model("Blog", schema);
