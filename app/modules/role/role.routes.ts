import { NextFunction, Router, Response, Request } from "express";
import { ROLES } from "../../../utility/dbConstant";
import { permit } from "../../../utility/permission";
import { responseHandler } from "../../../utility/response";
import roleServices from "./role.services";
import { createRoleValidator } from "./role.validations";

const router = Router();

router.post("/create",
    permit([ROLES.ADMIN]),
    createRoleValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await roleServices.createRole(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/display",
    permit([ROLES.ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await roleServices.getRole();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e)
        }
    });

router.put("/update",
    permit([ROLES.ADMIN]),
    createRoleValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await roleServices.updateRole(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e)
        }
    });

export default router;