import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    title: String,
    description_vn: String,
    description_en: String,
    thumbnail: String,
    client_name: String,
}, {
    timestamps: true,
});
export const Project = mongoose.models.Project || mongoose.model("Project", schema);
