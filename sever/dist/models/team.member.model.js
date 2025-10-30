import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    full_name: String,
    position_vn: String,
    position_en: String,
    avatar: String,
    social_urls: [String],
}, {
    timestamps: true,
});
export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", schema);
