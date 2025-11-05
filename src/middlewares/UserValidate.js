export const validate = (schema) => (req, res, next) => {
  const {error} = schema.validate(req.body, {abortEarly: false});

  console.log(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((err) => err.message),
    });
  }

  next();
};
