import { Router, Request, Response, NextFunction } from "express";
import { ROLES } from "../../../utility/dbConstant";
import { permit } from "../../../utility/permission";
import { responseHandler } from "../../../utility/response";
import trackServices from "./track.services";
import { createTrackValidator } from "./track.validations";

const router = Router();


router.post("/create",
    permit([ROLES.ADMIN]),
    createTrackValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await trackServices.createTrack(req.body);
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
            const result = await trackServices.getTrack();
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

router.put("/update",
    permit([ROLES.ADMIN]),
    createTrackValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await trackServices.updateTrack(req.body);
            res.send(new responseHandler(result));
        }
        catch (e) {
            next(e);
        }
    });

export default router;