import { getEvent, getAllEvents } from "../models/event.js";

export const getEvents = async (req, res, next) => {
  try {
    res.json(await getAllEvents());
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    res.json(await getEvent(req.params.id));
  } catch (error) {
    next(error);
  }
};
