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

export const eventRegistration = async (req, res, next) => {
  const { name, year, department, college, email, number, team, members } =
    req.body;
  const event = req.params.id;
  try {
    const registration = new Registration({
      name,
      year,
      department,
      college,
      email,
      number,
      event,
      team,
      members,
    });
    await registration.save(); // TODO:
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
