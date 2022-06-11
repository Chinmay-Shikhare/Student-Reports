import { Application, json, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { authorize } from "../../utility/authorize";
import { responseHandler } from "../../utility/response";
import { excludedpath, routes } from "./routes.data";

export const registerRoutes = async (app: Application) => {
    try {
        app.use(json());
        app.use(helmet());

        app.use(authorize(excludedpath));

        for (let route of routes) {
            app.use(route.path, route.route);
        }

        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.send(new responseHandler(null, err));
        })
    }
    catch (e) {
        throw { message: "Unable to register Routes" }
    }
}