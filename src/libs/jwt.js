import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken"

export function createAccessToken(payload) {
    console.log("Estoy dentro de la funcion createAccessToken")
    return new Promise((resolve, reject) => {
        jwt.sign(payload, "some secret key", { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err)
            console.log(`Este es el token que devolvi desde dentro del create access token`, token)
            resolve(token)
        })
    })
}