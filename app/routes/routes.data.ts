import { IAuth, Route } from "./routes.types";
import userRouter from "../modules/user/user.routes";
import formRouter from "../modules/form/form.routes";
import trackRouter from "../modules/track/track.routes";
import roleRouter from "../modules/role/role.routes";

export const routes: Route[] = [
    new Route("/user", userRouter),
    new Route("/form", formRouter),
    new Route("/track", trackRouter),
    new Route("/role", roleRouter)
]

export const excludedpath: IAuth[] = [
    { method: 'POST', path: '/user/login' }
]