// DEBUG VERSION: Log the auth data, but DO NOT block the user
export const requireAuth = (req, res, next) => {
    // 1. Log exactly what Clerk is telling the server
    console.log("🔍 DEBUG LOG - Auth Data:", JSON.stringify(req.auth, null, 2));

    // 2. NORMALLY we would block you here:
    /* if (!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    */

    // 3. BUT TODAY, we let everyone in
    console.log("⚠️ Bypassing security check for debugging...");
    next(); 
};