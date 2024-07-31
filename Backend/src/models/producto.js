import mongoose, {Schema,model} from 'mongoose'
const ProductoSchema = new Schema({
    Nombre_producto:{
        type:String,
        require:true,
        trim:true
    },
    Categoria:{
        type:String,
        require:true,
        enum:['Mandos','Consolas','Videojuegos','Perifericos','ComponentesPC','Otros']
    },
    Estado:{
        type:Boolean,
        default:true,
    },
    id_tienda:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tienda'
    }
    
},{
    timestamps:true
})

export default model('Producto',ProductoSchema)
