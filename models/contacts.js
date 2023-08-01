import { Schema, model } from "mongoose";
import { handleSaveError } from "./hooks.js";

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        }
    },
    {
        varsionKey: false,
        timestamps: true
    });

contactsSchema.post("save", handleSaveError);

const Contact = model("contact", contactsSchema);

export default Contact;