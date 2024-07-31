import Administrador from "../models/administrador.js"
import { sendMailToUser, sendMailToRecoveryPasswordAd } from "../config/nodemailer.js"
import generarJWT from "../helpers/crearJWT.js"
import mongoose from "mongoose";
import Tienda from "../models/tienda.js"
import Producto from "../models/producto.js"
// * rutas administrador
// !

const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const AdministradorBDD = await Administrador.findOne({email})
    if(!AdministradorBDD) return res.status(404).json({msg:"Lo sentimos, el correo no es el correcto"})
    const verificarPassword = await AdministradorBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
    const token = generarJWT(AdministradorBDD._id,"administrador")
		const {_id} = AdministradorBDD
    res.status(200).json({
        token,
        _id,
        email:AdministradorBDD.email})
}

const registro = async (req,res)=>{
    // actividad 1
    const {email,password} = req.body
    //actividad 2
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    const verificarEmailBDD = await Administrador.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    // actividad 3
    const nuevoAdministrador = new Administrador(req.body)
    nuevoAdministrador.password = await nuevoAdministrador.encrypPassword(password)
    nuevoAdministrador.crearToken()
    await nuevoAdministrador.save()
    //actividad 4
    const token = nuevoAdministrador.crearToken()
    await sendMailToUser(email,token)
    await nuevoAdministrador.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}

const actualizarPassword = async (req,res)=>{
    const AdministradorBDD = await Administrador.findById(req.AdministradorBDD._id)
    if(!AdministradorBDD) return res.status(404).json({msg:`Lo sentimos, id de administrador no proporcionado  ${id}`})
    const verificarPassword = await AdministradorBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    AdministradorBDD.password = await AdministradorBDD.encrypPassword(req.body.passwordnuevo)
    await AdministradorBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}
const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const AdministradorBDD = await Administrador.findOne({email})
    if(!AdministradorBDD) return res.status(404).json({msg:"Lo sentimos, no no se encuentra registrado"})
    const token = AdministradorBDD.crearToken()
    AdministradorBDD.token=token
    await sendMailToRecoveryPasswordAd(email,token)
    await AdministradorBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}
const comprobarTokenPasword = async (req,res)=>{
    if(!(req.params.token)) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const AdministradorBDD= await Administrador.findOne({token:req.params.token})
    if(AdministradorBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    await AdministradorBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes crear tu nuevo password"}) 
}
const nuevoPassword = async (req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    const AdministradorBDD = await Administrador.findOne({token:req.params.token})
    if(AdministradorBDD?.token !== req.params.token) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    AdministradorBDD.token = null
    AdministradorBDD.password = await AdministradorBDD.encrypPassword(password)
    await AdministradorBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"})
}
const actualizarEmail =async (req,res)=>{
    const {email}= req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verifyemailUser = Administrador.findOne({email})
    if (verifyemailUser?.email) return res.status(409).json({msg:"Lo sentimos, el email ya esta registrado"})

    const newAdBDD = await Administrador.findOne(req.AdministradorBDD._id)
    newAdBDD.email=email
    await newAdBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo email"}) 
}
const listarTiendas = async (req,res)=>{ 
    const tiendas = await Tienda.find({Verificado:true}).where('Tienda').equals(req.TiendaBDD).select("-salida -createdAt -updatedAt -__v").populate('Nombre_tienda Direccion')
    res.status(200).json(tiendas)
}// * BIEN
const listarproductosIDtienda = async (req, res) => {
    const { id_tienda } = req.params;
    
    try {
        // Buscar productos por id_tienda
        const productos = await Producto.find({ id_tienda })
            .select("-salida -createdAt -updatedAt -__v")
            .populate('id_tienda', 'Nombre_tienda')  // Asegúrate de que el campo y el modelo referenciado sean correctos
            .populate('Nombre_producto Categoria');

        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor", error: error.message });
    }
};//BIEN
const listarproductosporID = async (req, res) => {
    const {id} = req.params
    const productosBDD = await Producto.findById(id)
    try {
        const productos = await Producto.find({id: req.productosBDD })
            .select("-salida -createdAt -updatedAt -__v")
            .populate('id_tienda', 'id Nombre_producto Categoria');
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor" });
    }
};//BIEN
const listarproductosporCategoria = async (req, res) => {
    try {
        const { Categoria } = req.params;
        console.log(`Categoría recibida: ${Categoria}`);

       const categoriasValidas = ['Mandos', 'Consolas', 'Videojuegos', 'Perifericos', 'ComponentesPC', 'Otros'];

        if (!categoriasValidas.includes(Categoria)) {
            return res.status(400).json({ msg: `La categoría '${Categoria}' no existe, busque en una categoria existente!` });
        }

        const productos = await Producto.find({ Categoria });
        res.status(200).json({ productos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor" });
        console.log(error);
    }
};//BIEN
const confirmEmail = async (req,res)=>{
    //: ACTIVIDAD 1
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})

    const administradorBDD = await Administrador.findOne({token:req.params.token})
    if(!administradorBDD?.token) return res.status(404).json({msg:"Algo ha ocurrido, parece que la cuenta ya ha sido confirmada"})

    administradorBDD.token = null
    administradorBDD.confirmEmail=true
    await administradorBDD.save()

    res.status(200).json({msg:"Felicidades su cuenta ha sido confirmada, puede iniciar sesion"}) 
} // * BIEN

export {
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
}