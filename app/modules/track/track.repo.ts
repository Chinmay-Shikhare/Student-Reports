import trackDB from "./track.schema";
import { ITrack } from "./track.types";

const getTrack = () => trackDB.find();

const createTrack = (track: ITrack) => trackDB.create(track);

const updateTrack = (track: ITrack) => trackDB.updateOne({ _id: track._id });

export default {
    getTrack,
    createTrack,
    updateTrack
}