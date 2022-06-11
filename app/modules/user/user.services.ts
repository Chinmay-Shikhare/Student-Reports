import { generate } from "generate-password";
import { createUserID } from "../../../utility/generateCredentials";
import { sendMail } from "../../../utility/sendMail";
import userRepo from "./user.repo";
import { IUser } from "./user.types";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const { sign } = jwt;

const getUser = () => userRepo.getUser();

const createUser = async (user: IUser) => {
    const userID = await createUserID(user.name);
    const password = generate();
    await sendMail(userID, password, user.email);
    let hashPassword = await hash(password, 10);
    let userData = { ...user, ['userID']: userID, ['password']: hashPassword };
    return userRepo.createUser(userData);
}

const login = async (userID: string, password: string) => {
    try {
        const userData = await userRepo.login(userID);
        if (userData) {
            const didMatch = compare(password, userData.password)
            const { SECRET_KEY } = process.env;
            if (SECRET_KEY && didMatch) {
                const token = sign(userData.toObject(), SECRET_KEY, { expiresIn: '20d' });
                const { role } = userData;
                const data = { role, token };
                return data;
            }
        }
        else {
            throw "User not Found"
        }
    }
    catch (e) {
        throw "Invalid Credentials"
    }
}

const getStudent = (id: string) => userRepo.getStudent(id);

const updateUser = (user: IUser) => userRepo.updateUser(user);

export default {
    getUser,
    createUser,
    login,
    getStudent,
    updateUser
}