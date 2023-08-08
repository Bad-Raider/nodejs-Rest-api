import {  model } from "mongoose";
import { handleSaveError } from "./hooks.js";
import { userMongooseSchema } from "../schemas/index.js";

userMongooseSchema.post("save", handleSaveError);


const User = model("user", userMongooseSchema);

export default User;