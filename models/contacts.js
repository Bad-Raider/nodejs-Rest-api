import {  model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";
import { contactMongooseSchema} from "../schemas/index.js";


contactMongooseSchema.pre("findOneAndUpdate", handleUpdateValidate);
contactMongooseSchema.post("save", handleSaveError);
contactMongooseSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactMongooseSchema);

export default Contact;