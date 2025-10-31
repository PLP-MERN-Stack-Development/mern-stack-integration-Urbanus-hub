const logger = (req, res, next) => {
  try {
    const userId = req.user?._id || "anonymous";
    const userRole = req.user?.role || "guest";
    console.log(
      `${req.method} ${
        req.path
      } - User: ${userId} (${userRole}) - ${new Date().toLocaleString()}`
    );
    next();
  } catch (error) {
    next(error);
  }
};

export default logger;
