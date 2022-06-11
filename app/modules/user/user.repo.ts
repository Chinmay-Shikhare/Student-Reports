import userDB from "./user.schema";
import { IUser } from "./user.types";

const getUser = () => userDB.find().populate('role').exec();

const createUser = (user: IUser) => userDB.create(user);

const login = (userID: string) => userDB.findOne({ userID: userID });

const getStudent = (id: string) => userDB.findOne({ role: id });

const updateUser = (user: IUser) => userDB.updateOne({ _id: user._id });

export default {
    getUser,
    createUser,
    login,
    getStudent,
    updateUser
}