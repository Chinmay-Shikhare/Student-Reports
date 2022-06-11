import { Result } from "express-validator";
import { getNumberOfDays } from "../../../utility/date";
import { IUser } from "../user/user.types";
import formRepo from "./form.repo";
import { IFilter, IForm } from "./form.types";



const createForm = (form: IForm, _id: string) => {
    form.feedbackBy = _id;
    form.lastUpdatedRatingsAt = new Date();
    return formRepo.createForm(form);
}

const getForm = () => formRepo.getForm();

const updateRatings = async (form: IForm) => {
    const data = await formRepo.getFormByID(form._id || '');
    const { lastUpdatedRatingsAt } = data[0];
    // const getDifference = getNumberOfDays(lastUpdatedRatingsAt, new Date());
    const difference = getNumberOfDays(lastUpdatedRatingsAt, new Date("2022-04-28T16:19:15.734Z"));

    if (difference >= 7) {
        return await formRepo.updateRatings(form);
    }
    throw "Unable to update";
};

const getAverage = () => formRepo.getAverage();

const getOverallAverage = () => formRepo.getOverallAverage();

const filterData = (filter: IFilter) => formRepo.filterData(filter);

const getHistory = (_id: string) => formRepo.getHistory(_id);

export default {
    createForm,
    getForm,
    updateRatings,
    getAverage,
    getOverallAverage,
    filterData,
    getHistory
}