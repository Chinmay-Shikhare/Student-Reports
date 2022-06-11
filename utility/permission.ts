import { NextFunction, Response, Request } from "express"
import { responseHandler } from "./response";

export const permit = (permittedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { role } = res.locals['userData'];
        if (!permittedRoles.includes(role)) {
            return res.send(new responseHandler({ message: "Only authorize person can access this page" }))
        }
        next();
    }
}