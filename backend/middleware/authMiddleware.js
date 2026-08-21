import jwt from 'jsonwebtoken';

// 1. Authenticate user via HTTP-Only Cookie
export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Please login first.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey123');
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// 2. Authorize specific roles (Security Fix: Server verifies role from Token, NOT Query Params)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access Denied! Role '${req.user?.role}' is not allowed to access this resource.` 
      });
    }
    next();
  };
};