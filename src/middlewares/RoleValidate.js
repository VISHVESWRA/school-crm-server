export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req);

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({message: "Access denied: insufficient permissions"});
    }
    next();
  };
};
