// This function blocks any request that doesn't have a valid logged-in user
export const requireAuth = (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized: Please sign in." });
    }
    next();
};