export class EventModel {
    constructor(name, organiser, datetime) {
        this.name = name;
        this.organiser = organiser;
        this.datetime = datetime;
    }
}

export function getAllEvents() {
    return [
        new EventModel("tales_of_threat", "Alice", new Date(2005, 12, 22, 8, 30)),
        new EventModel("horror_codes", "Bala", new Date(2024, 11, 11, 17)),
        new EventModel("noice_workshop", "Calvados", new Date(2029, 12, 31, 11, 59, 59, 999)),
    ]
}

export function getEvent(name) {
    switch (name) {
        case "tales_of_threat":
            return new EventModel("tales_of_threat", "Alice", new Date(2005, 12, 22, 8, 30));
        case "horror_codes":
            return new EventModel("horror_codes", "Bala", new Date(2024, 11, 11, 17));
        case "noice_workshop":
            return new EventModel("noice_workshop", "Calvados", new Date(2029, 12, 31, 11, 59, 59, 999));
        default:
            throw "Bad Event >:("
    }
}