// Validation Middleware
export default (req, res, next) => {
  const {
    name,
    currentYear,
    department,
    collegeName,
    email,
    phoneNumber,
    event,
    teamName,
    memberName,
  } = req.body;

  if (
    !name ||
    !currentYear ||
    !department ||
    !collegeName ||
    !email ||
    !phoneNumber ||
    !event
  ) {
    return res.status(400).json({
      message: "All fields are required except team name and member name",
    });
  }
  next();
};
