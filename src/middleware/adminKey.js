export function requireAdminKey(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY;

  if (!configuredKey) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_API_KEY is not configured on the server',
    });
  }

  const providedKey = req.header('x-admin-key');

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  next();
}
