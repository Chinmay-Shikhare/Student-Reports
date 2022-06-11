import { generate } from "generate-password";
import userDB from "../app/modules/user/user.schema";
import { createUserID } from "./generateCredentials";
import { sendMail } from "./sendMail";
import { ROLES } from "./dbConstant";

export const verifyAdmin = async () => {
    try {
        const result = await userDB.findOne({ role: ROLES.ADMIN })
        if (!result) {
            const userData = {
                userID: createUserID("chinmay"),
                password: generate(),
                role: ROLES.ADMIN,
                name: 'chinmay',
                email: 'chinmayshikhare73@gmail.com'
            }
            await sendMail(userData.userID, userData.password, userData.email);
            await userDB.create(userData);
            console.log("Created First Admin");
        }
        else {
            console.log(`Admin Already present`);
        }
    }
    catch (e) {
        console.log(e);
    }
}