import { Router, Request, Response, NextFunction } from "express";
import { ROLES } from "../../../utility/dbConstant";
import { permit } from "../../../utility/permission";
import { responseHandler } from "../../../utility/response";
import formServices from "./form.services";
import { IFilter } from "./form.types";
import { createFormValidator, updateFormValidator } from "./form.validations";

const router = Router();

router.post("/create",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    createFormValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData = res.locals['userData'];
            const { _id } = userData;
            const result = await formServices.createForm(req.body, _id);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/display",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await formServices.getForm();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/average",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await formServices.getAverage();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/overall-average",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await formServices.getOverallAverage();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.put("/update",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    updateFormValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await formServices.updateRatings(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/filter",
    permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: IFilter = req.query;
            const result = await formServices.filterData(data);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.get("/history", permit([ROLES.ADMIN, ROLES.TRAINER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await formServices.getHistory(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    })
export default router;