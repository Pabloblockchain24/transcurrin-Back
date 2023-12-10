//aqui arrancaremos la aplicacion
import app from "./src/app.js"
const port = 8080;

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
})



// aqui arranco la base de datos
import { connectDB } from "./src/db.js"
connectDB()


