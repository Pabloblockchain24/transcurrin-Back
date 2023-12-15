import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    ref: String,
    container: String,
    nave: String,
    tipo: String,
    diasLibres: Number,
    eta: Date,
    almDestino:String,
    demurrage: Number,
    depotDevolucion: String,
    retiroPuerto: Date,
    choferRetiro: String,
    entrega: Date,
    choferEntrega: String,
    fechaVacio: Date,
    choferVacio: String,
    facServicio: String,
    statusFacServicio: String,
    progEntrega: Date,
    statusEntrega: String,
    carguioEntrega: Date,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const Service = mongoose.model("service", serviceSchema)

export default Service