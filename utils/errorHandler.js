const errorHandler = (err, req, res, next) => {
  const errMsg = err
    ? err.toString().split("Error: ")[1]
    : "Something went wrong";

  res.status(500).json({ data: "", msg: errMsg });
};

module.exports = errorHandler;
