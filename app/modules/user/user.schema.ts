import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.types";

class userSchema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            userID: {
                type: String,
                required: false
            },
            password: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: true
            },
            role: {
                type: Schema.Types.ObjectId,
                ref: 'Role',
                required: true
            }
        })
    }
};

type userType = Document & IUser;
const userDB = model<userType>('User', new userSchema());
export default userDB;
