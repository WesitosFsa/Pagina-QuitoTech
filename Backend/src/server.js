// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerAdministrador from './routers/administrador_routes.js'
import routerUsuario from './routers/usuario_routes.js'
import routerProducto from './routers/productos_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones
app.set('port', process.env.PORT || 3000)
app.use(cors())

// Middlewares
app.use(express.json())

// Variables globales

// Rutas
app.get('/', (req, res) => {
    res.send("Server on")
})
app.use('/api', routerAdministrador)
app.use('/api', routerUsuario)
app.use('/api', routerProducto)


// Manejo de una ruta que no sea encontrada
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default app
