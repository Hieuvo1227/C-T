import { PRIVATE_CHARS } from "../utils/configs/constants.js";
export const generateRandomPassword = () => {
    const chars = PRIVATE_CHARS;
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};
