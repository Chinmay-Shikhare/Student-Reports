import trackRepo from "./track.repo";
import { ITrack } from "./track.types";

const getTrack = () => trackRepo.getTrack();

const createTrack = (track: ITrack) => trackRepo.createTrack(track);

const updateTrack = (track: ITrack) => trackRepo.updateTrack(track);

export default {
    getTrack,
    createTrack,
    updateTrack
}