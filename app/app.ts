import express from "express"
import { verifyAdmin } from "../utility/verifyAdmin";
import { connectToMongo } from "./connections/mongo.connections";
import { registerRoutes } from "./routes";

export const startServer = async () => {
    try {
        const app = express();

        await connectToMongo();
        await verifyAdmin();

        registerRoutes(app);


        const { PORT } = process.env;
        app.listen(PORT, () => {
            console.log(`listening on ${PORT}`)
        });
    }
    catch (e) {
        throw (e);
    }
}