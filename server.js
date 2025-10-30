const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const methodOverride = require("method-override")
const PORT = process.env.PORT || 3000

const bicicletasRouter = require('./src/routes/bicicletas')
const reviewsRouter = require('./src/routes/reviews')
const comprasRouter = require('./src/routes/compras')
const sequelize = require("./src/config/db")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use('/bicicletas', bicicletasRouter)
app.use('/reviews', reviewsRouter)
app.use('/compras', comprasRouter)


app.get('/', (req, res) => res.redirect('/bicicletas'))


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("Algo malió sal...")
})

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos ha sido sincronizada')
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos: ', err)
    })