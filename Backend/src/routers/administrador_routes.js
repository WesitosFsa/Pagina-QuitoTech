import { Router } from "express";
import verificarAutenticacion from '../middlewares/autenticacion.js'
import {
    login,
    registro,
    actualizarEmail,
    actualizarPassword,
	recuperarPassword,
    comprobarTokenPasword,
	nuevoPassword,
    listarTiendas,
    listarproductosIDtienda,
    listarproductosporID,
    listarproductosporCategoria,
    confirmEmail
} from "../controllers/administrador_controller.js";
const router =Router()


router.post('/registro',registro)
router.post('/login',login)
router.get('/confirmar/:token',confirmEmail)
router.post('/recuperar-password',recuperarPassword)
router.get('/recuperar-password/:token',comprobarTokenPasword)
router.post('/nuevo-password/:token',nuevoPassword)
router.put('/administrador/actualizaremail',verificarAutenticacion,actualizarEmail)
router.put('/administrador/actualizarpassword',verificarAutenticacion,actualizarPassword)
router.get('/administrador/listartiendas',verificarAutenticacion,listarTiendas) 
router.get('/administrador/producto/listarproductos/:id',verificarAutenticacion,listarproductosporID) 
router.get('/administrador/productos/categoria/:Categoria',verificarAutenticacion,listarproductosporCategoria) 
router.get('/administrador/tienda/productos/:id_tienda',verificarAutenticacion,listarproductosIDtienda)
export default router