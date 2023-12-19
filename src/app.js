//aqui configuramos el codigo backend (express)
import  express  from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import intranetRoutes from "./routes/intranet.routes.js"

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    // en modo produccion
    origin: 'https://transcurrin-cl-client.vercel.app',

        // en modo dev
    // origin: 'http://localhost:5173',

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization',"Cookie"],
    credentials: true

    // tambien cambiar en el vercel.json
// "Access-Control-Allow-Origin": "https://transcurrin-cl-client.vercel.app",
}))


app.get("/", (req,res) => {
    const htmlRespose = `
    <html>
    <head>
        <title> NODEJS </title>
    </head>
    <body>
        <h1> SOY UN PROYECTO BACK DE VERCEL </h1>
    </body>

    </html>
    `
    res.send(htmlRespose)
})


app.use("/api", authRoutes)
app.use("/api", intranetRoutes)



export default app