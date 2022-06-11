import { Schema, model, Document } from "mongoose";
import { IForm } from "./form.types";

class formSchema extends Schema {
    constructor() {
        super({
            feedbackTo: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User',
                unique: true
            },
            feedbackBy: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            ratings: [
                {
                    logic: {
                        type: Number,
                        required: true
                    },
                    communication: {
                        type: Number,
                        required: true
                    },
                    assignment:
                    {
                        type: Number,
                        required: true
                    },
                    proactiveness: {
                        type: Number,
                        required: true
                    }
                }
            ],
            track: {
                type: Schema.Types.ObjectId,
                ref: 'Track',
                required: true
            },
            lastUpdatedRatingsAt: {
                type: Date,
                required: false
            }
        })
    }
}


type formType = Document & IForm;
const formDB = model<formType>('Form', new formSchema());
export default formDB;
