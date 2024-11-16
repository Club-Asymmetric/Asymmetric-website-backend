import { getEvent, getAllEvents } from "../models/event.js";

export const getEvents = async (req, res) => {
  res.json(await getAllEvents());
};

export const getEventById = async (req, res, next) => {
  try {
    res.json(await getEvent(req.params.id));
  } catch (error) {
    next(error);
  }
};
