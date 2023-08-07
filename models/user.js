import {  model } from "mongoose";
import { handleSaveError } from "./hooks";
import { userMongooseSchema } from "../schemas";

userMongooseSchema.post("save", handleSaveError);


const User = model("user", userMongooseSchema);

export default User;