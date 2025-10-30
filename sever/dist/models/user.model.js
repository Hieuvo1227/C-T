import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    full_name: String,
    position_vn: String,
    position_en: String,
    avatar: String,
    facebook_url: String,
    linkedin_url: String,
    display_order: Number,
    is_active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
export const User = mongoose.models.User || mongoose.model("User", schema);
