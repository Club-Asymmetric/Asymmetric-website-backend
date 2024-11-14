import { getEvent, getAllEvents } from '../models/event.js';

export const getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    for (let i in events) {
      console.log(events[i]);
      for (let j in events[i].photos) {
        events[i].photos[j] = events[i].photos[j].id;
      }
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
