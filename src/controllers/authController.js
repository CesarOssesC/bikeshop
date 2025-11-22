const { Usuario } = require('../models/associations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.registerForm = (req, res) => {
    res.render("auth/register")
}

exports.registerUser = async (req, res) => {
    try {
        const { nombre, email, password } = req.body

        if(!nombre || !email || !password) {
            res.render('auth/register', {
                error: "Todos los campos son obligatorios",
                nombre,
                email
            })
        }

        const existeCorreo = await Usuario.findOne({ where: { email } })
        if (existeCorreo) {
            return res.render("auth/register", {
                error: "El correo ya está registrado",
                nombre,
                email
            })
        }

        const hash = await bcrypt.hash(password, 10)
        const usuario = await Usuario.create({
            nombre,
            email,
            password: hash,
            rol: 'cliente'
        })

        return res.redirect('/auth/login?success=Te has registrado exitosamente, ahora inicia tu sesión')
    } catch (error) {
        next()
    }
}

exports.loginForm = (req, res) => {
    res.render("auth/login")
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const usuario = await Usuario.findOne({ where: { email } })

        if(!usuario) {
            res.render('auth/login', { error: "Email o contraseña incorrectos" })
        }

        const ok = await bcrypt.compare(password, usuario.password)
        if (!ok) {
            res.render('auth/login', { error: "Email o contraseña incorrectos" })
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "2hr"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, //poner true en produccion cuanto ya se esté usando HTTPS
            samSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.redirect('/bicicletas?success=Bienvenido')
    } catch (error) {
        next()
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.redirect("/auth/login?succes=Sesión Cerrada")
}