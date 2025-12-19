export const index = async (req, res, next) => {
  try {
    res.send("welcome...");
  } catch (error) {
    next(error);
  }
};
