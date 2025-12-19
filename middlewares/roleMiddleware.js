export const checkRole = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.session.user?.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
