export const checkApplicationsOpen = (req, res, next) => {
  const isOpen = process.env.APPLICATIONS_OPEN?.toLowerCase() === "true";

  if (!isOpen) {
    return res.status(403).json({
      message: "Applications for Club Asymmetric membership are currently closed.",
    });
  }

  next();
};
