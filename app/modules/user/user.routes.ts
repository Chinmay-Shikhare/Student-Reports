import { Router, Request, Response, NextFunction } from "express";
import { responseHandler } from "../../../utility/response";
import userServices from "./user.services";
import { createUserValidator, loginValidator, updateUserValidator } from "./user.validations";
import { permit } from "../../../utility/permission";
import { ROLES } from "../../../utility/dbConstant";

const router = Router();

router.post("/create",
    createUserValidator,
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.createUser(req.body);
            console.log(result);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.post("/login",
    loginValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userID, password } = req.body;
            const result = await userServices.login(userID, password);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    })

router.get("/display",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.getUser();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/get-students/:id",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const result = await userServices.getStudent(id);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.put("/update",
    updateUserValidator,
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userServices.updateUser(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

export default router;

