module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user and roles are present
    if (!req?.user?.roles) return res.sendStatus(401); // Unauthorized

    const rolesArray = [...allowedRoles];
    const userRoles = req.user.roles;

    // Check if user has at least one allowed role
    const hasRole = userRoles.some(role => rolesArray.includes(role));
    if (!hasRole) return res.sendStatus(403); // Forbidden

    next();
  };
};
