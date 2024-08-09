import mongoose from "mongoose";
import Producto from "../models/producto.js"
import Tienda from "../models/tienda.js"

// Método para ver el detalle del producto
const detalleProducto = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese producto`});
    const producto = await Producto.findById(id).populate('Nombre_producto','id_tienda')
    res.status(200).json(producto)
}
// Método para crear el producto
const registrarProducto = async (req,res)=>{
    const {id_tienda} = req.body
    if( !mongoose.Types.ObjectId.isValid(id_tienda)) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const producto = await Producto.create(req.body)
    res.status(200).json({msg:`Su producto se registró exitosamente! ${producto._id}`,producto})
}
// Método para actualizar el producto
const actualizarProducto = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe el producto ${id}`})
    await Producto.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({msg:"El producto se actualizó satisfactoriamente!!!"})
}
// Método para eliminar el producto
const eliminarProducto = async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe este producto`})
    await Producto.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Producto eliminado exitosamente"})
}
// Método para cambiar el estado del producto
const cambiarEstado = async(req,res)=>{

    await Producto.findByIdAndUpdate(req.params.id,{Estado:false})
    res.status(200).json({msg:"El estado del producto se ha modificado."})
}



export {
    detalleProducto,
    registrarProducto,
    actualizarProducto,
    eliminarProducto,
    cambiarEstado
}