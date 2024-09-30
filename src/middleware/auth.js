export function onlyAdmin(req, res, next) {
    if (req.user && req.user.role === "admin") {
        return next(); 
    } else {
        res.status(403).send("No tienes acceso a las funciones de administrador del sitio."); 
    }
}

export function onlyUser(req, res, next) {
    if (req.user && req.user.role === "user") {
        return next(); 
    } else {
        res.status(403).send("No tienes acceso a la tienda.");
    }
}
