export interface IRatings {
    logic: number,
    communication: number,
    assignment: number,
    proactiveness: number
}

export interface IForm {
    _id?: string,
    feedbackTo: string,
    feedbackBy: string,
    ratings: IRatings[],
    track: string,
    lastUpdatedRatingsAt: Date
}

export interface IFilter {
    ratings?: number,
    track?: string,
    trainer?: string
}