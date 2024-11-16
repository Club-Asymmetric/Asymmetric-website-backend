export const eventRegistration = async (req, res) => {
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

  try {
    const registration = new Registration({
      name,
      currentYear,
      department,
      collegeName,
      email,
      phoneNumber,
      event,
      teamName,
      memberName,
    });
    await registration.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error saving registration", error });
  }

  res.status(201).json({
    message: "Registration successful",
    data: {
      name,
      currentYear,
      department,
      collegeName,
      email,
      phoneNumber,
      event,
      teamName,
      memberName,
    },
  });
};

export const registration = async (req, res) => {
  /* Implement logic */
};
