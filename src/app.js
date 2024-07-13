import  express  from "express";
import cookieParser from "cookie-parser"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import intranetRoutes from "./routes/intranet.routes.js"
import resetPassword from "./routes/resetPassword.routes.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


const allowedOrigins = [
    'https://transcurrin-front.vercel.app',
    '*'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api", authRoutes)
app.use("/api", intranetRoutes)
app.use("/api", resetPassword)

export default app