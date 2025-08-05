const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error(err);
      next(err);
    });
  };
};

export default catchAsync; // ✅ ESM default export
