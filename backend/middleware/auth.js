// DEBUG VERSION: logs the auth state but DOES NOT block requests
export const requireAuth = (req, res, next) => {
    // 1. Log exactly what Clerk sees (Look for this in Render Logs later)
    console.log("🔍 DEBUG AUTH:", JSON.stringify(req.auth, null, 2));

    // 2. TEMPORARILY ALLOW EVERYONE (Commented out the blocking code)
    /* if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized: Please sign in." });
    }
    */
   
    next(); // Pass everyone through
};