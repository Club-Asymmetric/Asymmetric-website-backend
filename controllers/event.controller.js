import { getEvent, getAllEvents } from "../models/event.js";

export const getEvents = async (req, res) => {
  res.status(200).json(await getAllEvents());
};

export const getEventById = async (req, res) => {
  res.status(200).json(await getEvent(req.params.id));
};
