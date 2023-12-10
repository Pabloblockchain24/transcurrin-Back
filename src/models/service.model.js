import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    ref: String,
    container: String,
    nave: String,
    producto: String,
    diasLibres: Number,
    depotDevolucion: String,
    retiroPuerto: Date,
    presentacion: Date,
    fechaDev: Date,
    choferRetira: String,
    choferEntrega: String,
    choferDevuelve: String,
    facProveedor: String,
    statusFacProveedor: String,
    facServicio: String,
    statusFacServicio: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const Service = mongoose.model("service", serviceSchema)

export default Service