import { getEvent, getAllEvents, registerForEvent } from "../models/event.js";

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

export const eventRegistration = async (req, res, next) => {
  // console.log("I am here");
  const { id } = req.params;
  try {
    return res.json(await registerForEvent(id, req.body));
  } catch (error) {
    return next(error);
  }

  // TODO: Mail Bot, Download

  // res.status(201).json({
  //   message: "Registration successful",
  //   data: {
  //     name,
  //     currentYear,
  //     department,
  //     collegeName,
  //     email,
  //     phoneNumber,
  //     event,
  //     teamName,
  //     memberName,
  //   },
  // });
  res.send("Success");
};
