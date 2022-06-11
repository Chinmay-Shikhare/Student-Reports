import formDB from "./form.schema";
import { IFilter, IForm } from "./form.types";
import { ObjectId } from "mongodb";
import { IUser } from "../user/user.types";

const createForm = (form: IForm) => formDB.create(form);

const getForm = () => formDB.find().populate('feedbackTo').populate('feedbackBy').populate('track').exec();

const getFormByID = (id: string) => formDB.find({ _id: id });

const updateRatings = (form: IForm) => formDB.updateOne({ _id: form._id },
    {
        $push: { ratings: form.ratings },
        $set: { lastUpdatedRatingsAt: new Date() }
    });

const getAverage = () => formDB.aggregate([
    { $unwind: "$ratings" },
    {
        $group: {
            _id: null,
            logicAverage: { $avg: "$ratings.logic" },
            communicationAverage: { $avg: "$ratings.communication" },
            assignmentAverage: { $avg: "$ratings.assignment" },
            proactivenessAverage: { $avg: "$ratings.proactiveness" }
        }
    }
]);

const getOverallAverage = () => formDB.aggregate([
    { $unwind: "$ratings" },
    {
        $group: {
            _id: null,
            logicAverage: { $avg: "$ratings.logic" },
            communicationAverage: { $avg: "$ratings.communication" },
            assignmentAverage: { $avg: "$ratings.assignment" },
            proactivenessAverage: { $avg: "$ratings.proactiveness" }
        }
    },
    {
        $project: {
            logicAverage: 1,
            communicationAverage: 1,
            assignmentAverage: 1,
            proactivenessAverage: 1,
            overAllAverage: {
                $avg: [
                    "$logicAverage",
                    "$communicationAverage",
                    "$assignmentAverage",
                    "$proactivenessAverage"
                ]
            }
        }
    }
]);

const filterData = async (filter: IFilter) => {
    const { track, ratings, trainer } = filter;

    let filters: any[] = [];
    let filteredQuery: any[] = [];

    const match = {
        $match: {
            $and: filteredQuery
        }
    }

    const averages = await formDB.aggregate([
        { $unwind: "$ratings" },
        {
            $group: {
                _id: '$_id',
                logicAverage: { $avg: '$ratings.logic' },
                communicationAverage: { $avg: '$ratings.communication' },
                assignmentAverage: { $avg: '$ratings.assignment' },
                proactivenessAverage: { $avg: '$ratings.proactiveness' }
            }
        },
        {
            $project: {
                _id: 1,
                logicAverage: 1,
                communicationAverage: 1,
                assignmentAverage: 1,
                proactivenessAverage: 1,
                overAllAverage: {
                    $avg: [
                        "$logicAverage",
                        "$communicationAverage",
                        "$assignmentAverage",
                        "$proactivenessAverage"
                    ]
                }
            }
        }
    ]);


    if (ratings) {
        const ids = averages.reduce((acc, curr) => {
            if (curr.overAllAverage > +ratings) {
                acc.push(curr._id);
            }
            return acc;
        }, []);

        filteredQuery.push({ '_id': { $in: ids } });
    }

    if (track) {
        filteredQuery.push({ 'track': new ObjectId(track) });
    }
    if (trainer) {
        filteredQuery.push({ 'feedbackBy': new ObjectId(trainer) });
    }

    if (filteredQuery.length) {
        filters.push(match);
    }


    let forms = await formDB.aggregate([
        ...filters,
        {
            $lookup: {
                from: 'users',
                localField: 'feedbackTo',
                foreignField: '_id',
                as: 'feedbackTo'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'feedbackBy',
                foreignField: '_id',
                as: 'feedbackBy'
            }
        },
        {
            $lookup: {
                from: 'tracks',
                localField: 'track',
                foreignField: '_id',
                as: 'track'
            }
        },
        {
            $lookup: {
                from: 'roles',
                localField: 'role',
                foreignField: '_id',
                as: 'role'
            }
        }
    ]);

    forms = forms.map((role: IUser) => {
        return {
            ...role,
            averages: averages.find((i: { _id: string }) => i._id.toString() === role._id?.toString())
        }
    });
    return forms;
}

const getHistory = (_id: string) => formDB.find({ feedbackTo: _id }).
    populate('feedbackTo').
    populate('feedbackBy').
    populate('track').
    exec();

export default {
    createForm,
    getForm,
    filterData,
    updateRatings,
    getAverage,
    getOverallAverage,
    getFormByID,
    getHistory
}