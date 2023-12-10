//aqui configuramos el codigo backend (express)
import  express  from "express";
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoutes from "./routes/auth.routes.js"
import intranetRoutes from "./routes/intranet.routes.js"

const app = express()

app.use(cors({
    origin: 'https://transcurrin-cl-client.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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

app.use(express.json())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", intranetRoutes)



export default app