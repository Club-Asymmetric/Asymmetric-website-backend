import { getEvent, getAllEvents } from '../database/models.js'

export const getAllEventsHandler = (req, res) => {
    return res.json(getAllEvents());
};
export const getEventHandler = (req, res) => {
    return res.json(getEvent(req.params.name));
};

