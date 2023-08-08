import { Schema } from "mongoose";

const contactMongooseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    // {
    //     owner: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'user',
    //     }
    // },
    { versionKey: false, timestamps: true }
);

export default contactMongooseSchema;