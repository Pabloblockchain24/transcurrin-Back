import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect("mongodb+srv://transportescurrin:SalcedoCluster@transcurrincluster.hjnritx.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error);
    })
}



