export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err?.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid id',
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
}
