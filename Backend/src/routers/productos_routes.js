import {Router} from 'express'
const router = Router()

import {
    detalleProducto,
    registrarProducto,
    actualizarProducto,
    eliminarProducto,
    cambiarEstado
} from "../controllers/productos_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";


// Ruta para crear el tratamiento
router.post('/producto/registro',verificarAutenticacion,registrarProducto) //OK
// Ruta para ver el detalle del tratamiento
router.get('/producto/:id',detalleProducto) //OK
// Ruta para actualizar el tratamiento
router.put('/producto/:id',actualizarProducto) //OK
// Ruta ara eliminar el a
router.delete('/producto/:id',verificarAutenticacion,eliminarProducto) //OK
// Ruta para cambiar el estado del tratamiento 
router.post('/producto/estado/:id',verificarAutenticacion,cambiarEstado) //OK


export default router