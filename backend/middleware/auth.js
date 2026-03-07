// OPEN ACCESS: No security checks. Everyone is allowed.
export const requireAuth = (req, res, next) => {
    next(); // Pass everyone through immediately
};