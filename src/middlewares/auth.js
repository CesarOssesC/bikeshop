const { expressjwt: jwt } = require('express-jwt')

const currentUser = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: (req) => {
        if (req.headers.authorization?.startsWith("Bearer ")) {
            return req.headers.authorization.split(" ")[1];
        }

        if (req.cookies?.token) {
            return req.cookies.token
        }

        return null;
    }
})

function requireAuth(req, res, next) {
    if (!req.auth) return res.redirect('/auth/login?error=Debes iniciar sesión')
        next()
}

function requireRole(role) {
    return (req, res, next) => {
        if (!req.auth || !req.auth.rol !== role) {
            return res.status(403).send('No tienes permisos')
        }
        next()
    }
}

module.exports = { currentUser, requireAuth, requireRole }
