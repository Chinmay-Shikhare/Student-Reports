import { Schema, model, Document } from "mongoose";
import { ITrack } from "./track.types";

class trackScema extends Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            }
        })
    }
}

type trackType = Document & ITrack;
const trackDB = model<trackType>('Track', new trackScema());
export default trackDB;