import express from "express";
import { submitContact } from "../controllers/contact.controller.js";
const contactRoute = express.Router();
// POST /api/contacts - submit new contact
contactRoute.post("/", submitContact);
// GET /api/contacts - submit new contact (for Zalo in-app browser compatibility)
// Query params: name, email, address, phone, message, submit_type, language
contactRoute.get("/", submitContact);
export default contactRoute;
