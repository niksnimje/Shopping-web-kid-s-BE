const isAdmin = (req, res, next) => {
    console.log("User Role:", req.user.role); // Debugging

    if (!req.user.role) {
        return res.status(403).json({ message: "Role not found in user data!" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not allowed to add/update/delete products!" });
    }
    
    next();
};

module.exports = isAdmin;
